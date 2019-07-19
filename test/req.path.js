'use strict'
var express = require('./_app')
var request = require('supertest')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.path', function () {
    it('should return the parsed pathname', function (done) {
      var app = express()

      app.use(function (req, res) {
        res.end(req.path)
      })

      request(app)
        .get('/login?redirect=/post/1/comments')
        .expect('/login', done)
    })
  })
})
