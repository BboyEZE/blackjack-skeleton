/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Sets up the Models of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//models.js
//setup variables for global use
const suits = ["H","S","C","D"];	//allowable suits
const maxCardsPerSuit = 13;		//max cards per suit

//card object defining setters and getters
var card = {
    rank:0,
    suit:'',
//sets rank of card
    setRank: function (value) { this.rank = value; },
    //gets rank of card
    getRank: function () { return this.rank; },

    setSuit: function (value) { this.suit = value},

    getSuit: function () {return this.suit},



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
                newCard.setRank(i);
                newCard.setSuit(suit)
                
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
            const j = Math.floor(Math.random() * (this.standardDeckSize - 1 + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }


    },

    discardCards: function(cards){
        for(let card of cards){
            this.discard.push(card);
        }
    },

    discardShuffle: function(){
        for(let card in this.discard){
            this.discard.pop();
            this.deck.push(card);
            cardsleft += 1;
        }
        this.shuffle();
    },

    dealCard: function(){
        let topCard = this.deck.pop();
        this.cardsleft -= 1;
        if(this.cardsleft < 16){
            this.discard.shuffle();
        }
        return topCard;
    },


};


//object defining a players hand
var hand = {
    cards: null,
    score: 0,
    initialize: function() {
        this.cards = [];
        this.score = 0;
    },
    addCard: function(card) {
        this.cards.push(card);
        this.score += card.getRank();
        
    },

    setScore: function(rank){

        let faceScore = 11;
        let winningNumber = 21


        if(11 <= rank <= 13){
            this.score += faceScore
        }
        else if(rank === 1){
            if(score + faceScore > winningNumber){
                this.score += 1
            }
            else{
                this.score += faceScore
            }
            
        }
        else{
            this.score += rank;
        }
    },

    getScore: function(){
        return this.score;
    },

    discardAll: function(){
        let discarding = [];
        console.log(discarding);
        while (this.cards.length > 0){
            discarding.push(this.cards.pop());
            
        }
        return discarding;
    },


    
    

};

//accounting model object for a player
var wallet = {
    value: 0,

};

//model for defining a user in the game
var user = {
    userhand: Object.create(hand),
    userBet: 0,
    userWallet: Object.create(wallet),

    setUserBet: function(amount){
        this.userBet += amount;
    },

    initialize: function(){
        this.userhand.initialize();
        this.userWallet.value = 1000;
    },

    getUserBet: function(){
        return this.userBet;
    },

    setUserWallet: function(amount){
        this.userWallet.value += amount;
    },

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
        this.dealer.initialize();
        this.player.userhand.initialize();
        this.deal();

    },

    //hit using dealer, then player, then dealer, and then player again.
    deal: function(){
        this.hit('dealer');
        this.hit('player');
        this.hit('dealer');
        this.hit('player');
        
    },

    hit: function(who){

        let card = this.carddeck.dealCard();

        let cardName = card.getSuit() + card.getRank();

        if(who === 'player'){
                this.player.userhand.addCard(card);
                showDealtCard('player', false, cardName)

        }
        else{
            let dealerscards = this.dealer.cards.length;
            if(dealerscards === 0){
                this.dealer.addCard(card);
                showDealtCard('dealer', true, cardName)
            }
            else{
                this.dealer.addCard(card);
                showDealtCard('dealer', false, cardName)
            }
            
        
        }
        

    },

    setBet: function(amount){

    },
    

    didPlayerBust: function(){
    },

    didPlayerGetTwentyOne: function(){
        let has21 = false;
        if(this.player.getScore === 21){
            has21 = true;
        }
        return has21;

    },

    discardHands: function(){

        let playerCards = this.player.userhand.discardAll();
        let dealerCards = this.dealer.discardAll();
        console.log("player cards to be discarded:");
        console.log(playerCards);
        console.log("dealer cards to be discarded:");
        console.log(dealerCards);

        this.carddeck.discardCards(playerCards.concat(dealerCards));

        console.log("Cards discarded:", this.carddeck.discard);
        this.deal();
    }

    
};



window.blackjack = blackjack; 
console.log("Blackjack object created and attached to window:", window.blackjack);

