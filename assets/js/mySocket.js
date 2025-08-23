//Author Ian Andler Pascual
//Goal: Creation of a WebSocket connection to the server
//Utilizes the socket.io library


// Extract username and explicitly set playerType
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const playerType = window.location.pathname.includes('player1') ? 'player1' : 'player2';

console.log(`Connecting as ${username} with playerType: ${playerType}`); // Debug log

// Connect with Socket.IO, passing username and playerType as query parameters
var socket = io("http://127.0.0.1:3000", {
    query: { 
        username: username,
        playerType: playerType
    },
    secure: true
});

// Immediately update current player's name when socket connects
socket.on('connect', () => {
    console.log(`Socket.IO connected as ${playerType} with username: ${username}`);
    this.connected = true;
    
    // Update current player's username display
    updatePlayerName(playerType, username);
    addMessage(`Connected as ${username}`);

    // Emit a request for other players' information
    socket.emit('requestPlayers', { playerType, username });
});


socket.on('gameEvent', (message) => {
    try {
        console.log('Received Socket.IO message:', message);

        switch(message.type) {
            case 'dealResponse':
                console.log('Processing deal response:', message);
                //clear the hands
                clearHands();
                console.log('Hands cleared');
                
                // Process all player cards
                Object.entries(message.cards).forEach(([type, cards]) => {
                    console.log(`Processing ${type}'s cards:`, cards);
                    //for each card in the cards array
                    cards.forEach(card => {
                        //hit the card
                        blackjack.hit(card, type);
                    });
                });

                // Process dealer cards separately and in order
                if (message.dealerCards && Array.isArray(message.dealerCards)) {
                    console.log('Dealer cards to process:', message.dealerCards);
                    // First card face down
                    if (message.dealerCards[0]) {
                        blackjack.hit(message.dealerCards[0], 'dealer');  // true for face down
                    }
                    
                    // Second card face up
                    if (message.dealerCards[1]) {
                        blackjack.hit(message.dealerCards[1], 'dealer');
                    }
                }
                
                // Update points - show '?' for dealer since first card is hidden
                updatePoints(blackjack.player.userhand.getScore(), playerType);
                updatePoints('?', 'dealer');

                // Enable hit and stand buttons for current player
                makeClickable(document.getElementById('hit'));
                makeClickable(document.getElementById('stand'));
                makeUnclickable(document.getElementById('deal'));
                break;

            case 'hitResponse':
                // Update the player's hand and score
                whoHit = message.playerType;
                console.log('Processing hit response:', message);
                //hit the card
                blackjack.hit(message.card, whoHit);
                break;

            case 'standResponse':
                console.log('Processing stand response:', message);
                
                // Reveal dealer's hidden card
                const hiddenCard = document.querySelector('#dealer_hand #facedown');
                //if the hidden card exists and the dealer has more than one card
                if (hiddenCard && message.dealerCards.length > 0) {
                    console.log('Revealing dealer hidden card:', message.dealerCards[0]);
                    hiddenCard.id = message.dealerCards[0].name;
                    updatePoints(message.finalScore, 'dealer');
                }

                // Process dealer hits
                if (message.dealerHits && message.dealerHits.length > 0) {
                    console.log('Processing dealer hits:', message.dealerHits);
                    //for each card in the dealerHits array
                    message.dealerHits.forEach(card => {
                        //show the card
                        showDealtCard('dealer', false, card.name);
                        //add the card to the dealer's hand
                        blackjack.dealer.addCard(blackjack.createCard(card));
                    });
                }

                updatePoints(message.finalScore, 'dealer');
                //stand the player
                blackjack.stand();
                break;

            case 'playerJoined':
                console.log('Player joined:', message);
                // Determine which player element to update based on the joined player's type
                const joinedPlayerType = message.playerType;
                const usernameElement = document.getElementById(`${joinedPlayerType}-username`);
                //update the player's name
                updatePlayerName(joinedPlayerType, message.username);
                //add a message to the chat
                addMessage(`${message.username} joined the game`);
                break;

            case 'currentPlayers':
                console.log('Current players:', message.players);
                // Update all current players' names
                message.players.forEach(player => {
                    updatePlayerName(player.playerType, player.username);
                });
                break;

            case 'error':
                console.error('Server error:', message.message);
                //add a message to the chat
                addMessage('Error: ' + message.message);
                break;

            case 'waitingForDeal':
                //add a message to the chat
                addMessage(`Waiting for ${message.username} to deal...`);
                //make the deal button unclickable
                makeUnclickable(document.getElementById('deal'));
                break;

            case 'readyToDeal':
                addMessage('Both players ready! Dealing cards...');
                // The server will send the dealResponse after this
                break;

            case 'waitingForStand':
                //add a message to the chat
                addMessage(`Waiting for ${message.username} to finish their turn...`);
                break;

            case 'readyToReveal':
                addMessage('Both players finished! Revealing cards...');
                // The server will send the standResponse after this
                break;

            case 'playerDisconnected':
                clearOtherPlayer();
                break;
        }
    } catch (error) {
        console.error('Error processing message:', error);
        console.error('Raw message:', message);
    }
});
//close
socket.on('close', () => {
    console.log('WebSocket disconnected');
    //add a message to the chat
    addMessage('Disconnected from server');
});

//error
socket.on('error', (error) => {
    console.error('WebSocket error:', error);
    //add a message to the chat
    addMessage('Connection error. Details: ' + (error.message || 'Unknown error'));
});
        


//send player action
function sendPlayerAction(data) {
    sendingData = {type: data};
    if (!socket.connected) {
        console.error('Socket not connected');
        return;
    }

    // Ensure data has the required type property
    if (!sendingData.type) {
        console.error('Action type is required');
        return;
    }

    console.log('Sending player action:', sendingData);
    socket.emit('gameAction', sendingData);
}

//handle bet response
function handleBetResponse(message) {
    // Update the bet display for the current player
    updateBet(message.amount, this.playerType);
}





