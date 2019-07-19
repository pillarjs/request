'use strict'
var express = require('./_app')
var request = require('supertest')
var cookieParser = require('cookie-parser')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

describe('req', function () {
  describe('.signedCookies', function () {
    it('should return a signed JSON cookie', function (done) {
      var app = express()

      app.use(cookieParser('secret'))

      app.use(function (req, res) {
        if (req.path === '/set') {
          res.cookie('obj', { foo: 'bar' }, { signed: true })
          res.end()
        } else {
          res.send(req.signedCookies)
        }
      })

      request(app)
        .get('/set')
        .end(function (err, res) {
          if (err) return done(err)
          var cookie = res.header['set-cookie']

          request(app)
            .get('/')
            .set('Cookie', cookie)
            .expect(200, { obj: { foo: 'bar' } }, done)
        })
    })
  })
})
