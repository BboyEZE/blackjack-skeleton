/////////////////////////////////////////////////////////////////////////////////
//Author: Ian Andler Pascual
//Purpose: Controls the View of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//view.js
//addMessage(msg) – adds a given text (msg) to the message div.



function addMessage(msg) {
    var messageDiv = document.getElementById("messagediv");
    if (messageDiv !== null){
        messageDiv.innerHTML += msg+"<br>";

    }
       
    //scroll the message div to see new messages
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

//clearMessages – Removes all messages from the message div.
function clearMessages() {

    var messageDiv = document.getElementById("messagediv");
    messageDiv.innerHTML = "";
}

//show a div given the div's ID
function showDiv(divID) {
    var userDiv = document.getElementById(divID);
    if (userDiv !== null)
        userDiv.style.display = "block";
}
//hide a div given the div's ID
function hideDiv(divID) {
    var div = document.getElementById(divID);
    if (div !== null)
        div.style.display = "none";
}

//check if a class has a given class
function hasClass(element, className) 
{ return element.classList.contains(className);}

//adds a given class to an element if it does not have the class. Does nothing otherwise.
function addClass(element, className) {
    if (element.classList)	//if element has a class list
        element.classList.add(className);	//add class
    else if (!hasClass(element, className))	//else check if it doesn't have the class
        element.className += " " + className;
}
//removeClass(element, className) – removes a given class from an element if the class has it. Does nothing otherwise.
function removeClass(element, className) {
    if (element.classList)

        element.classList.remove(className);
}

function addUsername(username){
    var usernameDiv = document.getElementById("username")
    if (usernameDiv){
        usernameDiv.innerText = username;
    }
}

function showDealtCard(player, facedown, card){
    //if the player is the player, add the card to the player's hand
    if(player === 'player'){
        let playerDiv = document.getElementById('player_hand');
        playerDiv.innerHTML += `<div class="card_deck" id = "${card}"><div>`
    }
    //if the player is the dealer, add the card to the dealer's hand
    else{
        let playerDiv = document.getElementById('dealer_hand');

        if(facedown){
            playerDiv.innerHTML += `<div class="card_deck" id = "facedown"><div>`
        }
        else{
            playerDiv.innerHTML += `<div class="card_deck" id = "${card}"><div>`
        }
    }
}

//updates the bet div with the given bet
function updateBet(bet){
    let betDiv = document.getElementById("betAmount")
    betDiv.innerText = "Bet: " + bet;

}

//updates the wallet div with the given wallet
function updateWallet(wallet){
    let walletDiv = document.getElementById("wallet")
    walletDiv.innerText = "Wallet: " + wallet;
}

//resets the view to the initial state
function resetView(){

    //reset the player's hand
    let playerHandDiv = document.getElementById("player_hand")
    let dealerHandDiv = document.getElementById("dealer_hand")

    //reset the hands
    playerHandDiv.innerHTML = '';
    dealerHandDiv.innerHTML = '';

    //reset the points
    updatePoints("", "player");
    updatePoints("", "dealer");

    //reset the messages
    clearMessages();

    //reset the buttons
    resetButtons();
}

//updates the points div with the given points and player
function updatePoints(points, player){
    //if the player is the player, update the player's points
    if(player === "player"){
        //update the player's points
        let pointsDiv = document.getElementById("player_points")
        pointsDiv.innerText = "Player: " + points;
    }
    //if the player is the dealer, update the dealer's points
    else{
        let pointsDiv = document.getElementById("dealer_points")
        pointsDiv.innerText = "Dealer: " + points;
    }
}

//switches to the gameplay page
function switchToGameplay(){
    //switch to the gameplay page
    window.location.href = "gameplay.html";
}   

//removes the canNotHit class from an element and adds the canHit class.
function makeUnclickable(element){
    //if the element has the canHit class, remove it and add the canNotHit class
    if (hasClass(element, "canHit")){
        //remove the canHit class and add the canNotHit class
        addClass(element, "canNotHit");
        removeClass(element, "canHit");
    }
}

//removes the canHit class from an element and adds the canNotHit class.
function makeClickable(element){
    if (hasClass(element, "canNotHit")){
        //if the element has the canNotHit class, remove it and add the canHit class
        addClass(element, "canHit");
        removeClass(element, "canNotHit");
    }
}

    

function revealDealer(){
    //get the dealer's hand
    let dealerHandDiv = document.getElementById("dealer_hand");
    let flippedCard = dealerHandDiv.querySelector('#facedown');
    
    if (flippedCard) {
        //flip the card
        flippedCard.id = blackjack.dealer.cards[0].getName();
    }
    
}

function initializeButtons(){
    //make the deal button unclickable
    addClass(document.getElementById("deal"), "canNotHit");
    //make the hit button unclickable
    addClass(document.getElementById("hit"), "canNotHit");
    //make the stand button unclickable
    addClass(document.getElementById("stand"), "canNotHit");
    //make the increase bet button clickable
    addClass(document.getElementById("increase_bet"), "canHit");
    //make the bet button unclickable
    addClass(document.getElementById("decrease_bet"), "canNotHit");

    //make the AJAX request buttons unclickable
    addClass(document.getElementById("xhr"), "canNotHit");
    addClass(document.getElementById("fetch"), "canNotHit");
    addClass(document.getElementById("jquery"), "canNotHit");
}

function resetButtons(){
    //make the deal button unclickable
    makeUnclickable(document.getElementById("deal"));
    //make the hit button unclickable
    makeUnclickable(document.getElementById("hit"));
    //make the stand button unclickable
    makeUnclickable(document.getElementById("stand"));
    //make the increase bet button clickable
    makeClickable(document.getElementById("increase_bet"));
    //make the decrease bet button unclickable
    makeUnclickable(document.getElementById("decrease_bet"));

    //make the AJAX request buttons unclickable
    makeUnclickable(document.getElementById("xhr"));
    makeUnclickable(document.getElementById("fetch"));
    makeUnclickable(document.getElementById("jquery"));
}


function updateCardCounter(cardCount){
    //update the card counter
    let cardCounter = document.getElementById("card_counter")
    cardCounter.innerText = "Cards left: " + cardCount;
}

