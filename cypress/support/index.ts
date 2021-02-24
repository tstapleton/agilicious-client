require('@cypress/code-coverage/support');

declare global {
	namespace Cypress {
		interface Chainable {
			customCommand: typeof customCommand;
		}
	}
}

export function customCommand() {
	return cy.wrap(42);
}

Cypress.Commands.add('customCommand', customCommand);
