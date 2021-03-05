import { Server, WebSocket as MockSocket } from 'mock-socket';
import { v4 } from 'uuid';

context('agilicious', () => {
	let mockServer: Server | undefined;

	beforeEach(() => {
		cy.visit('/', {
			onBeforeLoad(win) {
				cy.stub(win, 'WebSocket').callsFake((url) => new MockSocket(url));

				mockServer = new Server('ws://localhost:1337/');
				mockServer.on('connection', (socket) => {
					socket.on('message', (data) => {
						const serverEvent = {
							id: v4(),
							type: 'SERVER_EVENT::GAME_STATE',
							activePlayerId: v4(),
							eventByPlayerId: v4(),
							gameOwnerId: v4(),
							issues: [],
							phase: 'PLAYING',
							playerId: v4(),
							players: [],
						};
						socket.send(JSON.stringify(serverEvent));
					});
				});
			},
		});
	});

	it('should start a new game', () => {
		cy.get('[data-cy=new-game]').click();
		cy.get('[data-cy=create-game-name]').type('Michael Scott');
		cy.get('[data-cy=create-game]').click();
		cy.get('[data-cy=game-play-container]').should('be.visible');
	});
});
