/*----- cached elements  -----*/

playerTotalElem = document.querySelector(`.playerCards`)
dealerTotalElem = document.querySelector(`.dealerCards`)
dealBtn = document.querySelector(`.deal-Btn`)
hitBtn = document.querySelector(`.hit-Btn`)
standBtn = document.querySelector(`.stand-Btn`)
newGameBtn = document.querySelector(`.newGame-Btn`)
suppTextElem = document.querySelector(`.suppText`)

/*----- constants -----*/

const suits = [`spades`, `clubs`, `hearts`, `diamonds`]

/*----- state variables -----*/

let deck = []
let playerBust = false

/*----- event listeners -----*/

dealBtn.addEventListener(`click`, handleDealClick)
hitBtn.addEventListener(`click`, handleHitClick)
standBtn.addEventListener(`click`, handleStandClick)
newGameBtn.addEventListener(`click`, handleNewGameClick)

/*----- functions -----*/

function handleDealClick () {
    // deactivate button until new game
    dealBtn.disabled = true

    // construct deck
    for (let suit of suits) {
        for (cardNum = 1; cardNum <= 13; cardNum++) {
            deck.push({cardNum: cardNum, cardValue: cardNum, cardSuit: suit, dealt: false})
        }
    }
    // JQK becomes value of 10
    for (let card of deck) {
        if (card.cardValue > 10) {
            card.cardValue = 10
        }
    }
    // deal player and dealer cards
    playerTotalElem.textContent = deck[randomCardIndex()].cardValue
    dealerTotalElem.textContent = deck[randomCardIndex()].cardValue
    playerTotalElem.textContent = Number(playerTotalElem.textContent) + deck[randomCardIndex()].cardValue
}


function handleHitClick () {
    playerTotalElem.textContent = Number(playerTotalElem.textContent) + deck[randomCardIndex()].cardValue

    // player bust condition
    if (Number(playerTotalElem.textContent) > 21) {
        playerBust = true
        hitBtn.disabled = true
        standBtn.disabled = true
        suppTextElem.textContent = `You busted!`
    }

    // player 21 condition
    if (Number(playerTotalElem.textContent) === 21) {
        hitBtn.disabled = true
        standBtn.disabled = true
        handleStandClick();
    }
}


function handleStandClick () {
    while (Number(dealerTotalElem.textContent) < 18) {
        dealerTotalElem.textContent = Number(dealerTotalElem.textContent) + deck[randomCardIndex()].cardValue
        console.log(dealerTotalElem.textContent)
    }
}


function handleNewGameClick () {
    playerBust = false
    playerTotalElem.textContent = ``
    dealerTotalElem.textContent = ``
    dealBtn.disabled = false
    hitBtn.disabled = false
    standBtn.disabled = false
    deck = []
}


function randomCardIndex () {
    randomIndex = Math.floor(Math.random() * 52)

    // check if dealt
    while (deck[randomIndex].dealt === true) {
        randomIndex = Math.floor(Math.random() * 52)
    }

    // renders card to dealt
    deck[randomIndex].dealt = true

    return randomIndex
}
