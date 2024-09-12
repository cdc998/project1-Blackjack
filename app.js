/*----- cached elements  -----*/

playerTotalElem = document.querySelector(`.playerCards`)
dealerTotalElem = document.querySelector(`.dealerCards`)
dealBtn = document.querySelector(`.deal-Btn`)
hitBtn = document.querySelector(`.hit-Btn`)
standBtn = document.querySelector(`.stand-Btn`)
doubleBtn = document.querySelector(`.double-Btn`)
newGameBtn = document.querySelector(`.newGame-Btn`)
playBtn = document.querySelector(`.play-Btn`)
bet1Btn = document.querySelector(`.bet1-Btn`)
bet5Btn = document.querySelector(`.bet5-Btn`)
bet25Btn = document.querySelector(`.bet25-Btn`)
bet100Btn = document.querySelector(`.bet100-Btn`)
bet500Btn = document.querySelector(`.bet500-Btn`)
titleTextElem = document.querySelector(`.titleText`)
chipsTotal = document.querySelector(`.chipsTotal`)
betTotal = document.querySelector(`.betTotal`)
playerCard1 = document.querySelector(`.playerCard1`)
playerCard2 = document.querySelector(`.playerCard2`)
playerCard3 = document.querySelector(`.playerCard3`)
playerCard4 = document.querySelector(`.playerCard4`)
playerCard5 = document.querySelector(`.playerCard5`)
playerCardImgs = document.querySelectorAll(`.playerCardImgs img`)
dealerCard1 = document.querySelector(`.dealerCard1`)
dealerCard2 = document.querySelector(`.dealerCard2`)
dealerCard3 = document.querySelector(`.dealerCard3`)
dealerCard4 = document.querySelector(`.dealerCard4`)
dealerCard5 = document.querySelector(`.dealerCard5`)
dealerCardImgs = document.querySelectorAll(`.dealerCardImgs img`)
betBtnAll = document.querySelectorAll(`.betting-Btns button`)
playBtnAll = document.querySelectorAll(`.playing-Btns button`)
chipsContainer = document.querySelector(`.chipsContainer`)
bettingContainer = document.querySelector(`.bettingContainer`)
chipsSound = document.querySelector(`#chips`)
registerSound = document.querySelector(`#register`)
jazzSound = document.querySelector(`#jazz`)
cardFlipSound = document.querySelector(`#cardFlip`)
cardRiffleSound = document.querySelector(`#cardRiffle`)
lossSound = document.querySelector(`#loss`)


/*----- constants -----*/

const suits = [`spades`, `clubs`, `hearts`, `diamonds`]
 


/*----- state variables -----*/

let deck = []
let playerCardsArr = []
let dealerCardsArr = []
let playerBlackjack = false
let dealerBlackjack = false
let chipsTotalNum = 200
let betTotalNum = 0
let playerCardCounter = 0
let dealerCardCounter = 0
let randomIndexNum = 0
let betBtnActive = true
let betBtnAnimationStyle = true
let dealBtnActive = false
let playingBtnsActive = false
let newGameBtnActive = false
let bankrupt = false



/*----- event listeners -----*/

dealBtn.addEventListener(`click`, handleDealClick)
hitBtn.addEventListener(`click`, handleHitClick)
standBtn.addEventListener(`click`, handleStandClick)
newGameBtn.addEventListener(`click`, handleNewGameClick)
doubleBtn.addEventListener(`click`, handleDoubleClick)
playBtn.addEventListener(`click`, handlePlayClick)
bet1Btn.addEventListener(`click`, handleBet1Click)
bet5Btn.addEventListener(`click`, handleBet5Click)
bet25Btn.addEventListener(`click`, handleBet25Click)
bet100Btn.addEventListener(`click`, handleBet100Click)
bet500Btn.addEventListener(`click`, handleBet500Click)



/*----- functions -----*/

function dealPlayerCard () {
    playerCardsArr.push(deck[randomCardIndex()].cardValue)
    playerTotalElem.textContent = sumOfArray(playerCardsArr)
    playerCheckAce()
    cardFlipSound.play()
    
    if (playerCardCounter === 0) {
        playerCard1.src = `images/cards/${randomIndexNum}.svg`
        playerCard1.classList.add(`card1Flip`)
        playerCard1.style.animationDelay = `0.5s`
    } else if (playerCardCounter === 1) {
        playerCard2.src = `images/cards/${randomIndexNum}.svg`
        playerCard2.classList.add(`card2Flip`)
        playerCard2.style.animationDelay = `1.2s`
    } else if (playerCardCounter === 2) {
        playerCard3.src = `images/cards/${randomIndexNum}.svg`
        playerCard3.classList.add(`card3Flip`)
    } else if (playerCardCounter === 3) {
        playerCard4.src = `images/cards/${randomIndexNum}.svg`
        playerCard4.classList.add(`card4Flip`)
    } else if (playerCardCounter === 4) {
        playerCard5.src = `images/cards/${randomIndexNum}.svg`
        playerCard5.classList.add(`card5Flip`)
    }

    playerCardCounter++
}


