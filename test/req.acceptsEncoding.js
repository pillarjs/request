'use strict'
var express = require('./_app')
var request = require('supertest')
var assert = require('assert')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.acceptsEncoding', function () {
    it('should be true if encoding accepted', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(req.acceptsEncoding('gzip'))
        assert(req.acceptsEncoding('deflate'))
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
        assert(!req.acceptsEncoding('bogus'))
        res.end()
      })

      request(app)
        .get('/')
        .set('Accept-Encoding', ' gzip, deflate')
        .expect(200, done)
    })
  })
})
