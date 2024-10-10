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

    endRound: function(){
        makeUnclickable(document.getElementById("hit"));
        makeUnclickable(document.getElementById("stand"));
        //get the winner
        const winner = blackjack.whoWon();

        //reveal the dealer's hand
        revealDealer();

        //update the dealer's points
        updatePoints(blackjack.dealer.getScore(), "dealer")
        
        
        if (winner === "Player"){ //player wins
            //update the view to display the winner
            addMessage("Player wins!");

            //calculate the winnings    
            let winnings = blackjack.player.getBet() * 2;
            //add the winnings to the player's wallet
            blackjack.player.userWallet.addValue(winnings);
            //update the wallet on the view
            updateWallet(blackjack.player.userWallet.getValue());
            

            
        }

        else if(winner === "Dealer"){ //dealer wins
            //update the view to display the winner
            addMessage("Dealer wins!");
            
        }
        else{addMessage("Ties go to the house :(")} //ties go to the house

        //update the bet on the view
        updateBet(blackjack.player.getBet());

        //make the reset button clickable
        makeClickable(document.getElementById("reset"));

        this.isGameOver();


        
    },

    //check if the game is over
    isGameOver: function(){
        //check if the player has lost all their money
        if (blackjack.player.userWallet.getValue() <= 0){
            addMessage("Game over! You lost all your money.");
            makeUnclickable(document.getElementById("reset"));
        }

    },

    reset: function(){
        //reset the hands
        blackjack.discardHands();
        //update the points on the view
        updatePoints("", "player");
        updatePoints("", "dealer");
        //reset the bet
        blackjack.player.resetBet();
        //update the bet on the view
        updateBet(blackjack.player.getBet());

    },


};

//start a blackjack game
gamePlay.playGame();






