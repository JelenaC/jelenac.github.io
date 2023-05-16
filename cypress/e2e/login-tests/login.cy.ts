/// <reference types="cypress" />
import Chance from 'chance'

const chance = new Chance()

describe('First test', ()=>{
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
        //cy.contains(`Let's reverse some sentences.. Whoho :)`)
        cy.contains(`Are you ready to create funtastic stuff together?`)
    })

    // it('allows the use to reverse sentences', ()=>{
    //     //login  with custom method
    //     cy.login(username, password)
    //     const sentence = chance.sentence({words: 5})
         
    // })
})