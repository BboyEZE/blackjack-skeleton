/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Controls the View of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//view.js
//addMessage(msg) – adds a given text (msg) to the message div.



function addMessage(msg) {
    var messageDiv = document.getElementById("messagediv");
    if (messageDiv !== null)
        messageDiv.innerHTML += msg+"<br>";
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
    if(player === 'player'){
        let playerDiv = document.getElementById('player_hand');
        playerDiv.innerHTML += `<div class="card_deck" id = "${card}"><div>`
    }
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

function updateBet(bet){

}

function resetView(){
    let playerHandDiv = document.getElementById("player_hand")
    let dealerHandDiv = document.getElementById("dealer_hand")

    playerHandDiv.innerHTML = '';
    dealerHandDiv.innerHTML = '';
}


