context('agilicious', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should be loading when it cannot connect to the server', () => {
		cy.get('#root h1').should('contain.text', 'Loading...');
	});

	it('calls custom commands from support file', () => {
		cy.customCommand().should('equal', 42);
	});
});
