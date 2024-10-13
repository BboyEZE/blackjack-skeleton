/////////////////////////////////////////////////////////////////////////////////
//Author: Ian Andler Pascual
//Purpose: Sets up the Models of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//models.js
//setup variables for global use
const suits = ["H","S","C","D"];	//allowable suits
const maxCardsPerSuit = 13;		//max cards per suit
const bustLimit = 21;

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

//object to define a card deck
var card_deck = {
    deck: [],
    discard: [],
    cardsleft: 0,
    standardDeckSize: 52,


    //creates 52 cards (four suits: Hearts, Clubs, Spades, Diamonds, 13 each (Ace, 2-10, Jack, Queen, King))
    initialize: function () {

        this.cardsleft = this.standardDeckSize;
        //takes every possible suit and card value
        for(let suit of suits){
            for(i = 1; i <= maxCardsPerSuit; i++){

                //create a new card and give it the suit and card values
                let newCard = Object.create(card);
                if(i === 1){
                    newCard.setRank(11);
                }
                else if(i >= 11){
                    newCard.setRank(10);
                }
                else{
                    newCard.setRank(i);
                }
                newCard.setSuit(suit)

                newCard.setName(suit + i);
                
                //put it into the deck
                this.deck.push(newCard)
            }
            
        }
        cardsleft = this.standardDeckSize;
        //test to see if the deck is created correctly
        console.log(this.deck);
        
      },
    //randomly shuffle the deck
    shuffle: function(){
        for(i in this.deck){
            const j = Math.floor(Math.random() * (this.cardsleft));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        updateCardCounter(this.cardsleft);

    },

    discardCard: function(card){
        this.discard.push(card);
    },

    discardShuffle: function(){
        while(this.discard.length > 0){
            let card = this.discard.pop();
            this.deck.push(card);
            this.cardsleft += 1;
        }
        this.shuffle();
    },

    dealCard: function(){
        let topCard = this.deck.pop();
        this.cardsleft -= 1;
        if(this.cardsleft < 16){
            this.discardShuffle();
        }

        updateCardCounter(this.cardsleft);
        return topCard;
    },


};


//object defining a players hand
var hand = {
    cards: [],
    score: 0,
    aces: 0,

    initialize: function() {
        this.cards = [];
        this.score = 0;
        this.aces = 0;
    },

    addCard: function(card) {
        this.cards.push(card);
        if(card.getRank() === 11){
            this.aces += 1;
        }
        this.setScore(card.getRank());
    },

    setScore: function(value){
        this.score += value;
        if(this.score > bustLimit){
            while(this.score > bustLimit && this.aces > 0){
                this.score -= 10;
                this.aces -= 1;
            }
        }
        console.log(this.score);
    },

    getScore: function(){
        return this.score;
    },

    reset: function(){
        while (this.cards.length > 0){
            blackjack.carddeck.discardCard(this.cards.pop());
        }
        this.score = 0;
        this.aces = 0;
    },


    
    

};

//accounting model object for a player
var wallet = {
    value: 0,

    setValue: function(amount){this.value = amount;},

    getValue: function(){return this.value;},

    addValue: function(amount){this.value += amount;},

    decrementValue: function(amount){this.value -= amount;},



};

//model for defining a user in the game
var user = {
    userhand: Object.create(hand),
    userBet: 0,
    userWallet: Object.create(wallet),

    setUserBet: function(amount){
        this.userBet += amount;
        this.userWallet.decrementValue(amount)
    },

    initialize: function(){
        this.userWallet.setValue(1000);
        this.userhand.initialize();
        console.log(this.userWallet.getValue());
    },

    resetBet: function(){
        const startingPoint = 0;
        this.userBet = startingPoint;
    },

    getBet: function(){
        return this.userBet; // Add a getter for the bet
    }
};

//blackjack game model
var blackjack = {
    carddeck: Object.create(card_deck),
    dealer: Object.create(hand),
    player: Object.create(user),
    //Initializes a blackjack game (creates a deck, shuffles the deck, gets the users's chips ready)
    initialize: function () {
        this.carddeck.initialize();
        this.carddeck.shuffle();
        this.player.initialize();
        this.dealer.initialize(); 

        //adds the bet to the bet section
        updateBet(this.player.getBet());
        //initializes the buttons
        initializeButtons();
        //updates the wallet on the game screen
        updateWallet(this.player.userWallet.getValue());
        
    },

    //hit using dealer, then player, then dealer, and then player again.
    deal: function(){

        //disable the deal button
        makeUnclickable(document.getElementById("deal"));
        //enable the increase bet button
        makeClickable(document.getElementById("hit"));
        makeClickable(document.getElementById("stand"));

        //deal 4 cards
        for(let i = 0; i < 4; i++){
            //deal to dealer if even, player if odd
            if(i % 2 === 0){
                this.dealerHit();

            }
            else{
                this.hit();
            }
        }

        //add message to the game screen
        addMessage("Place your bets!");

        let dealerPoint = '?';
        updatePoints(dealerPoint, "dealer");
        
    },

    //deal a card to the player
    hit: function(){
        //take a card from the deck 
        let card = this.carddeck.dealCard();
        //add it to the player's hand
        this.player.userhand.addCard(card);
        //update the points on the game screen
        updatePoints(this.player.userhand.getScore(), "player")
        //show the card on the game screen
        showDealtCard('player', false, card.getName());

        if(this.didPlayerBust()){
           gamePlay.endRound();            
        }
        else if(this.didPlayerGetTwentyOne()){
            makeUnclickable(document.getElementById("hit"));
        }ty

    },

    //deal a card to the dealer
    dealerHit: function(){
        //take a card from the deck 
        let card = this.carddeck.dealCard();
        //add it to the dealer's hand
        this.dealer.addCard(card);
        //show the card on the game screen
        if(this.dealer.cards.length === 1){
            //if it is the first card, show it face down
            showDealtCard('dealer', true, card.getName());
        }
        else{
            //if it is not the first card, show it face up
            showDealtCard('dealer', false, card.getName());
        }

    },

    //dealer stands, player can no longer hit
    stand: function(){

        //dealer limit is 17        
        let dealerLimit = 17;

        //dealer hits until the dealer limit is reached or the dealer busts
        while(this.dealer.getScore() < dealerLimit){ 
            this.dealerHit();
            //show the points on the game screen
        }

        gamePlay.endRound();
    

    },

    //set the bet to the amount bet
    setBet: function(amount){
        //sets the bet to the amount bet
        this.player.setUserBet(amount);
        //updates the bet on the webpage
        updateBet(this.player.getBet());
        //update the wallet on the game screen
        updateWallet(this.player.userWallet.getValue());
        //if the player's wallet is 0, disable the increase bet button
        if(this.player.userWallet.getValue() <= 0){
            //disable the increase bet button
            makeUnclickable(document.getElementById("increase_bet"));
        }
        //if the player's bet is 0, disable the decrease bet button
        else if(this.player.getBet() <= 0){
            //disable the decrease bet button
            makeUnclickable(document.getElementById("decrease_bet"));
        }
        //if the player's bet is not 0, ensure all buttons are clickable
        else{
            //if the player's bet is not 0, enable the decrease bet button
            makeClickable(document.getElementById("decrease_bet"));
            //enable the bet button
            makeClickable(document.getElementById("bet"));
            //enable the increase bet button
            makeClickable(document.getElementById("increase_bet"));
        }


    },
    
    //check if the player busted
    didPlayerBust: function(){
        let busted = false;
        //if the player's score is greater than 21, the player busted
        if(this.player.userhand.getScore() > 21){
            busted = true;
        }
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

    discardHands: function(){

        this.player.userhand.reset();
        this.dealer.reset();


    },

    whoWon: function(){
        if(this.player.userhand.getScore() > 21){
            addMessage("Player Busted!");
            return "Dealer";
        }
        else if(this.dealer.getScore() > 21){
            addMessage("Dealer Busted!");
            return "Player";
        }
        else if(this.player.userhand.getScore() > this.dealer.getScore()){
            return "Player";
        }
        else if(this.player.userhand.getScore() < this.dealer.getScore()){
            return "Dealer";
        }
        else{
            return "Tie";
        }

    },


    

    
};


