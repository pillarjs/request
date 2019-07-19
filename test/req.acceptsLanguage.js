'use strict'
var express = require('./_app')
var request = require('supertest')
var assert = require('assert')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.acceptsLanguage', function () {
    it('should be true if language accepted', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(req.acceptsLanguage('en-us'))
        assert(req.acceptsLanguage('en'))
        res.end()
      })

      request(app)
        .get('/')
        .set('Accept-Language', 'en;q=.5, en-us')
        .expect(200, done)
    })

    it('should be false if language not accepted', function (done) {
      var app = express()

      app.use(function (req, res) {
        assert(!req.acceptsLanguage('es'))
        res.end()
      })

      request(app)
        .get('/')
        .set('Accept-Language', 'en;q=.5, en-us')
        .expect(200, done)
    })

    describe('when Accept-Language is not present', function () {
      it('should always return true', function (done) {
        var app = express()

        app.use(function (req, res) {
          assert(req.acceptsLanguage('en'))
          assert(req.acceptsLanguage('es'))
          assert(req.acceptsLanguage('jp'))
          res.end()
        })

        request(app)
          .get('/')
          .expect(200, done)
      })
    })
  })
})
