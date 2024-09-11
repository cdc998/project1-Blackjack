/*----- cached elements  -----*/

playerTotalElem = document.querySelector(`.playerCards`)
dealerTotalElem = document.querySelector(`.dealerCards`)
dealBtn = document.querySelector(`.deal-Btn`)
hitBtn = document.querySelector(`.hit-Btn`)
standBtn = document.querySelector(`.stand-Btn`)
doubleBtn = document.querySelector(`.double-Btn`)
newGameBtn = document.querySelector(`.newGame-Btn`)
playBtn = document.querySelector(`.play-Btn`)
playerAceDisplayElem = document.querySelector(`.playerAceDisplay`)
dealerAceDisplayElem = document.querySelector(`.dealerAceDisplay`)
suppTextElem = document.querySelector(`.suppText`)



/*----- constants -----*/

const suits = [`spades`, `clubs`, `hearts`, `diamonds`]



/*----- state variables -----*/

let deck = []
let playerCardsArr = []
let dealerCardsArr = []
let playerBlackjack = false
let dealerBlackjack = false



/*----- event listeners -----*/

dealBtn.addEventListener(`click`, handleDealClick)
hitBtn.addEventListener(`click`, handleHitClick)
standBtn.addEventListener(`click`, handleStandClick)
newGameBtn.addEventListener(`click`, handleNewGameClick)
playBtn.addEventListener(`click`, handlePlayClick)



/*----- functions -----*/

function dealPlayerCard () {
    playerCardsArr.push(deck[randomCardIndex()].cardValue)
    playerTotalElem.textContent = sumOfArray(playerCardsArr)
}


function dealDealerCard () {
    dealerCardsArr.push(deck[randomCardIndex()].cardValue)
    dealerTotalElem.textContent = sumOfArray(dealerCardsArr)
}


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
    dealPlayerCard()
    dealDealerCard()
    dealPlayerCard()

    // check for player blackjack
    if (playerCardsArr.includes(1)) {
        if (sumOfArray(playerCardsArr) === 11) {
            playerTotalElem.textContent = `21 (Blackjack!)`
            playerBlackjack = true
            hitBtn.disabled = true
            standBtn.disabled = true
            handleStandClick()
            return
        }
    }

    // check for ace
    playerCheckAce()
    dealerCheckAce()


    console.log(playerCardsArr)
}


function handleHitClick () {
    // deal player card and check for ace
    dealPlayerCard()
    playerCheckAce()

    // player bust condition
    if (Number(playerTotalElem.textContent) > 21) {
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
    // fix ace display
    if (playerCardsArr.includes(1)) {
        if (Number(playerTotalElem.textContent) + 10 <= 21) {
            playerTotalElem.textContent = Number(playerTotalElem.textContent) + 10
            playerAceDisplayElem.textContent = ``
        }
    }

    // check dealer blackjack
    dealDealerCard()
    if (dealerCardsArr.includes(1)) {
        if (sumOfArray(dealerCardsArr) === 11) {
            dealerTotalElem.textContent = `21 (Blackjack!)`
            dealerAceDisplayElem.textContent = ``
            dealerBlackjack = true
        }
    }
    
    // deal dealer cards until 17 or more
    if (dealerBlackjack === false && playerBlackjack === false) {
        while (Number(dealerTotalElem.textContent) < 18) {
            dealDealerCard()
            let dealerStandNums = [7, 8, 9, 10, 11]
            if (dealerCardsArr.includes(1)) {
                if (dealerStandNums.includes(sumOfArray(dealerCardsArr))) {
                    dealerTotalElem.textContent = Number(dealerTotalElem.textContent) + 10
                    dealerAceDisplayElem.textContent = ``
                    break;
                }
            }
            dealerCheckAce()
        }
    }

    // check blackjacks (avoid tying when blackjack vs 21)
    if (playerBlackjack && dealerBlackjack) {
        suppTextElem.textContent = `Tie!`
        return
    } else if (playerBlackjack) {
        suppTextElem.textContent = `You Win!`
        return
    } else if (dealerBlackjack) {
        suppTextElem.textContent = `You Lose!`
        return
    }

    // check win, tie or loss condition
    if (Number(playerTotalElem.textContent) > Number(dealerTotalElem.textContent) || Number(dealerTotalElem.textContent) > 21) {
        suppTextElem.textContent = `You Win!`
    } else if (Number(playerTotalElem.textContent) === Number(dealerTotalElem.textContent)) {
        suppTextElem.textContent = `Tie!`
    } else {
        suppTextElem.textContent = `You Lose!`
    }
}


function handleNewGameClick () {
    playerBust = false
    playerTotalElem.textContent = ``
    dealerTotalElem.textContent = ``
    playerAceDisplayElem.textContent = ``
    dealerAceDisplayElem.textContent = ``
    suppTextElem.textContent = `Good Luck!`
    playerBlackjack = false
    dealerBlackjack = false
    dealBtn.disabled = false
    hitBtn.disabled = false
    standBtn.disabled = false
    deck = []
    playerCardsArr = []
    dealerCardsArr = []
}


function handlePlayClick () {
    document.querySelector(`.card1Inner`).classList.add(`puff-out-center`)
    document.querySelector(`.card2Inner`).classList.add(`puff-out-center`)
    document.querySelector(`.card2Inner`).style.animationDelay = `0.3s`
    document.querySelector(`.titleText`).classList.add(`puff-out-center`)
    document.querySelector(`.titleText`).style.animationDelay = `0.6s`
    playBtn.classList.add(`fade-out`)
    playBtn.style.animationDelay = `0.9s`
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


function playerCheckAce () {
       // check for player ace
    if (playerCardsArr.includes(1)) {
        if (Number(playerTotalElem.textContent) + 11 <= 21) {
            playerAceDisplayElem.textContent = ` / ${Number(playerTotalElem.textContent) + 10}`
        } else {
            playerAceDisplayElem.textContent = ``
        }
    }
}


function dealerCheckAce () {
    // check for dealer ace
    if (dealerCardsArr.includes(1)) {
        if (Number(dealerTotalElem.textContent) + 11 <= 21) {
            dealerAceDisplayElem.textContent = ` / ${Number(dealerTotalElem.textContent) + 10}`
        } else {
            dealerAceDisplayElem.textContent = ``
        }
    }
}


function sumOfArray (array) {
    let totalNum = 0;
    for (let num of array) {
        totalNum += num
    }
    return totalNum
}