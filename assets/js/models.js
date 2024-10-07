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
    name: '',
//sets rank of card
    setRank: function (value) { this.rank = value; },
    //gets rank of card
    getRank: function () { return this.rank; },

    setSuit: function (value) { this.suit = value},

    getSuit: function () {return this.suit},

    setName: function(value){
        this.name = value;
    },

    getName: function(){
        return this.name;
    }



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
            const j = Math.floor(Math.random() * (this.standardDeckSize - 1 + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }


    },

    discardCard: function(card){
        this.discard.push(card);
    
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
            this.discardshuffle();
        }
        return topCard;
    },


};


//object defining a players hand
var hand = {
    cards: null, //does not take any values in order to create seperate lists in memory
    score: 0,
    initialize: function() {
        this.cards = [];
    },
    addCard: function(card) {
        this.cards.push(card);
        this.score += card.getRank();
        
    },

    setScore: function(value){
        this.score += value;
    },

    getScore: function(){
        return this.score;
    },

    reset: function(){
        let discarding = [];
        console.log(discarding);
        while (this.cards.length > 0){
            blackjack.carddeck.discardCard(this.cards.pop());
            
        }

        this.score = 0;
        
    },


    
    

};

//accounting model object for a player
var wallet = {
    value: 0,

    setValue: function(amount){
        this.value = amount;
    },

    getValue: function(){
        return this.value;
    },

    addValue: function(amount){
        this.value += amount;
        
    },

    decrementValue: function(amount){
        this.value -= amount;
    },



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
        this.userWallet.value = 1000;
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
    },

    //hit using dealer, then player, then dealer, and then player again.
    deal: function(){
        this.player.userhand.reset();
        this.dealer.reset();
        

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
                
                updatePoints(this.player.userhand.getScore(), "player")

                let bust = this.didPlayerBust();
                if(bust){
                    showDealtCard('player', false, cardName)
                    removeClass(document.getElementById("hit"), "canHit");
                    addClass(document.getElementById("hit"), "canNotHit");
                    
                }
                else{
                    showDealtCard('player', false, cardName)
                }

        }
        else{
            let dealerscards = this.dealer.cards.length;
            if(dealerscards === 0){
                this.dealer.addCard(card);
                showDealtCard('dealer', true, cardName)
                updatePoints(this.dealer.getScore(), "dealer")
            }
            else{
                this.dealer.addCard(card);
                showDealtCard('dealer', false, cardName)
            }
            
        
        }
        

    },

    setBet: function(amount){
        this.player.setUserBet(amount);
    },
    

    didPlayerBust: function(){
        if(this.player.userhand.getScore() > 21){
            return true;
        }
        else{
            return false;
        }
    },

    didPlayerGetTwentyOne: function(){
        let has21 = false;
        if(this.player.getScore === 21){
            has21 = true;
        }
        return has21;

    },

    discardHands: function(){

        this.player.userhand.reset();
        this.dealer.reset();

        updatePoints("", "player");
        updatePoints("", "dealer");

        console.log("Cards discarded:", this.carddeck.discard);
    }

    
};


window.blackjack = blackjack; 

console.log("Blackjack object created and attached to window:", window.blackjack);

