/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
    cy.visit('./src/index.html') 
    })

    it('verifica o título da aplicação', function() {   
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatorios e envia form', function(){
        const longtext = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'    
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Um')
        cy.get('#email').type('jairmessias@gmail.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})   
        cy.get('button[type="submit"]').click()

        cy.get('.success > strong').should('be.visible')   
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Um')
        cy.get('#email').type('teste@gmail!com')
        cy.get('#open-text-area').type('TEse')   
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')   
    })

    it('campo de telefone só aceita números',function(){
        cy.get('#phone').type('TESTEERROS')
        cy.get('#phone').should('have.text', '')  
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Um')
        cy.get('#email').type('jairmessias@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste teste')   
        cy.get('button[type="submit"]').click()

        cy.get('.error > strong').should('be.visible')  
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName')
    .type('Teste')
    .should('have.value', 'Teste')
    .clear()
    .should('have.value', '')


    cy.get('#lastName')
    .type('Um')
    .should('have.value', 'Um')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('jairmessias@gmail.com')
    .should('have.value', 'jairmessias@gmail.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('123456')
    .should('have.value', '123456')
    .clear()

    cy.get('#open-text-area')
    .type('Teste teste')
    .should('have.value', 'Teste teste')   
    .clear()
    .should('have.value', '')

})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
    cy.get('button[type=submit]').click()
    cy.get('.error').should('be.visible')

})


it('envia o formuário com sucesso usando um comando customizado',function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
})

it('cy.Contains',function(){
    cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Um')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type('TEse')   
        cy.contains('button', 'Enviar').click()
    
        cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto',function(){
    cy.get('select').select('YouTube')
    cy.get('select').should('have.value','youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)',function(){
    cy.get('select').select('mentoria')
    cy.get('select').should('have.value','mentoria')
})

it('seleciona um produto (Blog) por seu índice',function(){
    cy.get('select').select(1)
    cy.get('select').should('have.value','blog')
})

it('marca o tipo de atendimento "Feedback"',function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
})

it('marca cada tipo de atendimento"',function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
        cy.wrap($radio).check()
        .should('be.checked')    })
    
})

it('marca ambos checkboxes, depois desmarca o último',function(){
   cy.get('input[type="checkbox"]')
   .check()
   .last()
   .uncheck()
   .should('not.be.checked')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
    cy.get('#phone-checkbox')
    .check()
    .should('be.checked')
    .uncheck()
    .should('not.be.checked')
})

it('seleciona um arquivo da pasta fixtures',function(){
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json')
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo simulando um drag-and-drop',function(){
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json', { action: "drag-drop"})
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
    cy.fixture('example.json').as('samplefile')
    cy.get('input[type="file"]')
    .selectFile('@samplefile')
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
    cy.get('#privacy a')
    .should('have.attr', 'target', "_blank")
})

it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
    
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')

    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
 
})

it('Controle o "relógio" 🕐 do navegador com os comandos cy.clock() e cy.tick()',function(){
    
    cy.contains('button', 'Enviar').click()
    .clock()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
 
})

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function() {
   const longtxt = Cypress._.repeat('0123456789', 20)

   cy.get('#open-text-area')
   .invoke('val', longtxt)
   .should('have.value', longtxt)


  })

  it('Requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response){
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
    })
 
   })

   it('Gato', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', '🐈')
      .invoke('hide')
      .should('not.be.visible')
  })

})