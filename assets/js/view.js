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

// Function to update player name in the UI
function updatePlayerName(type, name) {
    console.log(`Attempting to update ${type} name to ${name}`); // Debug log
    const usernameElement = document.getElementById(`${type}-username`);
    if (usernameElement) {
        usernameElement.innerText = `${name}'s Hand`;
        console.log(`Successfully updated ${type} username element`); // Debug log
    } else {
        console.log(`Could not find element with id: ${type}-username`); // Debug log
    }
}



function showDealtCard(target, facedown, card) {
    let targetDiv;
    
    // Debug logging
    console.log(`Attempting to show card: ${card} for ${target}`);
    
    switch(target) {
        case thisPlayer:
            targetDiv = document.getElementById(`${thisPlayer}_hand`);
            break;
        case otherPlayer:
            targetDiv = document.getElementById(`${otherPlayer}_hand`);
            break;
        case 'dealer':
            targetDiv = document.getElementById('dealer_hand');
            break;
        default:
            console.error('Invalid target for card:', target);
            return;
    }

    if (!targetDiv) {
        console.error(`Target div not found for ${target}`);
        return;
    }

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card_deck';
    cardDiv.id = facedown ? 'facedown' : card;
    targetDiv.appendChild(cardDiv);
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
function resetView() {
    const player1HandDiv = document.getElementById("player1_hand");
    const player2HandDiv = document.getElementById("player2_hand");
    const dealerHandDiv = document.getElementById("dealer_hand");

    if (player1HandDiv) player1HandDiv.innerHTML = '';
    if (player2HandDiv) player2HandDiv.innerHTML = '';
    if (dealerHandDiv) dealerHandDiv.innerHTML = '';

    // Reset points
    const player1Points = document.getElementById("player1_points");
    const player2Points = document.getElementById("player2_points");
    const dealerPoints = document.getElementById("dealer_points");
    
    if (player1Points) player1Points.textContent = "";
    if (player2Points) player2Points.textContent = "";
    if (dealerPoints) dealerPoints.textContent = "";

    clearMessages();
}

//updates the points div with the given points and player
function updatePoints(points, target) {
    const pointsDiv = document.getElementById(`${target}_points`);
    if (pointsDiv) {
        // Show '?' for dealer's points until game is over
        if (target === 'dealer' && document.querySelector('#dealer_hand #facedown')) {
            pointsDiv.textContent = `Dealer: ?`;
        } else {
            pointsDiv.textContent = `${target.charAt(0).toUpperCase() + target.slice(1)}: ${points}`;
        }
    }
}

//switches to the gameplay page
function switchToGameplay(){
    //switch to the gameplay page
    window.location.href = "gameplay.html";
}   

//removes the canNotHit class from an element and adds the canHit class.
function makeUnclickable(element) {
    if (element) {
        removeClass(element, "canHit");
        addClass(element, "canNotHit");
    }
}

//removes the canHit class from an element and adds the canNotHit class.
function makeClickable(element) {
    if (element) {
        removeClass(element, "canNotHit");
        addClass(element, "canHit");
    }
}

    

function revealDealer(){
    //get the dealer's hand
    let dealerHandDiv = document.getElementById("dealer_hand");
    let flippedCard = dealerHandDiv.querySelector('#facedown');
    
    if (flippedCard) {
        //flip the card
        flippedCard.id = blackjack.dealer.cards[0].getName();
        // Update dealer's points when cards are revealed
        updatePoints(blackjack.dealer.getScore(), "dealer");
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


}


function updateCardCounter(count) {
    const counter = document.getElementById('card_counter');
    if (counter) {
        counter.textContent = `Cards left: ${count}`;
    }
}

function updateView(type, data) {
    switch(type) {
        case 'username':
            const { playerType, username } = data;
            const usernameElement = document.getElementById(`${playerType}-username`);
            if (usernameElement) {
                usernameElement.textContent = `${username}'s Hand`;
            }
            break;
    }
}

function clearHands(){
    document.getElementById('player1_hand').innerHTML = '';
    document.getElementById('player2_hand').innerHTML = '';
    document.getElementById('dealer_hand').innerHTML = '';
}

function clearOtherPlayer(){
    document.getElementById(`${otherPlayer}_hand`).innerHTML = '';
    document.getElementById(`${otherPlayer}_points`).innerHTML = '';
}


