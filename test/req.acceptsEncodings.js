'use strict'
var express = require('./_app')
var request = require('supertest')
var assert = require('assert')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.acceptsEncodings', function () {
    it('should be true if encoding accepted', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(req.acceptsEncodings('gzip'))
        assert(req.acceptsEncodings('deflate'))
        res.end()
      })

      request(app)
        .get('/')
        .set('Accept-Encoding', ' gzip, deflate')
        .expect(200, done)
    })

    it('should be false if encoding not accepted', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(!req.acceptsEncodings('bogus'))
        res.end()
      })

      request(app)
        .get('/')
        .set('Accept-Encoding', ' gzip, deflate')
        .expect(200, done)
    })
  })
})
