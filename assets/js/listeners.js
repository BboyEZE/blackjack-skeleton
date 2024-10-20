//AUTHOR: IAN ANDLER PASCUAL
//PURPOSE: CREATE LISTENERS FOR THE BLACKJACK GAME

//const bet amount for the game
const betAmount = 100;

document.getElementById("reset").addEventListener("click", function() {
    // Reset the Game
    gamePlay.reset();

    
});


document.getElementById("increase_bet").addEventListener("click", function() {
    //increase the bet
    blackjack.setBet(betAmount);
});

document.getElementById("decrease_bet").addEventListener("click", function() {
    //decrease the bet
    blackjack.setBet(-betAmount);
});


document.getElementById("hit").addEventListener("click", function() {
    
    //add message to the message div
    addMessage(`Player hit a card`);
    console.log("Hit button clicked");
    // Deal card to user
    blackjack.hit('player');
    


});

document.getElementById("stand").addEventListener("click", function() {
    addMessage(`Player stands`);
    //stand, then deal cards to the dealer
    blackjack.stand();
    
});

document.getElementById("deal").addEventListener("click", function() {

    addMessage(`Dealer deals cards`);
    gamePlay.bet();
    //deal cards to the player and the dealer
    blackjack.deal();
    //enable the hit and stand buttons 
    makeClickable(document.getElementById("hit"));
    makeClickable(document.getElementById("stand"));
    //disable the bet buttons
    makeUnclickable(document.getElementById("increase_bet"));
    makeUnclickable(document.getElementById("decrease_bet"));
    //disable the deal button
    makeUnclickable(document.getElementById("deal"));
    
});



window.addEventListener('load', function() {
    //get the username
    let username = gamePlay.getUsername();
    //add the username to the username div
    addUsername(username);
    //add a message to the message div
    addMessage(`Welcome to Blackjack!`);
});






