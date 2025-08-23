/////////////////////////////////////////////////////////////////////////////////
//Author: Ian Andler Pascual
//Purpose: Sets up the Models of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//models.js
//setup variables for global use
const suits = ["H","S","C","D"];	//allowable suits
const maxCardsPerSuit = 13;		//max cards per suit
const thisPlayer = window.location.pathname.includes('player1') ? 'player1' : 'player2';
const otherPlayer = thisPlayer === 'player1' ? 'player2' : 'player1';

const bustLimit = 21;
const aceValue = 11;

const startingCash = 1000;


//card object defining setters and getters
var card = {
    rank:0,
    suit:'',
    name: '',
//sets rank of card
    setRank: function (value) { this.rank = value; },
    //gets rank of card
    getRank: function () { return this.rank; },
    //sets suit of card
    setSuit: function (value) { this.suit = value},
    //gets suit of card 
    getSuit: function () {return this.suit},
    //sets name of card
    setName: function(value){
        this.name = value;
    },
    //gets name of card
    getName: function(){
        return this.name;
    },

    



};



//object defining a players hand
var hand = {
    cards: [],
    score: 0,
    aces: 0,
    currentMove: '', // Track current move (hit/stay)

    initialize: function() {
        this.cards = [];
        this.score = 0;
        this.aces = 0;
        this.currentMove = '';
    },

    setMove: function(move) {
        this.currentMove = move;
        this.updatePlayerStatus(move);
        if(move === 'bust'){
            sendPlayerAction('stand');
        }
    },

    updatePlayerStatus: function(move) {
        sendPlayerAction('updateStatus', {
            username: gamePlay.getUsername(),
            status: move,
            roundsPlayed: gamePlay.gamesPlayed
        });
    },

    addCard: function(card) {
        this.cards.push(card);
        if(card.getRank() === aceValue){
            this.aces += 1;
        }
        this.setScore(card.getRank());
    },

    //set the score of the hand
    setScore: function(value){
        //add the card value to the score
        this.score += value;
        //if the score is greater than the bust limit and there are aces in the hand, adjust the score
        if(this.score > bustLimit){
            //while the score is greater than the bust limit and there are aces in the hand
            while(this.score > bustLimit && this.aces > 0){
                //subtract 10 from the score and decrement the ace counter
                this.score -= 10;
                //decrement the ace counter
                this.aces -= 1;
            }
        }
    },

    //get the score of the hand
    getScore: function(){
        return this.score;
    },

    //reset the hand    
    reset: function(){
        //while there are cards in the hand
        while (this.cards.length > 0){
            //discard the card to the discard pile
            this.cards.pop();
        }
        this.score = 0;
        this.aces = 0;
    },


    
    

};

//accounting model object for a player
var wallet = {
    value: 0,

    //set the value of the wallet
    setValue: function(amount){this.value = amount;},
    //get the value of the wallet
    getValue: function(){return this.value;},
    //add a value to the wallet
    addValue: function(amount){this.value += amount;},
    //decrement a value from the wallet
    decrementValue: function(amount){this.value -= amount;},



};

//model for defining a user in the game
var user = {
    userhand: Object.create(hand),
    userBet: 0,
    userWallet: Object.create(wallet),

    initialize: function(){
        this.userWallet.setValue(startingCash);
        this.userhand.initialize();
        this.userBet = 0;
    },

    //reset the bet
    resetBet: function() {
        this.userBet = 0;
        updateBet(0);
        // Reset to initial betting state
        makeUnclickable(document.getElementById('deal'));
        makeClickable(document.getElementById('increase_bet'));
        makeUnclickable(document.getElementById('decrease_bet'));
    },

    getBet: function(){
        return this.userBet; // Add a getter for the bet
    }
};

