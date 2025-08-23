//AUTHOR: IAN ANDLER PASCUAL
//PURPOSE: CREATE LISTENERS FOR THE BLACKJACK GAME

const betAmount = 100;

document.addEventListener('DOMContentLoaded', function() {
    // Register button listener
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', handleRegistration);
    }

    // Only add game-related listeners if we're on the gameplay page
    if (window.location.pathname.includes('gameplay.html')) {
        const resetBtn = document.getElementById("reset");
        if (resetBtn) {
            resetBtn.addEventListener("click", handleReset);
        }

        const increaseBetBtn = document.getElementById("increase_bet");
        if (increaseBetBtn) {
            increaseBetBtn.addEventListener("click", handleIncreaseBet);
        }

        const decreaseBetBtn = document.getElementById("decrease_bet");
        if (decreaseBetBtn) {
            decreaseBetBtn.addEventListener("click", handleDecreaseBet);
        }

        const hitBtn = document.getElementById("hit");
        if (hitBtn) {
            hitBtn.addEventListener("click", handleHit);
        }

        const standBtn = document.getElementById("stand");
        if (standBtn) {
            standBtn.addEventListener("click", handleStand);
        }

        const dealBtn = document.getElementById("deal");
        if (dealBtn) {
            dealBtn.addEventListener("click", handleDeal);
        }
    }
});

// Handler functions
function handleRegistration() {
    const username = document.getElementById('username').value;
    if (username) {
        fetch('http://127.0.0.1:3000/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                window.location.href = `gameplay.html?username=${username}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('Error registering username');
        });
    }
}

function handleReset() {
    clearMessages();
    gamePlay.reset();
    addMessage("Reseting the Game...");
}

function handleIncreaseBet() {
    blackjack.setBet(betAmount);
    sendPlayerAction('betUpdate', { amount: blackjack.player.getBet() });
}

function handleDecreaseBet() {
    blackjack.setBet(-betAmount);
    sendPlayerAction('betUpdate', { amount: blackjack.player.getBet() });
}

function handleHit() {
    clearMessages();
    addMessage(`Player hit a card`);
    sendPlayerAction('hit');
}

function handleStand() {
    clearMessages();
    addMessage(`Player stands`);
    sendPlayerAction('stand');
    makeUnclickable(document.getElementById('hit'));
    makeUnclickable(document.getElementById('stand'));
}

function handleDeal() {
    clearMessages();
    gamePlay.bet();
    
    makeUnclickable(document.getElementById("increase_bet"));
    makeUnclickable(document.getElementById("decrease_bet"));
    makeUnclickable(document.getElementById("deal"));
    
    addMessage(`Dealer deals cards`);
    sendPlayerAction("deal");
}









