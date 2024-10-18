/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Create a blackjack game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js

//const bet amount for the game
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

        //bust limit
        let bustLimit = 21

        //disable the hit and stand buttons
        makeUnclickable(document.getElementById("hit"));
        makeUnclickable(document.getElementById("stand"));
        //get the winner
        const winner = blackjack.whoWon();

        //reveal the dealer's hand
        revealDealer();

        //update the dealer's points
        updatePoints(blackjack.dealer.getScore(), "dealer")
        
        if (blackjack.player.userhand.getScore() > bustLimit){
            //player busts
            addMessage("Player busts!");
        }
        else if (blackjack.dealer.getScore() > bustLimit){
            //dealer busts
            addMessage("Dealer busts!");
            this.updateWinnings();

         } //dealer wins
        else if (winner === "Player"){ //player wins
            //update the view to display the winner
            addMessage("Player wins!");
            this.updateWinnings();
        }

        else if(winner === "Dealer"){ //dealer wins
            //update the view to display the winner
            addMessage("Dealer wins!");
            
        }
        else{addMessage("Ties go to the house :(")} //ties go to the house

        //reset the bet
        blackjack.player.resetBet();

        //update the bet on the view
        updateBet(blackjack.player.getBet());

        this.isGameOver();


        
    },

    //update the player's winnings
    updateWinnings: function(){
        //calculate the winnings    
        let winnings = blackjack.player.getBet() * 2;
        //add the winnings to the player's wallet
        blackjack.player.userWallet.addValue(winnings);
        //update the wallet on the view
        updateWallet(blackjack.player.userWallet.getValue());
    },

    //check if the game is over
    isGameOver: function(){
        //check if the player has lost all their money
        if (blackjack.player.userWallet.getValue() <= 0){
            addMessage("Game over! You lost all your money.");
        }
        else{
            resetButtons();

            
        }

    },

    //reset the game
    reset: function(){

        //reset the game model
        blackjack.reset();
        
        //reset the view to the initial state
        resetView();
        //reset the bet on the view
        resetButtons();
        //clear the messages on the view
        clearMessages();

    },

    bet: function(){
        addMessage(`Bet placed: ${blackjack.player.getBet()}`);
        if (blackjack.player.userWallet.getValue() ===0){
            addMessage("ALL IN!!!!!");
        }
        //disable the bet buttons
        makeUnclickable(document.getElementById("increase_bet"));
        makeUnclickable(document.getElementById("decrease_bet"));
    },

    checkBettingAmount: function(){
        //get the current bet and wallet
        let currentBet = blackjack.player.getBet();
        let currentWallet = blackjack.player.userWallet.getValue();

        if(currentWallet <= 0){
            //disable the increase bet button
            makeUnclickable(document.getElementById("increase_bet"));
        }
        //if the player's bet is 0, disable the decrease bet button
        else if(currentBet <= 0){
            //disable the decrease bet button
            makeUnclickable(document.getElementById("decrease_bet"));
        }
        //if the player's bet is not 0, ensure all buttons are clickable
        else{
            //if the player's bet is not 0, enable the decrease bet button
            makeClickable(document.getElementById("decrease_bet"));
            //enable the bet button
            makeClickable(document.getElementById("deal"));
            //enable the increase bet button
            makeClickable(document.getElementById("increase_bet"));
        }

        //update the bet on the view
        updateBet(currentBet);

        //update the wallet on the view
        updateWallet(currentWallet);
        
    }

};

//start a blackjack game
gamePlay.playGame();