function dealDealerCard () {
    dealerCardsArr.push(deck[randomCardIndex()].cardValue)
    dealerTotalElem.textContent = sumOfArray(dealerCardsArr)
    dealerCheckAce()
    cardFlipSound.play()

    if (dealerCardCounter === 0) {
        dealerCard1.src = `images/cards/${randomIndexNum}.svg`
        dealerCard1.classList.add(`dealerCard1Flip`)
        dealerCard1.style.animationDelay = `0.5s`
    } else if (dealerCardCounter === 1) {
        dealerCard2.src = `images/cards/${randomIndexNum}.svg`
        dealerCard2.classList.add(`dealerCard2Flip`)
        dealerCard2.style.animationDelay = `0.5s`
    } else if (dealerCardCounter === 2) {
        dealerCard3.src = `images/cards/${randomIndexNum}.svg`
        dealerCard3.classList.add(`dealerCard3Flip`)
        dealerCard3.style.animationDelay = `1s`
    } else if (dealerCardCounter === 3) {
        dealerCard4.src = `images/cards/${randomIndexNum}.svg`
        dealerCard4.classList.add(`dealerCard4Flip`)
        dealerCard4.style.animationDelay = `1.5s`
    } else if (dealerCardCounter === 4) {
        dealerCard5.src = `images/cards/${randomIndexNum}.svg`
        dealerCard5.classList.add(`dealerCard5Flip`)
        dealerCard5.style.animationDelay = `2s`
    }

    dealerCardCounter++
}


function handleDealClick () {
    // deactivate button until new game
    toggleBetBtns()
    toggleDealBtn()
    togglePlayingBtns()

    // change titleText to goodluck
    titleTextElem.textContent = `Good Luck!`

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
            titleTextElem.textContent = `You Win!`
            playerTotalElem.textContent = `21 (Blackjack!) Paying 2 to 1`
            playerBlackjack = true
            renderPlayerBlackjack()
            handleStandClick()
        }
    }
}


function handleHitClick () {
    // deal player card and check for ace
    dealPlayerCard()

    // player bust condition
    if (Number(playerTotalElem.textContent) > 21) {
        hitBtn.disabled = true
        standBtn.disabled = true
        renderPlayerLose()
        titleTextElem.textContent = `You Lose!`
        playerTotalElem.textContent = `BUST`
        for (let playingBtn of playBtnAll) {
            playingBtn.disabled = true
        }
        toggleNewGameBtn()
        checkBankruptcy()
    }


    // player 21 condition
    if (Number(playerTotalElem.textContent) === 21) {
        handleStandClick();
    } else if (playerCardsArr.includes(1)) {
        if (Number(playerTotalElem.textContent.slice(0, 2)) + 10 === 21) {
            playerTotalElem.textContent = 21
            handleStandClick()
        }
    }
}


