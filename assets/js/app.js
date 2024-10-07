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
        //get the content after the ? in the url
        const urlParams = new URLSearchParams(window.location.search);
        //get the username from the url
        const username = urlParams.get('username');
        return username;
    },

    isGameOver: function(){
        
    },

    reset: function(){
        blackjack.discardHands();

    },
    
};

//start a blackjack game
gamePlay.playGame();




