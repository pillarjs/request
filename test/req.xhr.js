'use strict'
var express = require('./_app')
var request = require('supertest')
var assert = require('assert')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.xhr', function () {
    it('should return true when X-Requested-With is xmlhttprequest', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(req.xhr)
        res.end()
      })

      request(app)
        .get('/')
        .set('X-Requested-With', 'xmlhttprequest')
        .expect(200, done)
    })

    it('should case-insensitive', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(req.xhr)
        res.end()
      })

      request(app)
        .get('/')
        .set('X-Requested-With', 'XMLHttpRequest')
        .expect(200, done)
    })

    it('should return false otherwise', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(!req.xhr)
        res.end()
      })

      request(app)
        .get('/')
        .set('X-Requested-With', 'blahblah')
        .expect(200, done)
    })

    it('should return false when not present', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(!req.xhr)
        res.end()
      })

      request(app)
        .get('/')
        .expect(200, done)
    })
  })
})
