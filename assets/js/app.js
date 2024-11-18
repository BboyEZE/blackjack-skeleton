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
            this.reportOutcome("loss");
        }
        else if (blackjack.dealer.getScore() > bustLimit){
            //dealer busts
            addMessage("Dealer busts!");
            this.reportOutcome("won");
            this.updateWinnings();

         } //dealer wins
        else if (winner === "Player"){ //player wins
            //update the view to display the winner
            addMessage("Player wins!");
            this.reportOutcome("won");
            this.updateWinnings();
        }

        else if(winner === "Dealer"){ //dealer wins
            //update the view to display the winner
            addMessage("Dealer wins!");
            this.reportOutcome("loss");
            
        }
        else{
            addMessage("Ties go to the house :(")
            this.reportOutcome("draw");
        } //ties go to the house

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

    },

    bet: function(){
        addMessage(`Bet placed: ${blackjack.player.getBet()}`);
        if (blackjack.player.userWallet.getValue() ===0){
            addMessage("ALL IN!!!!!");
        }
        
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
        
    },

    //report the outcome of the game

    reportOutcome: function(outcome) {
        // Construct the URL to send to the server
        // outcome is either "won", "loss", "draw", or "reset"
        // reset is used to reset the game score back to 0-0-0
        let myURL;
        if (outcome === "won" || outcome === "loss" || outcome === "draw") {
            myURL = `http://127.0.0.1:3000/?outcome=${outcome}`;
        } else if (outcome === "reset") {
            myURL = `http://127.0.0.1:3000/?reset=true`;
        }
    
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Initialize the request
        xhr.open("GET", myURL, true);  // "true" ensures it's asynchronous
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200){
                //make the response text a JSON object
                const myData = JSON.parse(xhr.responseText);
                //add the message to the view
                addMessage(`Win/Loss Ratio: wins:${myData.content.win}, loss:${myData.content.loss}, draw:${myData.content.draw}`);
                
            }
            else if(xhr.readyState === 4){
                console.log("Failed to get the win/loss ratio");
            }
        }
    
        // Send the request asynchronously
        xhr.send();
    }

};

//start a blackjack game
gamePlay.playGame();






