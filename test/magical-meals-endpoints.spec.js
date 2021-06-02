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
    })
})