/// <reference types="cypress" />
import Chance from 'chance'
import jwt_decode from "jwt-decode"

const chance = new Chance()

describe('Login Page', () => {
    it('successfully loads', () => {
        cy.visit('/login')
    })
})

//try accessing protected route - should fail

describe('Trying to access protected route without logging in should redirect user to login page', () => {
    it('redirects user to login', ()=>{
        cy.visit('/my-profile')
        cy.url().should('be.equal', 'http://localhost:3000/#/login')
        cy.contains('But first thing first - you need to log in!')
    }) 
})

describe('The Login Page', () => {
    beforeEach(() => {
    
        const username = 'jelenacumbo@gmail.com'
        const password = 'SeglaLugnt'

        cy.intercept(
            {
                method: 'POST',
                url: '**/login',
            }).as('getToken')

        cy.visit('/login')
        cy.get('input[name=email]').type(username)
        cy.get('input[name=password]').type(password)
        cy.get('#waza').focus().click({force:true})

        cy.wait('@getToken').then((interception) => {
            // we can now access the low level interception
            // that contains the request body,
            // response body, status, etc
            cy.getLocalStorage('token').should('exist')
        })
    })
    
    it('sets auth cookie when logging in via form submission', function () {

        //change the token in localstorage ot 'waza'

        //execute a command that does an api call that should have a certain status



    })

    it('token expires or changed, should fire 401 and show message', function () {
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
            //should have a certain status
            //ui should show the message that you need to login again
            console.log('woza', interception.response?.statusCode)
            
            cy.url().should('be.equal', 'http://localhost:3000/#/')
        })
    })
 
  })

//log in with credentials - should redirect to start page

// describe('After successful login, user should be redirected to home page', ()=>{
//     it('Log in user', () => {
//         const myUsername = 'jelenacumbo@gmail.com'
//         const myPassword = 'SeglaLugnt'

//         cy.session('login', () => {
//             cy.visit('http://localhost:3000/#/login')
//             cy.get('input[name=email]').type(myUsername)
//             cy.get('input[name=password]').type(`${myPassword}{enter}`)
//             // cy.get('button[type=submit]').click()
//             cy.url().should('be.equal', 'http://localhost:3000/#/')
//             //cy.url().should('contain', '/')
//             //cy.url().should('eq', 'http://localhost:3000/#/')



//           })
//         //cy.url().should('be.equal', 'http://localhost:3000/#/')
//     })
// })


//log in via api - should save token in local storage and check if exists

// describe('Log in via api - After successful login, user should be redirected to home page', ()=>{
//     it('logs in via api', () => {
//         const myUsername = 'jelenacumbo@gmail.com'
//         const myPassword = 'SeglaLugnt'

//         cy.session('Log in', () => {
//             cy.request({
//               method: 'POST',
//               url: 'https://ws-api.alphadev.se/login',
//               body: {
//                 username: myUsername,
//                 password: myPassword
//             }
//             }).then(({ body }) => {
//               window.localStorage.setItem('token', body.token)
//             })
//             cy.url().should('be.equal', 'http://localhost:3000/#/')

//           })
//     })
// })

//log in and try accessing protected route - should pass
//get token from local storage and go to protected route should pass
// token expired - go to protected route - fail and redirect to login page


// describe('Login -  ', ()=>{
//     const myUsername = 'jelenacumbo@gmail.com'
//     const myPassword = 'SeglaLugnt'

//     beforeEach(()=>{
//         cy.visit('http://localhost:3000/#/login')
//     })

//     it('Log in via api', ()=>{
//         cy.request({
//             method: 'POST',
//             url: 'https://ws-api.alphadev.se/login',
//             body: {
//                 username: myUsername,
//                 password: myPassword
//             }
//         }).then((response)=>{
//             const claims: any = jwt_decode(response.body.token)
//             // If successful, check to make sure usernames match
//             expect(claims.username).to.eq(myUsername)
//             // Set the local storage value for token
//             cy.window().then(win => win.localStorage.setItem('token', response.body.token))
//             window.localStorage.setItem('authToken', response.body.token)

//             // const { username, iat, exp } = claims
//             // console.log('RESPONSE API', claims, username)
//         })

//         cy.getAllLocalStorage().then((result) => {
//             console.log('CHECK WHAT*S IN', result)
//             expect(result).to.deep.equal({
//               'http://localhost:3000': {
//                 token: 'value',
//               },
//             })
//           })

//         //cy.getCookie("token").should("exist");
        
//     })


    // it('logs in a user', ()=>{
    //     //Assert url
    //     cy.url().should('include', 'login')
    //     //Fill out the form
    //     cy.get('input[name=email]').type(myUsername)
    //     cy.get('input[name=password]').type(myPassword)
    //     cy.get('button[type=submit]').click()
    //     //Assert 
    //     //cy.contains(`Let's reverse some sentences.. Whoho :)`)
    //     cy.contains(`Are you ready to create funtastic stuff together?`)
    // })

    // it('allows the use to reverse sentences', ()=>{
    //     //login  with custom method
    //     cy.login(username, password)
    //     const sentence = chance.sentence({words: 5})
         
    // })
