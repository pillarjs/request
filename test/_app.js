'use strict'
var express = require('express')
var req = require('../').reqProto

module.exports = function () {
  var app = express()
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })
  return app
}

module.exports.Router = express.Router
module.exports.json = express.json