function handleStandClick () {
    // disable playing btns
    for (let playingBtn of playBtnAll) {
        playingBtn.disabled = true
    }


    // fix ace display
    if (playerCardsArr.includes(1) && playerBlackjack === false) {
        if (sumOfArray(playerCardsArr) < 10) {
            playerTotalElem.textContent = Number(playerTotalElem.textContent.slice(0, 1)) + 10
        } else if (sumOfArray(playerCardsArr) === 10){
            playerTotalElem.textContent = 20
        } else if (sumOfArray(playerCardsArr) === 11){
            playerTotalElem.textContent = 21
        }
    }


    // shift dealer Cards
    dealerCard1.style.animationDelay = `0s`
    dealerCard1.classList.add(`dealerCard1Shift`)
  

    // check dealer blackjack
    dealDealerCard()
    if (dealerCardsArr.includes(1)) {
        if (sumOfArray(dealerCardsArr) === 11) {
            dealerTotalElem.textContent = `21 (Blackjack)`
            dealerBlackjack = true
        }
    }
    
    
    // deal dealer cards until 17 or more
    if (dealerBlackjack === false) {
        while (sumOfArray(dealerCardsArr) < 17) {
            let dealerStandNums = [7, 8, 9, 10, 11]
            if (dealerCardsArr.includes(1)) {
                if (dealerStandNums.includes(sumOfArray(dealerCardsArr))) {
                    dealerTotalElem.textContent = sumOfArray(dealerCardsArr) + 10
                    break;
                }
            }
            dealDealerCard()
        }
    }


    // check for dealer bust
    if (Number(dealerTotalElem.textContent) > 21) {
        titleTextElem.textContent = `You Win!`
        dealerTotalElem.textContent = `BUST`
        renderPlayerWin()
        toggleNewGameBtn()
        return
    }

    
    // check win, tie or loss condition
    if (dealerBlackjack === false && playerBlackjack === false) {
        if (Number(playerTotalElem.textContent) > Number(dealerTotalElem.textContent)) {
            titleTextElem.textContent = `You Win!`
            renderPlayerWin()
        } else if (Number(playerTotalElem.textContent) === Number(dealerTotalElem.textContent)) {
            titleTextElem.textContent = `Tie!`
            renderPlayerTie()
        } else {
            titleTextElem.textContent = `You Lose!`
            renderPlayerLose()
        }
    }


    // check blackjacks (avoid tying when blackjack vs 21)
    if (playerBlackjack && dealerBlackjack) {
        titleTextElem.textContent = `Tie!`
        renderPlayerTie()
    } else if (dealerBlackjack) {
        titleTextElem.textContent = `You Lose!`
        renderPlayerLose()
    }

    toggleNewGameBtn()
    checkBankruptcy()
}


function handleDoubleClick () {
    if (chipsTotalNum < betTotalNum) {
        renderChipBetBalance()
        return
    }

    playerCardsArr.push(deck[randomCardIndex()].cardValue)
    playerTotalElem.textContent = sumOfArray(playerCardsArr)
    playerCard3.src = `images/cards/${randomIndexNum}.svg`
    playerCard3.classList.add(`doubleCard`)
    chipsTotalNum -= betTotalNum
    betTotalNum = betTotalNum * 2
    
    cardFlipSound.play()
    playerCheckAce()
    renderChipBetBalance()
    handleStandClick()
}


function handleNewGameClick () {
    if (bankrupt) {
        chipsTotal.textContent = 200
        chipsTotalNum = 200
        bankrupt = false
        newGameBtn.textContent = `NEW GAME`
    }

    playerTotalElem.textContent = ``
    dealerTotalElem.textContent = ``
    titleTextElem.textContent = `Place Your Bets`
    playerBlackjack = false
    dealerBlackjack = false
    toggleNewGameBtn()
    togglePlayingBtns()
    toggleBetBtns()
    toggleDealBtn()
    resetCardAnimations()
    cardRiffleSound.play()
    deck = []
    playerCardsArr = []
    dealerCardsArr = []

    chipsTotal.classList.remove(`flashGreenBack`)
    chipsTotal.classList.remove(`flashRedBack`)

    for (let cardImg of playerCardImgs) {
        cardImg.src = ``
    }
    playerCardCounter = 0

    for (let dealercardImg of dealerCardImgs) {
        dealercardImg.src = ``
    }
    dealerCardCounter = 0

    // ensure there is bet before dealing
    dealBtn.disabled = true
}


function handlePlayClick () {
    jazzSound.play()

    // fade out splash screen elements
    playBtn.disabled = true
    document.querySelector(`.card1Inner`).classList.add(`puff-out-center`)
    document.querySelector(`.card2Inner`).classList.add(`puff-out-center`)
    document.querySelector(`.card2Inner`).style.animationDelay = `0.3s`
    document.querySelector(`.introText`).classList.add(`puff-out-center`)
    document.querySelector(`.introText`).style.animationDelay = `0.6s`
    playBtn.classList.add(`fade-out`)
    playBtn.style.animationDelay = `0.9s`

    // fade in betting screen elements
    titleTextElem.classList.add(`tracking-in-expand`)
    titleTextElem.style.animationDelay = `2s`
    bet1Btn.classList.add(`slide-in-blurred-bottom`)
    bet1Btn.style.animationDelay = `3s`
    bet5Btn.classList.add(`slide-in-blurred-bottom`)
    bet5Btn.style.animationDelay = `3.2s`
    bet25Btn.classList.add(`slide-in-blurred-bottom`)
    bet25Btn.style.animationDelay = `3.4s`
    bet100Btn.classList.add(`slide-in-blurred-bottom`)
    bet100Btn.style.animationDelay = `3.6s`
    bet500Btn.classList.add(`slide-in-blurred-bottom`)
    bet500Btn.style.animationDelay = `3.8s`
    chipsContainer.classList.add(`scale-in-center`)
    chipsContainer.style.animationDelay = `4.2s`
    bettingContainer.classList.add(`scale-in-center`)
    bettingContainer.style.animationDelay = `4.2s`

    dealBtn.classList.remove(`displayNone`)
    dealBtn.classList.add(`scale-in-center`)
    dealBtn.style.animationDelay = `4.5s`
}


