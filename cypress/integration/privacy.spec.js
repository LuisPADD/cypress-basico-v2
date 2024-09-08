it('teste independente', function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')

    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')


})