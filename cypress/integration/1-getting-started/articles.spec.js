/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('articles', () => {

    const images = ['img1.jpg', 'img2.png', 'img3.jpg']
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://127.0.0.1:8000/')
    })
    // helpers
    const GoTo = {
        readArticles: () => {
            cy.get('.ant-menu-submenu-title > .ant-menu-title-content').click();
            cy.get('.ant-menu-item:nth-child(2) > .ant-menu-title-content > a').click();
            cy.get(':nth-child(1) > .ant-card-actions > :nth-child(2) > :nth-child(1) > a').click();
        },
        createArticle: () => {
            cy.get('.ant-menu-submenu-title > .ant-menu-title-content').click();
            cy.get('.ant-menu-item:nth-child(1) > .ant-menu-title-content > a').click();
        }
    }
    const Do = {
        clearFormFields: () => {
            cy.get('#basic_title').clear();
            cy.get('#basic_description').clear()
            cy.get('.jodit-wysiwyg').clear();
        },
        submit: () => {
            cy.get('.ant-form-item-control-input-content > .ant-btn').click();
        },
        fillInputs: (title, image, desc, content) => {
            console.log(image);
            cy.get('#basic_title').type(title);
            cy.get('input[type="file"]').attachFile(image);
            cy.get('#basic_description').type(desc);
            cy.get('.jodit-wysiwyg').type(content);
        }
    }
    const Assert = {
        validationOnEdit: () => {
            cy.get(':nth-child(1) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The title field is required.');
            cy.get(':nth-child(3) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The description field is required.');
            cy.get(':nth-child(4) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The content field is required.');
        },
        validationOnCreate: () => {
            cy.get(':nth-child(1) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The title field is required.');
            cy.get(':nth-child(2) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The cover field is required.');
            cy.get(':nth-child(3) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The description field is required.');
            cy.get(':nth-child(4) > .ant-row > .ant-col-16 > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error').should('have.text', 'The content field is required.');
        },
        afterEdit: (title, desc, content) => {
            cy.get(':nth-child(1) > .ant-card-body > a > .ant-card-meta > .ant-card-meta-detail > .ant-card-meta-description').should('have.text', desc);
            cy.get(':nth-child(1) > .ant-card-body').click();
            cy.get('.text-3xl').should('have.text', title);
            cy.get('p').should('have.text', content);
        },
        afterCreate: (title, desc, content) => {
            cy.get(':last-child() > .ant-card-body > a > .ant-card-meta > .ant-card-meta-detail > .ant-card-meta-description').should('have.text', desc);
            cy.get(':last-child() > .ant-card-body').click();
            cy.get('.text-3xl').should('have.text', title);
            cy.get('p').should('have.text', content);
        }
    }
    it('validation on edit', () => {
        /* ==== Generated with Cypress Studio ==== */
        GoTo.readArticles();
        Do.clearFormFields();
        Do.submit();
        Assert.validationOnEdit()
        /* ==== End Cypress Studio ==== */
    })

    it('edit', () => {
        /* ==== Generated with Cypress Studio ==== */
        const title = faker.word.noun();
        const desc = faker.lorem.lines(1);
        const content = faker.lorem.paragraph();
        GoTo.readArticles();
        Do.clearFormFields();
        Do.fillInputs(title, images[faker.datatype.number({ min: 0, max: images.length - 1 })], desc, content);
        Do.submit();
        Assert.afterEdit(title,desc,content);
        /* ==== End Cypress Studio ==== */
    })

    it('validation on create', () => {
        /* ==== Generated with Cypress Studio ==== */
        GoTo.createArticle();
        Do.submit();
        Assert.validationOnEdit()
        /* ==== End Cypress Studio ==== */
    })

    it('create article', () => {
        const title = faker.word.noun();
        const desc = faker.lorem.lines(1);
        const content = faker.lorem.paragraph();
        /* ==== Generated with Cypress Studio ==== */
        GoTo.createArticle();
        Do.fillInputs(title, images[faker.datatype.number({ min: 0, max: images.length - 1 })], desc, content);
        Do.submit();
        Assert.afterCreate(title,desc,content);
        /* ==== End Cypress Studio ==== */
    })


})
