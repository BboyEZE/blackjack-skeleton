//AUTHOR: IAN ANDLER PASCUAL
//PURPOSE: CREATE LISTENERS FOR THE BLACKJACK GAME

const betAmount = 100;

document.getElementById("reset").addEventListener("click", function() {
    // Reset the Game
    gamePlay.reset();
    // Reset the view

    
});


document.getElementById("increase_bet").addEventListener("click", function() {
    
    //increase the bet
    gamePlay.bet(betAmount);
});

document.getElementById("decrease_bet").addEventListener("click", function() {
    //decrease the bet
    gamePlay.bet(-betAmount);
});

document.getElementById("bet").addEventListener("click", function() {
    //place the bet
    gamePlay.bet(betAmount);

    addMessage(`Bet placed: ${blackjack.player.getBet()}`);
    if (blackjack.player.userWallet.getValue() ===0){
        addMessage("ALL IN!!!!!");
    }
    //disable the bet buttons
    makeUnclickable(document.getElementById("bet"));
    makeUnclickable(document.getElementById("increase_bet"));
    makeUnclickable(document.getElementById("decrease_bet"));
    //enable the stand and hit buttons
    makeClickable(document.getElementById("deal"));
});

document.getElementById("hit").addEventListener("click", function() {
    // Deal card to user
    console.log("Hit button clicked");
    blackjack.hit('player');
    addMessage(`Player hit a card`);

    gamePlay.hit();

});

document.getElementById("stand").addEventListener("click", function() {
    addMessage(`Player stands`);
    //stand, then deal cards to the dealer
    gamePlay.stand();
    //check if the game is over
    
});

document.getElementById("deal").addEventListener("click", function() {
    addMessage(`Dealer deals cards`);
    //deal cards to the player and the dealer
    gamePlay.deal();
    
});


window.addEventListener('load', function() {
    let username = gamePlay.getUsername();
    addUsername(username);
    addMessage(`Welcome to Blackjack!`);
});






