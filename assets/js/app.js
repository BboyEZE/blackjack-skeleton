/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Create a blackjack game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js



//const bet amount for the game
var gamePlay = {
    Blackjack: Object.create(blackjack),
    username: '',
    gamesPlayed: 0,
    gameOver : false,


    initialize: function() {
        const username = this.getUsername();
        if (username) {
            blackjack.initialize();
        } else {
            window.location.href = 'index.html';
        }
    },

    getUsername: function() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('username');
    },

    bet: function(){
        addMessage(`Bet placed: ${blackjack.player.getBet()}`);
        if (blackjack.player.userWallet.getValue() === 0){
            addMessage("ALL IN!!!!!");
        }
    },

    checkBettingAmount: function() {
        const currentBet = blackjack.player.getBet();
        const currentWallet = blackjack.player.userWallet.getValue();
        const dealButton = document.getElementById('deal');
        const increaseBetButton = document.getElementById('increase_bet');
        const decreaseBetButton = document.getElementById('decrease_bet');

        if (currentWallet > 0) {
            makeClickable(increaseBetButton);
        } else {
            makeUnclickable(increaseBetButton);
        }

        if (currentBet > 0) {
            makeClickable(decreaseBetButton);
            makeClickable(dealButton);
        } else {
            makeUnclickable(decreaseBetButton);
            makeUnclickable(dealButton);
        }
    },


    endRound: function(){

        //bust limit
        let bustLimit = 21

        updatePoints(blackjack.dealer.getScore(), "dealer");
        
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
        else{
            addMessage("Ties go to the house :(")
        } //ties go to the house

        //reset the bet
        blackjack.player.resetBet();

        blackjack.discardCards();

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
    isGameOver: function() {
        // Check if the player has lost all their money
        if (blackjack.player.userWallet.getValue() <= 0) {
            addMessage("Game over! You lost all your money.");
            this.gamesPlayed = 0;
            this.gameOver = true;
            // Disable all betting buttons when out of money
            makeUnclickable(document.getElementById('increase_bet'));
            makeUnclickable(document.getElementById('decrease_bet'));
            makeUnclickable(document.getElementById('deal'));
        } else {
            // Reset buttons for next round, but keep increase_bet clickable if player has money
            resetButtons();
            blackjack.discardCards();
            this.gamesPlayed++;
        }

        
        // Call sendNewScore as a method of gamePlay
        this.sendNewScore();
    },

    sendNewScore: function() {
        const username = this.getUsername();
        if (!username) {
            console.error('No username found');
            return;
        }

        // Convert gameOver to 'gameover' string for consistency
        const status = this.gameOver ? 'gameover' : 'playing';
        
        console.log('Sending score update:', {
            username,
            score: this.gamesPlayed,
            status,
            wallet: blackjack.player.userWallet.getValue()
        });

        fetch(`http://127.0.0.1:3000/player1?username=${username}&score=${this.gamesPlayed}&status=${status}&wallet=${blackjack.player.userWallet.getValue()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // Use proper query parameters
            params: new URLSearchParams({
                username: username,
                score: this.gamesPlayed,
                status: status,
                wallet: blackjack.player.userWallet.getValue()
            }).toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Score update response:", response);
        })
        .then(data => {
            console.log('Score update response:', data);
        })
        .catch(error => {
            console.error('Error sending score:', error);
        });
    },


    determineWinner: function() {
        const playerScore = blackjack.player.userhand.getScore();
        const dealerScore = blackjack.dealer.getScore();
        const currentBet = blackjack.player.getBet();
        
        if (playerScore > 21) {
            this.handleLoss('Player busted! Dealer wins!');
        } 
        else if (dealerData.busted) {
            this.handleWin('Dealer busted! Player wins!', currentBet * 2);
        } 
        else if (dealerScore > playerScore) {
            this.handleLoss(`Dealer wins with ${dealerScore}!`);
        } 
        else if (playerScore > dealerScore) {
            this.handleWin(`Player wins with ${playerScore}!`, currentBet * 2);
        } 
        else {
            this.handleTie('Tie goes to the house :(');
        }
    },


    reset: function(){
        this.gameOver = true;
        blackjack.reset();
        this.sendNewScore();
        resetView();
        resetButtons();
        this.gamesPlayed = 0;
        this.gameOver = false;

    }
};

// Start the game only after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    gamePlay.initialize();
});






