> [!CAUTION]
> **This repository is archived and no longer actively maintained.**
>
> We are no longer accepting issues, feature requests, or pull requests.
> For additional support or questions, please visit the [Express.js Discussions page](https://github.com/expressjs/express/discussions).



# Express Request

A sugar layer on top of `http.IncomingMessage`. Provides a higher level abstraction
for interacting with http requests.

## Usage

```
$ npm install --save @pillarjs/request
```

```javascript
const http = require('http')
const Request = require('@pillarjs/request')

http.createServer(function (origReq, res) {
  const req = Request(origReq)

  // Now we have the express style request
  // with all of the sugar methods.
  // See the express docs for details
  console.log(req.hostname, req.ip)
}).listen()
```

You can optionally extend or override the prototype to use by passing it
as the second parameter:

```javascript
const http = require('http')
const Request = require('@pillarjs/request')

// Extend from our existing request proto
const NewReqProto = Object.create(Request.reqProto)

// Add Our custom method
NewReqProto.httpDescription = function () {
  return this.method.toUpperCase() + ' ' + this.path
}

http.createServer(function (origReq, res) {
  const req = Request(origReq, NewReqProto)
  // GET /foo prints "GET /foo"
  console.log(req.httpDescription())
}).listen()
```

## History and Reasoning

> One of Node's biggest failures is not having better `req/res` interfaces as part of the platform.

&ndash; [@ianstormtaylor](https://twitter.com/ianstormtaylor/status/1148327565209161728)

The Node core implementation of an http request is purposly slim. In the early days
of the platform this led to the success of a more high level api which was built
into Express.  Today, in 2019, Express is still the most popular http framework but
there is more depth to developers choices today.

Due to the popularity of Express, many compatibility layers have been introduced
in platforms and frameworks.

> Found another example of Node's lack of good `req` and `res` causing complexity...
> Google Cloud has to expose "Express-compatible" objects (a) for the simple convenience methods and (b) so their users can use all the packages that are tightly coupled to Express in the ecosystem.
> ![GCE Docs](https://pbs.twimg.com/media/D_uGtaAUYAA_oTs.jpg:small)

&ndash; [@ianstormtaylor](https://twitter.com/ianstormtaylor/status/1148327565209161728)

Well Ian kept tweeting about it, so I started the effort to extract the Express
request. The goal of this is to start the process from today's world where there
are many competing implementations with little shared implementation, to one
where frameworks and shared componentry are usable across ecosystems.

The shared interface can both be a contract between http framework ecosystems,
as well as a proving ground for future additions to node core.  It can be a place
for us all to collaborate on improvements and advancements.
