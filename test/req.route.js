'use strict'
var express = require('./_app')
var request = require('supertest')
var assert = require('assert')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.route', function () {
    it('should be the executed Route', function (done) {
      var app = express()

      app.get('/user/:id/:op?', function (req, res, next) {
        assert.strictEqual(req.route.path, '/user/:id/:op?')
        next()
      })

      app.get('/user/:id/edit', function (req, res) {
        assert.strictEqual(req.route.path, '/user/:id/edit')
        res.end()
      })

      request(app)
        .get('/user/12/edit')
        .expect(200, done)
    })
  })
})