//blackjack game model
var blackjack = {
    dealer: Object.create(hand),
    player: Object.create(user),
    otherPlayer: Object.create(user),
    
    initialize: function() {
        // Reset dealer
        this.dealer = Object.create(hand);
        this.dealer.initialize();
        
        // Create completely new player objects
        this.player = Object.create(user);
        this.player.userhand = Object.create(hand);
        this.player.userWallet = Object.create(wallet);
        this.player.userWallet.setValue(1000); // Set initial wallet amount
        this.player.initialize();
        
        // Create completely new otherPlayer objects
        this.otherPlayer = Object.create(user);
        this.otherPlayer.userhand = Object.create(hand);
        this.otherPlayer.userWallet = Object.create(wallet);
        this.otherPlayer.initialize();
        
        // Initialize UI
        updateWallet(this.player.userWallet.getValue());
        updateBet(this.player.userBet);
        
        // Initialize buttons
        initializeButtons();
    },

    //discard the cards
    discardCards: function(){
        //reset the dealer
        this.dealer.reset();
        //reset the player's hand
        this.player.userhand.reset();
        //reset the other player's hand
        this.otherPlayer.userhand.reset();
    },
    //update the player status
    updatePlayerStatus: function() {
        return thisPlayer === 'player1';
        return playerType === 'player1';
    },

    //create a card
    createCard: function(inputCard) {
        //create a new card
        let newCard = Object.create(card);
        //set the name of the card
        newCard.setName(inputCard.name);
        //set the rank of the card
        newCard.setRank(inputCard.rank);
        //set the suit of the card
        newCard.setSuit(inputCard.suit);
        //return the new card
        return newCard;
    },

    //hit the player
    hit: function(card, playerType) {
        console.log(`Processing hit for ${playerType}:`, card);
        console.log(`the variable thisPlayer is ${thisPlayer}`);
        console.log(`the variable otherPlayer is ${otherPlayer}`);
        //create a new card
        let newCard = this.createCard(card);
        
        //if the player is the dealer
        if (playerType === 'dealer') {
            console.log('Dealer hand updated:', this.dealer.cards);
            console.log('Dealer score:', this.dealer.getScore());
            if(this.dealer.cards.length === 0){
                // Update dealer's card in view
                showDealtCard('dealer', true, card.name);
            }
            //if the dealer has more than one card
            else{
                showDealtCard('dealer', false, card.name);
            }
            //add the card to the dealer's hand
            this.dealer.addCard(newCard);
            //if the dealer has two cards
            if(this.dealer.cards.length === 2) {
                updatePoints("?", 'dealer');
            }
            //if the dealer has more than two cards
            else{
                updatePoints(this.dealer.getScore(), 'dealer');
            }
        } 
        else {
            // Determine which player object to update based on playerType
            if(playerType === thisPlayer){
                this.player.userhand.addCard(newCard);
                showDealtCard(playerType, false, card.name);
                updatePoints(this.player.userhand.getScore(), thisPlayer);
            }
            //if the player is the other player
            else{
                this.otherPlayer.userhand.addCard(newCard);
                showDealtCard(playerType, false, card.name);
                updatePoints(this.otherPlayer.userhand.getScore(), otherPlayer);
            }

            // Check for bust or twenty-one only for the current player
            if (playerType === thisPlayer) {
                if (this.didPlayerBust()) {
                    console.log('Player busted!');
                    this.player.userhand.setMove('bust');
                    //make the hit button unclickable
                    makeUnclickable(document.getElementById('hit'));
                    makeUnclickable(document.getElementById('stand'));
                } else if (this.didPlayerGetTwentyOne()) {
                    console.log('Player got 21!');
                    this.player.userhand.setMove('twenty-one');
                    makeUnclickable(document.getElementById('hit'));
                }
            }
        }
    },

    //stand the player
    stand: function() {
        console.log('Player stands');
        gamePlay.endRound();
    },

     //set the bet to the amount bet
     setBet: function(amount) {
        // If increasing bet
        if (amount > 0) {
            // Check if player has enough money
            if (amount <= this.player.userWallet.getValue()) {
                this.player.userBet += amount;
                this.player.userWallet.decrementValue(amount);
                updateBet(this.player.userBet);
                updateWallet(this.player.userWallet.getValue());
                // Enable deal button if bet is placed
                if (this.player.userBet > 0) {
                    makeClickable(document.getElementById("deal"));
                }
                gamePlay.checkBettingAmount();
            }
        }
        // If decreasing bet
        else if (amount < 0) {
            // Check if there's bet to decrease
            if (this.player.userBet >= Math.abs(amount)) {
                this.player.userBet += amount; // amount is negative
                this.player.userWallet.addValue(Math.abs(amount));
                updateBet(this.player.userBet);
                updateWallet(this.player.userWallet.getValue());
                gamePlay.checkBettingAmount();
            }
        }
    },
    
    //check if the player busted
    didPlayerBust: function(){
        let busted = false;
        //if the player's score is greater than 21, the player busted
        if(this.player.userhand.getScore() > bustLimit){
            busted = true;
        }
        //return the busted status
        return busted
    },

    //check if the player got 21
    didPlayerGetTwentyOne: function(){
        let has21 = false;
        //if the player's score is 21, the player got 21
        if(this.player.userhand.getScore() === 21){
            has21 = true;
        }
        return has21;

    },

    whoWon: function(){
        //if the player's score is greater than 21, the dealer won
        if(this.player.userhand.getScore() > bustLimit){
            
            return "Dealer";
        }
        //if the dealer's score is greater than 21, the player won
        else if(this.dealer.getScore() > bustLimit){
            
            return "Player";
        }
        //if the player's score is greater than the dealer's score, the player won
        else if(this.player.userhand.getScore() > this.dealer.getScore()){
            return "Player";
        }
        //if the dealer's score is greater than the player's score, the dealer won
        else if(this.player.userhand.getScore() < this.dealer.getScore()){
            return "Dealer";
        }
        //if the scores are equal, it is a tie
        else{
            return "Tie";
        }

    },

    discardCards: function(){
        this.dealer.reset();
        this.player.userhand.reset();
        this.otherPlayer.userhand.reset();
    },


    reset: function(){
        this.player.userWallet.setValue(startingCash);
        this.player.resetBet();
        updateBet(this.player.getBet());
        updateWallet(this.player.userWallet.getValue());
        this.player.userhand.initialize();
        this.dealer.initialize();
        this.otherPlayer.userhand.initialize();

        resetView();
        
        sendPlayerAction('reset');

    }
};

var gameState = {
    players: {},
    
    setPlayerUsername: function(playerType, username) {
        this.players[playerType] = {
            username: username,
            ...this.players[playerType]
        };
        // Notify view of change
        updateView('username', { playerType, username });
    },

    getPlayerUsername: function(playerType) {
        return this.players[playerType]?.username || null;
    },

    initialize: function() {
        this.players = {};
    }
};


