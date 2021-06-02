const path = require('path')
const express = require('express')
const xss = require('xss')
const MealsService = require('./meals-service')
const express = require('express')

const mealsRouter = express.Router()
const jsonParser = express.json()

const serializeMeal = meal => ({
    id: meal.id,
    meal_name: xss(meal.meal_name),
    meal_description: xss(meal.meal_description),
    restaurant_name: xss(meal.restaurant_name),
    meal_location: xss(meal.meal_location),
    price: xss(meal.price),
    is_vegan: meal.is_vegan,
    is_vegetarian: meal.is_vegetarian,
    is_glutenfree: meal.is_glutenfree,
})

mealsRouter 
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        MealsService.getAllMeals(knexInstance)
            .then(meals => {
                res.json(meals.map(serializeMeal))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { meal_name, meal_description, restaurant_name, meal_location, price, is_vegan, is_vegetarian, is_glutenfree } = req.body
        const newMeal = { meal_name, meal_description, restaurant_name, meal_location, price, is_vegan, is_vegetarian, is_glutenfree }

        for (const [key, value] of Object.entries(newMeal)) {
            if(value == null) {
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body`}
                })
            }
        }

    MealsService.insertMeal(
        req.app.get('db'),
        newMeal
        )
        .then(meal => {
            res.status(201)
                .location(path.posix.join(req.originalUrl + `/${meal.id}`))
                .json(serializeMeal(meal))
        })
        .catch(next)
    })

//GET DELETE UPDATE by id

    mealsRouter
        .route('/:id')
        .all((req, res, next) => {
            MealsService.getById(
                req.app.get('db'),
                req.params.id
            )
            .then(meal => {
                if(!meal) {
                    return res.status(404)
                        .json({
                            error: { message: `meal doesn't exist`}
                        })
                }
                res.meal = meal
                next()
            })
            .catch(next)
        })
        .get((req, res, next) => {
            res.json(serializeMeal(res.meal))
        })
        .delete((red, res, next) => {
            MealsService.deleteMeal(
                req.app.get('db'),
                req.params.id
            )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
        })
        .patch(jsonParser, (req, res, next) => {
            const { meal_name, meal_description, restaurant_name, meal_location, price, is_vegan, is_vegetarian, is_glutenfree } = req.body
            const mealToUpdate = { meal_name, meal_description, restaurant_name, meal_location, price, is_vegan, is_vegetarian, is_glutenfree }

            const requiredValues =  meal_name || meal_description || restaurant_name || meal_location || is_vegan || is_vegetarian || is_glutenfree 
            if (!requiredValues) {
                return res.status(400).json({
                    error: { message: `Request body must contain either 'meal_name', 'meal_description', 'restaurant_name', 'meal_location', 'price', 'is_vegan', 'is_vegetarian', 'is_glutenfree'`}
                });
            }

            MealsService.updateMeal(
                req.app.get('db'),
                req.params.id,
                mealToUpdate
            )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
        })

module.exports = mealsRouter