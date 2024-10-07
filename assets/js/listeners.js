//AUTHOR: IAN ANDLER PASCUAL
//PURPOSE: CREATE LISTENERS FOR THE BLACKJACK GAME


document.getElementById("reset").addEventListener("click", function() {
    // Reset the game
    //app.gameplay.reset();

    // Reset the view
    resetView();
    blackjack.discardHands();
});


document.getElementById("increase_bet").addEventListener("click", function() {
    //increase the bet
    const bet = 100;
    blackjack.setBet(bet);
});

document.getElementById("decrease_bet").addEventListener("click", function() {
    //decrease the bet
});
document.getElementById("hit").addEventListener("click", function() {
    // Deal card to user
    console.log("Hit button clicked");
    blackjack.hit('player');

});

document.getElementById("stand").addEventListener("click", function() {
    //stand, then deal cards to the dealer
});

document.getElementById("deal").addEventListener("click", function() {
    //deal cards to the player and the dealer
    resetView();
    
    blackjack.deal();
});


window.addEventListener('load', function() {
    let username = gamePlay.getUsername();
    addUsername(username);
});






