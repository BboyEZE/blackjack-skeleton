/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Create a blackjack game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js
var gamePlay = {
    Blackjack: Object.create(blackjack),

    playGame: function(){
        blackjack.initialize();
    }
};

//start a blackjack game
gamePlay.playGame();



