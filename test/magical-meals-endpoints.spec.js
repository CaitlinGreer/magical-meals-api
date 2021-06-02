const { expect } = require('chai')
const { expectCt } = require('helmet')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeMealArray } = require('./meal-fixtures')

describe('Magical Meals Endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('magical_meals').truncate())

    afterEach('cleanup', () => db('magical_meals').truncate())

//GET /api/meals

    describe('GET /api/meals', () => {
        context('Given there are no meals in the db', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                .get('/api/meals')
                .expect(200, [])
            })
        })

        context('Given there are meals in the db', () => {
            const testMeals = makeMealArray()

            beforeEach('insert meals', () => {
                return db
                    .into('magical_meals')
                    .insert(testMeals)
            })

            it('responds with 200 and all the meals', () => {
                return supertest(app)
                    .get('/api/meals')
                    .expect(200, testMeals)
            })
        })
    })

//GET /api/meals/:id

    describe('GET /api/meals/:id', () => {

        context('Given there are no meals in db', () => {
            it('responds with 404', () => {
                const mealId = 123456
                return supertest(app)
                    .get(`/api/meals/${mealId}`)
                    .expect(404, {
                        error: { message: `meal doesn't exist`}
                    })
            })
        })

        context('Given there are meals in the db', () => {
            const testMeals = makeMealArray()

            beforeEach('insert meals', () => {
                return db
                    .into('magical_meals')
                    .insert(testMeals)
            })

            it('responds with 200 and the requested meal', () => {
                const mealId = 2
                const expectedMeal = testMeals[mealId - 1]
                return supertest(app)
                    .get(`/api/meals/${mealId}`)
                    .expect(200, expectedMeal)
            })
        })
    })

//POST /api/meals endpoint

    describe('POST /api/meals', () => {

        it('creates a meal, responding with 201 and the new meal', () => {
            
            const newMeal = {
                meal_name: 'Test Meal',
                meal_description: 'Test description',
                restaurant_name: "Test restaurant",
                meal_location: 'Test location',
                price: "99.99",
                is_vegan: true,
                is_vegetarian: true,
                is_glutenfree: false,
            }
            return supertest(app)
                .post('/api/meals')
                .send(newMeal)
                .expect(201)
                .expect(res => {
                    expect(res.body.meal_name).to.eql(newMeal.meal_name)
                    expect(res.body.meal_description).to.eql(newMeal.meal_description)
                    expect(res.body.restaurant_name).to.eql(newMeal.restaurant_name)
                    expect(res.body.meal_location).to.eql(newMeal.meal_location)
                    expect(res.body.price).to.eql(newMeal.price)
                    expect(res.body.is_vegan).to.eql(newMeal.is_vegan)
                    expect(res.body.is_vegetarian).to.eql(newMeal.is_vegetarian)
                    expect(res.body.is_glutenfree).to.eql(newMeal.is_glutenfree)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/meals/${res.body.id}`)
                })
                .then(res => {
                    supertest(app)
                        .get(`/api/meals/${res.body.id}`)
                        .expect(res.body)
                })
        })

        const requiredFields = [ 'meal_name', 'meal_description', 'restaurant_name', 'meal_location']

        requiredFields.forEach(field => {
            const newMeal = {
                meal_name: 'Test meal name',
                meal_description: 'Test description',
                restaurant_name: 'Test Restaurant',
                meal_location: 'Test location',
            }

            it(`responds with 400 and an error message when the ${field} is missing`, () => {
                delete newMeal[field]

                return supertest(app)
                    .post('/api/meals')
                    .send(newMeal)
                    .expect(400, {
                        error: { message: `Missing ${field} in request body`}
                    })

            })
        })
    })


//DELETE /api/jokes/:id

    describe(`DELETE /api/meals/:id`, () => {

        context('Given meal with id does not exist in db', () => {
            it('responds with 404', () => {
                const mealId = 123456
                return supertest(app)
                    .delete(`/api/meals/${mealId}`)
                    .expect(404, {
                        error: { message: `meal doesn't exist`} 
                    })
            })
        })

        context('Given meal with id already exists', () => {
            const testMeals = makeMealArray()

            beforeEach('insert meal', () => {
                return db
                    .into('magical_meals')
                    .insert(testMeals)
            })

            it('Responds with 204 then removes the joke', () => {
                const idToRemove = 2
                const expectedMeal = testMeals.filter(meal => meal.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/meals/${idToRemove}`)
                    .expect(204)
                    .then(res => {
                        supertest(app)
                            .get('/api/meals')
                            .expect(expectedMeal)
                    })  
            })
        })
    })
})

