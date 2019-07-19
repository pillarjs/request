'use strict'
var http = require('http')
var request = require('supertest')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var Req = require('..')

describe('Request(req)', function () {
  it('should wrap a node core http IncomingMessage', function (done) {
    var server = http.createServer(function (req, res) {
      const r = Req(req)
      res.end(r.path)
    })

    request(server)
      .get('/foo')
      .expect(200, '/foo', done)
  })
  it('should allow passing an override proto', function (done) {
    const NewReqProto = Object.create(Req.reqProto)
    NewReqProto.httpDescription = function () {
      return this.method.toUpperCase() + ' ' + this.path
    }

    var server = http.createServer(function (req, res) {
      const r = Req(req, NewReqProto)
      res.end(r.httpDescription())
    })

    request(server)
      .get('/foo')
      .expect(200, 'GET /foo', done)
  })
})
