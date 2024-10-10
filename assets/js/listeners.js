//AUTHOR: IAN ANDLER PASCUAL
//PURPOSE: CREATE LISTENERS FOR THE BLACKJACK GAME


document.getElementById("reset").addEventListener("click", function() {
    // Reset the Game
    gamePlay.reset();
    // Reset the view
    resetView();
    resetButtons();
    clearMessages();
    addMessage("New Game");

    
});


document.getElementById("increase_bet").addEventListener("click", function() {
    
    //increase the bet
    const bet = 100;
    blackjack.setBet(bet);
});

document.getElementById("decrease_bet").addEventListener("click", function() {
    //decrease the bet
    const bet = -100;
    blackjack.setBet(bet);
});

document.getElementById("bet").addEventListener("click", function() {
    //place the bet
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

});

document.getElementById("stand").addEventListener("click", function() {
    addMessage(`Player stands`);
    //stand, then deal cards to the dealer
    blackjack.stand();
    //check if the game is over
    gamePlay.endRound();
    
});

document.getElementById("deal").addEventListener("click", function() {
    addMessage(`Dealer deals cards`);
    //deal cards to the player and the dealer
    blackjack.deal();
    
});


window.addEventListener('load', function() {
    let username = gamePlay.getUsername();
    addUsername(username);
    addMessage(`Welcome to Blackjack!`);
});






