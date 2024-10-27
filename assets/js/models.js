/////////////////////////////////////////////////////////////////////////////////
//Author: Ian Andler Pascual
//Purpose: Sets up the Models of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//models.js
//setup variables for global use
const suits = ["H","S","C","D"];	//allowable suits
const maxCardsPerSuit = 13;		//max cards per suit


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
                    newCard.setRank(aceValue);
                }
                //if the card is a face card, set the rank to 10
                else if(i >= 11){
                    newCard.setRank(10);
                }
                //if the card is not a face card, set the rank to the card value
                else{
                    newCard.setRank(i);
                }
                //set the suit of the card
                newCard.setSuit(suit)
                //set the name of the card
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
        //shuffle the deck
        for(i in this.deck){
            //get a random card from the deck
            const j = Math.floor(Math.random() * (this.cardsleft));
            //swap the card with the current card
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        //update the card counter
        updateCardCounter(this.cardsleft);

    },

    //discard a card to the discard pile
    discardCard: function(card){
        //add the card to the discard pile
        this.discard.push(card);
    },

    //shuffle the discard pile into the deck
    discardShuffle: function(){
        //while there are cards in the discard pile
        while(this.discard.length > 0){
            //get a card from the discard pile
            let card = this.discard.pop();
            //add it to the deck
            this.deck.push(card);
            //increment the card counter
            this.cardsleft += 1;
        }
        //shuffle the deck
        this.shuffle();
    },

    //deal a card from the deck
    dealCard: function(){
        //get the top card from the deck
        let topCard = this.deck.pop();
        //decrement the card counter
        this.cardsleft -= 1;
        //if there are less than 16 cards in the deck, shuffle the discard pile into the deck
        if(this.cardsleft < 16){
            addMessage("Less than 16 cards left. Shuffling discard pile...");
            this.discardShuffle();
        }

        //update the card counter
        updateCardCounter(this.cardsleft);
        //return the top card
        return topCard;
    },


};


//object defining a players hand
var hand = {
    cards: [],
    score: 0,
    aces: 0,

    initialize: function() {
        //set the cards to an empty array with its own space in memory
        this.cards = [];
        //set the score to 0
        this.score = 0;
        //set the aces to 0
        this.aces = 0;
    },

    //add a card to the hand
    addCard: function(card) {
        //add the card to the hand
        this.cards.push(card);
        //if the card is an ace, increment the ace counter
        if(card.getRank() === aceValue){
            this.aces += 1;
        }
        //set the score of the hand
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
            blackjack.carddeck.discardCard(this.cards.pop());
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

    setUserBet: function(amount){
        //add the bet to the user's bet
        this.userBet += amount;
        //decrement the wallet by the amount bet
        this.userWallet.decrementValue(amount)
    },

    initialize: function(){
        //set the wallet to 1000
        this.userWallet.setValue(startingCash);
        //initialize the hand
        this.userhand.initialize();
    },

    //reset the bet
    resetBet: function(){
        //set the bet to 0
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

        //clear the old cards off the screen
        resetView();

        //discard the cards from both hands.
        this.discardHands();

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

        //check if the player busted
        if(this.didPlayerBust()){
            //end the round
           gamePlay.endRound();            
        }
        //check if the player got 21
        else if(this.didPlayerGetTwentyOne()){
            makeUnclickable(document.getElementById("hit"));
        }

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

        //end the round
        gamePlay.endRound();
    

    },

    //set the bet to the amount bet
    setBet: function(amount){
        //sets the bet to the amount bet
        this.player.setUserBet(amount);
        
        //check the betting amount to the wallet and disable the buttons if necessary
        gamePlay.checkBettingAmount();
       

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

    //reset the hands
    discardHands: function(){
        //reset the player's hand
        this.player.userhand.reset();
        //reset the dealer's hand
        this.dealer.reset();


    },

    //determine who won the round
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

    reset: function(){
        // Reset the player's wallet to the starting cash
        this.player.userWallet.setValue(startingCash);
        // Reset the player's bet to 0
        this.player.resetBet();

        //update the bet and wallet
        updateBet(blackjack.player.getBet());
        updateWallet(blackjack.player.userWallet.getValue());

        // Discard the hands to start fresh
        this.discardHands();
        // Reset the deck to its initial state
        this.carddeck.discardShuffle();
        
    },

    
    //use advice from a remote server
    useAdvice: function(advice){
        //hit if advice is hit
        if(advice === "Hit"){
            addMessage("Advice is to hit!");
            this.hit();
        }
        //stand if the advice is stay
        else if(advice === "Stay"){
            addMessage("Advice is to stay!");
            this.stand();
        }
    },


    getRemoteAdvice: function(reqeustType){
        
        //create a new request object for the remote server, using 
        // XMLHttpRequest, fetch, or jQuery as specified in the requestType parameter.
        // Using the data from player and dealer hand.
        const myURL = `https://convers-e.com/blackjackadvice.php?userscore=${this.player.userhand.getScore()}&dealerscore=${this.dealer.cards[1].getRank()}`;

        if(reqeustType === "xhr"){
            console.log("xhr request");
            
            const xhr = new XMLHttpRequest();
            xhr.open("GET", myURL);
            
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200){
                    const myData = JSON.parse(xhr.responseText);
                    console.log(myData);
                    console.log(myData.content.Advice);
                    
                    let advice = String(myData.content.Advice);

                    this.useAdvice(advice);
                    
                }
                else if(xhr.readyState === 4){
                    addMessage("Failed to get remote advice, try again or something else...");
                }
            }
            
            xhr.send(); 
        
        }
        else if(reqeustType === "fetch"){

            const myFetchParams = {
                method: 'POST',
                mode: 'cors',
                referrerPolicy: 'origin',
                cache: 'default'
            };

            console.log("fetch request");

            let myFetchRequestURL = new Request(myURL);

	        fetch(myFetchRequestURL,myFetchParams)
	        .then(response => {
	            return response.json();
	            })
	        .then(data => {   
                let advice = String(data.content.Advice);
                this.useAdvice(advice);
	        })
	        .catch(err => {
	            addMessage("Failed to get remote advice, try again or something else...");
	        });
        }
        else if(reqeustType === "jquery"){
            console.log("jquery request");
            $.getJSON(myURL, data => {
                let advice = String(data.content.Advice);
                this.useAdvice(advice);
            })
            .fail(err => {
                addMessage("Failed to get remote advice, try again or something else...");
            });
        }
        else{
            console.error("Invalid request type");
        }

        

        
        
        
    },


    //check if the request is good
    isRequestGood: function(status){
        if(returnValue === 200){
            return true;
        }
        else{
            return false;
        }
    }




    
};


