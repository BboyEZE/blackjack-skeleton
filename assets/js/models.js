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
    cardsleft: 0,
    standardDeckSize: 52,
    discard: [],


    //creates 52 cards (four suits: Hearts, Clubs, Spades, Diamonds, 13 each (Ace, 2-10, Jack, Queen, King))
    initialize: function () {
        //takes every possible suit and card value
        for(let suit of suits){
            for(i = 1; i <= maxCardsPerSuit; i++){

                //create a new card and give it the suit and card values
                let newCard = Object.create(card);
                newCard.setRank(i);
                newCard.setSuit(suit)
                
                //put it into the deck
                this.deck.push(newCard)
                console.log(newCard);
            }
            
        }
        //test to see if the deck is created correctly
        console.log(this.deck);
        
      },
    //randomly shuffle the deck
    shuffle: function(){
        for(i in this.deck){
            const j = Math.floor(Math.random() * (this.standardDeckSize - 1 + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        console.log(this.deck);

    },

    discardShuffle: function(){
        for(let card in this.discard){
            this.discard.pop();
            this.deck.push(card);
        }
        this.shuffle();
    },

    getTopCard: function(){
        let topCard = deck.pop();
        return topCard;
    },


};

//object defining a players hand
var hand = {
    cards: [],

    start: function(){

    },

    hit: function(){

        this.cards.push(card);
    }

};

//accounting model object for a player
var wallet = {
    value: 0,
};

//model for defining a user in the game
var user = {
    userhand: Object.create(hand),

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
        
    },

    
};




