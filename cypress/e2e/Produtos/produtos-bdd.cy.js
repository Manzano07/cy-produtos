///<reference types="cypress" />

import { productMock } from '../../../mock/productMock'

describe('Validar cenários referentes a funcionalidade de uma tabela de produtos', () => {
    context('Dado que acesso o site da tabela', () => {
        beforeEach(() => {
            cy.clearCookies()
            cy.clearLocalStorage()
            cy.viewport(1920, 1080)
            cy.visit('/')
        });

    context('Quando acesso a página principal', () => {
        beforeEach(() => {
            cy.get('#form')
                .should('be.visible')
        });

        it('Então devo visualizar todos os campos da tabela', () => {
            cy.get('#form')
                .contains('Nome do Produto')
      
            cy.get('#form')
                .contains('Preço')
      
            cy.get('#form')
                .contains('Validade')
            });
        });
    });

    context('Dado que quero validar os campos obrigatórios', () => {
        beforeEach(() => {
            cy.visit('/')
        });

    context('Quando clico no botão adicionar com todos os campos em branco', () => {
        beforeEach(() => {
            cy.get('.btn')
                .click()
                .log('Botão de adicionar')
        });

        it('Então devo visualizar uma mensagem de campo obrigatório em todos os campos', () => {
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
        });
    });

    context('Dado que não posso adicionar produto com valor negaitvo', () => {
        beforeEach(() => {
            cy.visit('/')
        });
        
    context('Quando insiro um valor negativo no campo de preço', () => {
        beforeEach(() => {
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
        });
        
        it('Então devo visualizar uma mensagem de preço inválido', () => {
            cy.get('.invalid-feedback')
                .should('be.visible')
                .contains('Preço invalido')
                .log('Mensagem de campo inválido')
        });
    });
    });

    context('Dado que quero visualizar 5 itens na minha tabela de produtos', () => {
        beforeEach(() => {
            cy.visit('/')
        });
        
    context('Quando adiciono 5 produtos na minha tabela', () => {
        beforeEach(() => {
            let i = 0;
            while (i < 5) {
                cy.adicionarProduto()
            i++;
            };
        });
        
        it('Então devo visualizar um total de 5 produtos na minha tabela', () => {
            cy.get('#conteudoTabela tr')
                .should('have.length', 5)
                .log('Contador de itens da tabela')
        });
    });
    });
}); 