'use strict'

const http = require('http')
const moment = require('moment')

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url === '/time') {
        const timestamp = moment(new Date())
        const currentTime = timestamp.format('h:mm A')
        res.writeHeader(200, {'Content-Type': 'text/html'})
        res.write(
          `<h1>Current time of the server:&nbsp;
            <time>` + currentTime +
            `</time>
          <h1>`
        )
        res.end()
      } else if (req.url === '/greet') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(
          `<h1>Say hello to someone</h1>
          <form action="/greet" method="post">
            <input type="text" name="name" placeholder="Enter Name">
            <input type="submit" value="Submit">
          </form>`
        )
        res.end()
      } else if (req.url.slice(0, 7) === '/greet/' && req.url.length > 7) {
        const name = req.url.slice(7)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h1>Hello ' + name + '!</h1>')
        res.end()
      } else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write('<h1>ERROR: This page does not exist.</h1>')
        res.end()
      }
      break

    case 'POST':
      if (req.url === '/greet') {
        req.on('data', data => {
          const dataStr = data.toString()
          const name = dataStr.slice(dataStr.indexOf('=') + 1)
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write('<h1>Hello ' + name + '!</h1>')
          res.end()
        })
      }
      break

    default:
      console.error('HTTP request method not supported by this server')
  }
})

server.listen(3000, err => {
  if (err) throw err
  console.log('Listening on port 3000 ...')
})
