/* globals describe, it */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const moment = require('moment')

chai.use(chaiHttp)

// require(__dirname + '/server.js') <--- Had to remove in order to keep the Terminal from hanging when using gulp

describe('Routes', () => {
  it('A GET request to "/time" should have a successful response that provides a string with particular content', done => {
    chai.request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        if (err) console.error(err)
        expect(err).to.be.null
        expect(res.status).to.equal(200)
        expect(res.text).to.be.a('string')
        expect(res.text).to.equal(
          `<h1>Current time of the server:&nbsp;
            <time>` + moment(new Date()).format('h:mm A') +
            `</time>
          <h1>`
        )
        done()
      })
  })

  it('A GET request to "/greet" should have a successful response that provides a string with particular content', done => {
    chai.request('localhost:3000')
      .get('/greet')
      .end((err, res) => {
        if (err) console.error(err)
        expect(err).to.be.null
        expect(res.status).to.equal(200)
        expect(res.text).to.be.a('string')
        expect(res.text).to.equal(
          `<h1>Say hello to someone</h1>
          <form action="/greet" method="post">
            <input type="text" name="name" placeholder="Enter Name">
            <input type="submit" value="Submit">
          </form>`
        )
        done()
      })
  })

  it('A GET request to "/greet/name" (where name is any string) should have a successful response that provides a string with particular content', done => {
    chai.request('localhost:3000')
      .get('/greet/Jeff')
      .end((err, res) => {
        if (err) console.error(err)
        expect(err).to.be.null
        expect(res.status).to.equal(200)
        expect(res.text).to.be.a('string')
        expect(res.text).to.equal('<h1>Hello Jeff!</h1>')
        done()
      })
  })

  it('A GET request to a route that is not set up will result in an error status and message being sent to the client', done => {
    chai.request('localhost:3000')
      .get('/')
      .end((err, res) => {
        if (err) console.error(err)
        expect(err).to.be.null
        expect(res.status).to.equal(404)
        expect(res.text).to.be.a('string')
        expect(res.text).to.equal('<h1>ERROR: This page does not exist.</h1>')

        chai.request('localhost:3000')
          .get('/greet/')
          .end((err, res) => {
            if (err) console.error(err)
            expect(err).to.be.null
            expect(res.status).to.equal(404)
            expect(res.text).to.be.a('string')
            expect(res.text).to.equal('<h1>ERROR: This page does not exist.</h1>')
            done()
          })
      })
  })
})
