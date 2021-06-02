const { default: knex } = require("knex")

const MealsService = {
    getAllMeals(knex){
        return knex
            .select('*')
            .from('magical_meals')
    },

    insertMeal(knex, newMeal) {
        return knex
            .insert(newMeal)
            .into('magical_meals')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .from('magical_meals')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteMeal(knex, id) {
        return knex('magical_meals')
            .where({ id })
            .delete()
    },

    updateMeal(kned, id, newMealField) {
        return knex('magical_meals')
            .where({ id })
            .update(newMealField)
    }
}

module.exports = MealsService