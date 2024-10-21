//AUTHOR: IAN ANDLER PASCUAL
//PURPOSE: CREATE LISTENERS FOR THE BLACKJACK GAME

//const bet amount for the game
const betAmount = 100;

document.getElementById("reset").addEventListener("click", function() {
    clearMessages();

    
    // Reset the Game
    gamePlay.reset();
    addMessage("Reseting the Game...");


    
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
    clearMessages();
    
    //add a hit message 
    addMessage(`Player hit a card`);
    // Deal card to user
    blackjack.hit('player');
    


});

document.getElementById("stand").addEventListener("click", function() {
    clearMessages();

    addMessage(`Player stands`);
    //stand, then deal cards to the dealer
    blackjack.stand();
    
});

document.getElementById("deal").addEventListener("click", function() {
    clearMessages();

    gamePlay.bet();

    //deal cards to the player and the dealer
    blackjack.deal();

    //enable the hit and stand buttons 
    makeClickable(document.getElementById("hit"));
    makeClickable(document.getElementById("stand"));

    //enable the AJAX request buttons
    makeClickable(document.getElementById("xhr"));
    makeClickable(document.getElementById("fetch"));
    makeClickable(document.getElementById("jquery"));

    //disable the bet buttons
    makeUnclickable(document.getElementById("increase_bet"));
    makeUnclickable(document.getElementById("decrease_bet"));

    //disable the deal button
    makeUnclickable(document.getElementById("deal"));

    addMessage(`Dealer deals cards`);
    
});

document.getElementById("xhr").addEventListener("click", function() {
    clearMessages();
    blackjack.getRemoteAdvice("xhr");
});

document.getElementById("fetch").addEventListener("click", function() {
    clearMessages();
    blackjack.getRemoteAdvice("fetch");
});

document.getElementById("jquery").addEventListener("click", function() {
    clearMessages();
    blackjack.getRemoteAdvice("jquery");
});



window.addEventListener('load', function() {
    //get the username
    let username = gamePlay.getUsername();
    //add the username to the username div
    addUsername(username);
    //add a message to the message div
    addMessage(`Welcome to Blackjack!`);
});






