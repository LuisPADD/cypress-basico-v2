
 Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Um')
    cy.get('#email').type('jairmessias@gmail.com')
    cy.get('#phone').type('123456')
    cy.get('#open-text-area').type('Teste teste')   
    cy.get('button[type="submit"]').click()
 })
