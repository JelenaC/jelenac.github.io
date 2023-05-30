/// <reference types="cypress" />

describe('Login Page', () => {
    it('successfully loads', () => {
        cy.visit('/login')
    })
})

describe('Access protected route', () => {
    it('unauthorized user accessing protected route, should redirect user to login page', ()=>{
        cy.visit('/my-profile')
        cy.url().should('be.equal', 'http://localhost:3000/#/login')
        cy.contains('But first thing first - you need to log in!')
    }) 
})

describe('Login Process', () => {
    beforeEach(() => {
        const username = 'jelenacumbo@gmail.com'
        const password = 'SeglaLugnt'

        cy.intercept({
            method: 'POST',
            url: '**/login',
        }).as('getToken')

        cy.visit('/login')
        cy.get('input[name=email]').type(username)
        cy.get('input[name=password]').type(password)
        cy.get('button[type=submit]').focus().click()

        cy.wait('@getToken').then((interception) => {
            // we can now access the low level interception that contains the request body, response body, status, etc
            cy.getLocalStorage('token').should('exist')
        })
    })
    
    it('log in with correct credentials, should redirect to start page', function () {
        cy.url().should('be.equal', 'http://localhost:3000/#/')
        cy.contains(`Let's reverse some sentences..`)
    })

    it('logged in user accessing protected route, should be successful', ()=>{
        cy.visit('/my-profile')
        cy.url().should('be.equal', 'http://localhost:3000/#/my-profile')
        cy.contains('Here is my profile and user info :)')
    }) 

    it('token expires or changed, should fire 401 and redirect to login page', function () {
        //Arrange
        cy.intercept(
            {
                method: 'GET',
                url: '**/sentence',
            }).as('getSentences')

        cy.setLocalStorage('token', 'waza')

        //Act
        cy.visit('/my-sentences')

        //Assert
        cy.wait('@getSentences').then((interception) => {
            expect(interception.response?.statusCode).to.equal(401)
            cy.url().should('be.equal', 'http://localhost:3000/#/login')
            cy.contains('But first thing first - you need to log in!')
        })
    })
 
  })