function handleBet1Click () {
    if (checkChipsBalance(1)){
        chipsTotalNum -= 1
        betTotalNum += 1
        renderChipBetBalance()
    }
}
function handleBet5Click () {
    if (checkChipsBalance(5)){
        chipsTotalNum -= 5
        betTotalNum +=5
        renderChipBetBalance()
    }
}
function handleBet25Click () {
    if (checkChipsBalance(25)){
        chipsTotalNum -= 25
        betTotalNum += 25
        renderChipBetBalance()
    }
}
function handleBet100Click () {
    if (checkChipsBalance(100)){
        chipsTotalNum -= 100
        betTotalNum += 100
        renderChipBetBalance()
    }
}
function handleBet500Click () {
    if (checkChipsBalance(500)){
        chipsTotalNum -= 500
        betTotalNum += 500
        renderChipBetBalance()
    }
}


function randomCardIndex () {
    randomIndex = Math.floor(Math.random() * 52)

    // check if dealt
    while (deck[randomIndex].dealt === true) {
        randomIndex = Math.floor(Math.random() * 52)
    }

    // renders card to dealt
    deck[randomIndex].dealt = true

    // saves randomIndex to outside variable for reference
    randomIndexNum = randomIndex

    return randomIndex
}


function playerCheckAce () {
       // check for player ace
    if (playerCardsArr.includes(1) && playerBlackjack === false) {
        if (sumOfArray(playerCardsArr) + 10 <= 21) {
            playerTotalElem.textContent = playerTotalElem.textContent + ` / ${Number(playerTotalElem.textContent) + 10}`
        } else {
            playerTotalElem.textContent = sumOfArray(playerCardsArr)
        }
    }
}


