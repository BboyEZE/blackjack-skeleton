/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Create a blackjack game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js

var gamePlay = {
    Blackjack: Object.create(blackjack),

    playGame: function(){
        blackjack.initialize();
    },

    getUsername: function(){

    },

    isGameOver: function(){

    },

    reset: function(){
        blackjack.discardHands();s

    },
    
};

//start a blackjack game
gamePlay.playGame();




