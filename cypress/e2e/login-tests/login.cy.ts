/// <reference types="cypress" />
import Chance from 'chance'
import jwt_decode from "jwt-decode"

const chance = new Chance()

describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
})

//try accessing protected route - should fail

describe('Trying to access protected route without logging in should redirect user to login page', () => {
    it('redirects user to login', ()=>{
        cy.visit('http://localhost:3000/#/my-profile')
        cy.url().should('be.equal', 'http://localhost:3000/#/login')
        cy.contains('But first thing first - you need to log in!')
    }) 
})

//log in with credentials - should redirect to start page

describe('After successful login, user should be redirected to home page', ()=>{
    it('logs in the user', () => {
        const myUsername = 'jelenacumbo@gmail.com'
        const myPassword = 'SeglaLugnt'

        cy.session('login', () => {
            cy.visit('http://localhost:3000/#/login')
            cy.get('input[name=email]').type(myUsername)
            cy.get('input[name=password]').type(`${myPassword}{enter}`)
            // cy.get('button[type=submit]').click()
            cy.url().should('be.equal', 'http://localhost:3000/#/')
            //cy.url().should('contain', '/')
            //cy.url().should('eq', 'http://localhost:3000/#/')
          })
        //cy.url().should('be.equal', 'http://localhost:3000/#/')
    })
})


//log in via api - should save token in local storage and check if exists

describe('Log in via api - After successful login, user should be redirected to home page', ()=>{
    it('logs in via api', () => {
        const myUsername = 'jelenacumbo@gmail.com'
        const myPassword = 'SeglaLugnt'

        cy.session('Log in', () => {
            cy.request({
              method: 'POST',
              url: 'https://ws-api.alphadev.se/login',
              body: {
                username: myUsername,
                password: myPassword
            }
            }).then(({ body }) => {
              window.localStorage.setItem('token', body.token)
            })
            cy.url().should('be.equal', 'http://localhost:3000/#/')

          })
    })
})

//log in and try accessing protected route - should pass
//get token from local storage and go to protected route should pass
// token expired - go to protected route - fail and redirect to login page

describe('Log in via page visit', ()=>{
    const username = 'jelenacumbo@gmail.com'
    const password = 'SeglaLugnt'

    beforeEach(()=>{
        cy.visit('http://localhost:3000/#/login')
    })

    it('has a title', ()=>{
        cy.contains('Welcome!')
        
    })

    it('logs in a user', ()=>{
        //Assert url
        cy.url().should('include', 'login')
        //Fill out the form
        cy.get('input[name=email]').type(username)
        cy.get('input[name=password]').type(password)
        cy.get('button[type=submit]').click()
        //Assert 
        
        cy.url().should('contain', '/')
        // Successfully route to `/profile` path
        cy.url().should('be.equal', 'http://localhost:3000/#/')
    },
    )

    // it('allows the use to reverse sentences', ()=>{
    //     //login  with custom method
    //     cy.login(username, password)
    //     const sentence = chance.sentence({words: 5})
         
    // })
})

describe('Login -  ', ()=>{
    const myUsername = 'jelenacumbo@gmail.com'
    const myPassword = 'SeglaLugnt'

    beforeEach(()=>{
        cy.visit('http://localhost:3000/#/login')
    })

    it('Log in via api', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://ws-api.alphadev.se/login',
            body: {
                username: myUsername,
                password: myPassword
            }
        }).then((response)=>{
            const claims: any = jwt_decode(response.body.token)
            // If successful, check to make sure usernames match
            expect(claims.username).to.eq(myUsername)
            // Set the local storage value for token
            cy.window().then(win => win.localStorage.setItem('token', response.body.token))
            window.localStorage.setItem('authToken', response.body.token)

            // const { username, iat, exp } = claims
            // console.log('RESPONSE API', claims, username)
        })

        cy.getAllLocalStorage().then((result) => {
            console.log('CHECK WHAT*S IN', result)
            expect(result).to.deep.equal({
              'http://localhost:3000': {
                token: 'value',
              },
            })
          })

        //cy.getCookie("token").should("exist");
        
    })


    it('logs in a user', ()=>{
        //Assert url
        cy.url().should('include', 'login')
        //Fill out the form
        cy.get('input[name=email]').type(myUsername)
        cy.get('input[name=password]').type(myPassword)
        cy.get('button[type=submit]').click()
        //Assert 
        //cy.contains(`Let's reverse some sentences.. Whoho :)`)
        cy.contains(`Are you ready to create funtastic stuff together?`)
    })

    // it('allows the use to reverse sentences', ()=>{
    //     //login  with custom method
    //     cy.login(username, password)
    //     const sentence = chance.sentence({words: 5})
         
    // })
})