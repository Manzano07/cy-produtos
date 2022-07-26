/// <reference types="cypress" />

import { productMock } from '../../../mock/productMock'

describe('Testes e2e referentes à tabela de produtos', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.viewport(1920, 1080)
    cy.visit('/')
  });

  it('Verificando se todos os campos estão visíveis', () => {
    cy.get('#form')
      .should('be.visible')
    
    cy.get('#form')
      .contains('Nome do Produto')

    cy.get('#form')
      .contains('Preço')

    cy.get('#form')
      .contains('Validade')
  });

  it('Verificar se os campos são obrigatórios', () => {
    cy.get(':nth-child(1) > .invalid-feedback')
      .should('not.be.visible')
      .log('Mensagem de campo inválido')

    cy.get(':nth-child(2) > .invalid-feedback')
      .should('not.be.visible')
      .log('Mensagem de campo inválido')

    cy.get(':nth-child(3) > .invalid-feedback')
      .should('not.be.visible')
      .log('Mensagem de campo inválido')

    cy.get('.btn')
      .click()
      .log('Botão de adicionar')

    cy.get('.invalid-feedback')
      .should('be.visible')
      .contains('Nome invalido')
      .log('Mensagem de campo inválido')
        
    cy.get('.invalid-feedback')
      .should('be.visible')
      .contains('Preço invalido')
      .log('Mensagem de campo inválido')
  
    cy.get('.invalid-feedback')
      .should('be.visible')
      .contains('Validade Invalida')
      .log('Mensagem de campo inválido')
  });

  it('Validação dos campos da tabela', () => {
    cy.get('#inputNome')
      .type(productMock.name)
      .log('Nome do produto')

    cy.get('#inputPreco')
      .type(productMock.negativeValue)
      .log('Valor do produto')

    cy.get('#inputValidade')
      .click()
      .type('2022-12-31')
      .log('Data de validade')

    cy.get('.btn')
      .click()
      .log('Botão de adicionar')

    cy.get('.invalid-feedback')
      .should('be.visible')
      .contains('Preço invalido')
      .log('Mensagem de campo inválido')
  
    cy.get('#conteudoTabela tr')
      .should('have.length', 0)
      .log('Contador de itens da tabela')
  });

  it('Verificar contador de itens na tabela', () => {
    let i = 0;
    while (i < 5) {
      cy.adicionarProduto()
    i++;
    }

    cy.get('#conteudoTabela tr')
      .should('have.length', 5)
      .log('Contador de itens da tabela')
  });
});