function dealerCheckAce () {
    // check for dealer ace
    if (dealerCardsArr.includes(1)) {
        if (sumOfArray(dealerCardsArr) + 10 <= 21) {
            dealerTotalElem.textContent = dealerTotalElem.textContent + ` / ${Number(dealerTotalElem.textContent) + 10}`
        } else {
            dealerTotalElem.textContent = sumOfArray(dealerCardsArr)
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


function checkChipsBalance (num) {
    if (num > chipsTotalNum) {
        return false
    } else {
        return true
    }
}


function renderChipBetBalance () {
    chipsTotal.textContent = chipsTotalNum
    betTotal.textContent = betTotalNum
    flashRedBackChips()
    dealBtn.disabled = false
    chipsSound.play();
}


function renderPlayerWin () {
    chipsTotal.textContent = Number(chipsTotal.textContent) + (betTotalNum * 2)
    chipsTotalNum = chipsTotalNum + (betTotalNum * 2)
    betTotalNum = 0
    betTotal.textContent = 0
    flashGreenBackChips()
    registerSound.play()
}


function renderPlayerBlackjack () {
    chipsTotal.textContent = Number(chipsTotal.textContent) + Math.ceil(betTotalNum * 2.5)
    chipsTotalNum = chipsTotalNum + Math.ceil(betTotalNum * 2.5)
    betTotalNum = 0
    betTotal.textContent = 0
    flashGreenBackChips()
}


function renderPlayerTie () {
    chipsTotal.textContent = Number(chipsTotal.textContent) + betTotalNum
    chipsTotalNum += betTotalNum
    betTotalNum = 0
    betTotal.textContent = 0
    flashGreenBackChips()
    registerSound.play()
}


function renderPlayerLose () {
    betTotal.textContent = 0
    betTotalNum = 0
    flashRedBackBet()
    lossSound.play()
}


function toggleBetBtns () {
    if (betBtnAnimationStyle === true)
        for (betBtn of betBtnAll) {
            betBtn.classList.remove(`slide-in-blurred-bottom`)
            betBtn.classList.add(`slide-out-bck-center`)
            betBtn.style.animationDelay = `0.1s`
            betBtnAnimationStyle = false
        } else {
            bet1Btn.classList.remove(`slide-out-bck-center`)
            bet1Btn.classList.add(`slide-in-blurred-bottom`)
            bet1Btn.style.animationDelay = `0.5s`
            bet5Btn.classList.remove(`slide-out-bck-center`)
            bet5Btn.classList.add(`slide-in-blurred-bottom`)
            bet5Btn.style.animationDelay = `0.7s`
            bet25Btn.classList.remove(`slide-out-bck-center`)
            bet25Btn.classList.add(`slide-in-blurred-bottom`)
            bet25Btn.style.animationDelay = `0.9s`
            bet100Btn.classList.remove(`slide-out-bck-center`)
            bet100Btn.classList.add(`slide-in-blurred-bottom`)
            bet100Btn.style.animationDelay = `1.1s`
            bet500Btn.classList.remove(`slide-out-bck-center`)
            bet500Btn.classList.add(`slide-in-blurred-bottom`)
            bet500Btn.style.animationDelay = `1.3s`
            betBtnAnimationStyle = true
        }
        
    if (betBtnActive === true) {
        for (betBtn of betBtnAll) {
            betBtn.disabled = true
        }
        betBtnActive = false
    } else {
        for (betBtn of betBtnAll) {
            betBtn.disabled = false
        }
        betBtnActive = true
    }
}


function toggleDealBtn () {
    if (dealBtnActive === false) {
        dealBtn.classList.remove(`scale-in-center`)
        dealBtn.classList.add(`slide-back-bck-center`)
        dealBtn.style.animationDelay = `0.1s`
        dealBtnActive = true
    } else {
        dealBtn.classList.add(`scale-in-center`)
        dealBtn.style.animationDelay = `2s`
        dealBtnActive = false
    }
}


function togglePlayingBtns () {
    for (let playingBtn of playBtnAll) {
        playingBtn.disabled = false
    }
    
    if (playingBtnsActive === false) {
        hitBtn.classList.add(`slide-in-blurred-bottom`)
        hitBtn.style.animationDelay = `2s`
        standBtn.classList.add(`slide-in-blurred-bottom`)
        standBtn.style.animationDelay = `2.2s`
        doubleBtn.classList.add(`slide-in-blurred-bottom`)
        doubleBtn.style.animationDelay = `2.4s`
        playingBtnsActive = true
    } else {
        hitBtn.classList.remove(`slide-in-blurred-bottom`)
        hitBtn.classList.add(`fade-out`)
        hitBtn.style.animationDelay = ``
        standBtn.classList.remove(`slide-in-blurred-bottom`)
        standBtn.classList.add(`fade-out`)
        standBtn.style.animationDelay = ``
        doubleBtn.classList.remove(`slide-in-blurred-bottom`)
        doubleBtn.classList.add(`fade-out`)
        doubleBtn.style.animationDelay = ``
        playingBtnsActive = false
    }
}


function toggleNewGameBtn () {
    if (newGameBtnActive === false) {
        newGameBtn.classList.remove(`displayNone`)
        newGameBtn.classList.add(`scale-in-center`)
        newGameBtn.style.animationDelay = `1s`
        newGameBtnActive = true
    } else {
        newGameBtn.classList.remove(`scale-in-center`)
        newGameBtn.classList.add(`slide-back-bck-center`)
        newGameBtn.style.animationDelay = `0.1s`
        newGameBtnActive = false
    }
}


function resetCardAnimations () {
    for (playerCardImg of playerCardImgs) {
        playerCardImg.classList.remove(`card1Flip`, `card2Flip`, `card3Flip`, `card4Flip`, `card5Flip`, `doubleCard`)
        playerCardImg.style.animationDelay = ``
    }
    for (dealerCardImg of dealerCardImgs) {
        dealerCardImg.classList.remove(`dealerCard1Flip`, `dealerCard2Flip`, `dealerCard3Flip`, `dealerCard4Flip`, `dealerCard5Flip`, `dealerCard1Shift`)
        dealerCardImg.style.animationDelay = ``
    }
}


function flashRedBackChips () {
    chipsTotal.classList.remove(`flashRedBack`)
    void chipsTotal.offsetWidth
    chipsTotal.classList.add(`flashRedBack`)
}


function flashRedBackBet () {
    betTotal.classList.remove(`flashRedBack`)
    void betTotal.offsetWidth
    betTotal.classList.add(`flashRedBack`)
}


function flashGreenBackChips () {
    chipsTotal.classList.remove(`flashGreenBack`)
    void chipsTotal.offsetWidth
    chipsTotal.classList.add(`flashGreenBack`)
}


function checkBankruptcy () {
    if (Number(chipsTotal.textContent) === 0) {
        newGameBtn.textContent = `RESTART`
        bankrupt = true
        titleTextElem.textContent = `Bankruptcy, House Wins`
    }
}