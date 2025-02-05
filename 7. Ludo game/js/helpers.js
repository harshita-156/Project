const rollDie = () => {
    return Math.ceil(Math.random() * 6) 
}

const player = () => {
    if (isPlayerOneTurn) {
        return blueTokens
    }
    if (isPlayerTwoTurn) {
        return redTokens
    }
    if (isPlayerThreeTurn) {
        return greenTokens
    }
    if (isPlayerFourTurn) {
        return yellowTokens
    }

}

const addTokenListener = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].piece.addEventListener('click', moveToken)
    }
}

const removeTokenListener = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].piece.removeEventListener('click', moveToken)
    }
}

const addTokenHighlight = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        flashInterval.push(setInterval( () => {
            $('#'+arr[i].piece.id).toggleClass('piecesInPlay')
        }, 500))
    }
}

const removeTokenHighlight = () => {
    for (let i = 0; i < flashInterval.length; i++) {
        clearInterval(flashInterval[i])
    }
    let htmlCollection = document.getElementsByClassName('piecesInPlay')
    let highlightedTokens = Array.from(htmlCollection)
    if (highlightedTokens.length > 0) {
        for (let i = 0; i < highlightedTokens.length; i++) {
            highlightedTokens[i].classList.remove('piecesInPlay')
        }
    }
}

const currentTokens = () => {
    document.getElementById('updateRoll').textContent = moves
    if (moves == 6 || moves == 1) {
        tokensInPlay = tokens.filter ( (token) => token.totalMoves <= COMPLETE_ROUND_TILE_COUNT)
        tokens.forEach ( (token) => {
            if ((((token.endTile + 1) - (token.currentTile + moves)) >= 0) && (token.currentTile >= token.zoneTile)) {
                tokensInPlay.push(token)
            }
        })
        addTokenHighlight(tokensInPlay)
        addTokenListener(tokensInPlay)
    } else {
        tokensInPlay = tokens.filter( (token) => (token.inPlay && (((token.endTile + 1) - (token.currentTile + moves)) >= 0)))
        addTokenHighlight(tokensInPlay)
        addTokenListener(tokensInPlay)
        if (tokensInPlay.length == 0) {
            endPlayerTurn()
        }
    }
}

const moveToken = (e) => {
    document.getElementById('updateRoll').textContent = '?'
    removeTokenHighlight()
    removeTokenListener(tokensInPlay)
    let currentTokenInPlay = tokensInPlay.filter( (token) => token.piece == e.target)
    currentTokenInPlay[0].move(moves)
    killToken(currentTokenInPlay[0])
    endPlayerTurn()
}

const killToken = (killerToken) => {
    let endBox = $('.box[data-tile-number="'+ testEnd +'"]')
    let children = endBox[0].children
    if (testEnd != SAFE_TILE_1 && testEnd != SAFE_TILE_2 && testEnd != SAFE_TILE_3 && testEnd != SAFE_TILE_4) {
        if (children && children.length == 1 && (killerToken.piece.classList[0] != children[0].classList[0])) {
            let childId = children[0].id
            let deadToken = allTokens[childId]
            let home = deadToken.home
            $('#'+childId).detach().appendTo($(home))
            deadToken.inPlay = false
            deadToken.currentTile = deadToken.startTile
            deadToken.totalMoves = 0
            deadToken.testMovesTotal = 0
        }
    }
}

const tokenReturn = (arr, start) => {
    arr.forEach( (token) => {
        token.currentTile = start
        token.inPlay = false
        token.totalMoves = 0
        token.testMovesTotal = 0
        if (token.piece.classList.length > 2) {
            token.piece.classList.remove('win')
        }
        $('#'+token.piece.id).detach().appendTo($(token.home))
    })
}

const reset = () => {
    message.style.fontSize = 'smaller'
    message.textContent = 'Click play to start a new game.'
    currentPlayer = 'Player 1 (blue)'
    isPlayerOneTurn = true
    isPlayerTwoTurn = false
    isPlayerThreeTurn = false
    isPlayerFourTurn = false
    document.getElementById('reset').style.display = 'none'
    document.getElementById('play').style.display = 'inline-block'
    tokenReturn(blueTokens, BLUE_START_TILE)
    tokenReturn(redTokens, RED_START_TILE)
    tokenReturn(greenTokens, GREEN_START_TILE)
    tokenReturn(yellowTokens, YELLOW_START_TILE)
}

const endGame = () => {
    document.getElementById('roll').style.display = 'none'
    document.getElementById('reset').style.display = 'inline-block'
    document.getElementById('reset').addEventListener('click', reset)
}

const checkWin = () => {
    winningBoxes = document.getElementsByClassName('score')
    for (let i = 0; i < winningBoxes.length; i++) {
        if (winningBoxes[i].children.length == 4) {
            message.textContent = document.getElementsByClassName('playerName')[i].innerText + ' wins!'
            message.style.fontSize = 'larger'
            endGame()
        }
    }
}

const endPlayerTurn = () => {
    if (moves != 6) {
        changeTurn()
    } else {
        message.textContent = currentPlayer + ', you rolled a 6, roll again!'
    }
    flashInterval = []
    document.getElementById('roll').addEventListener('click', playGame)
}

const changeTurn = () => {
    if (isPlayerOneTurn) {
        message.textContent = 'Player 2 (red), it\'s your turn! Click roll.'
        currentPlayer = 'Player 2 (red)'
        isPlayerOneTurn = false
        isPlayerTwoTurn = true
    }else if (isPlayerTwoTurn) {
        message.textContent = 'Player 3 (green), it\'s your turn! Click roll.'
        currentPlayer = 'Player 3 (green)'
        isPlayerTwoTurn = false
        isPlayerThreeTurn = true
    }else if (isPlayerThreeTurn) {
        message.textContent = 'Player 4 (yellow), it\'s your turn! Click roll.'
        currentPlayer = 'Player 4 (yellow)'
        isPlayerThreeTurn = false
        isPlayerFourTurn = true
    }else if (isPlayerFourTurn) {
        message.textContent = 'Player 1 (blue), it\'s your turn! Click roll.'
        currentPlayer = 'Player 1 (blue)'
        isPlayerFourTurn = false
        isPlayerOneTurn = true
    }
}

const playGame = () => {
    message = document.getElementById('message')
    message.textContent = currentPlayer + ', select a token to move.'
    document.getElementById('roll').removeEventListener('click', playGame) 
    moves = rollDie() 
    tokens = player() 
    currentTokens() 
}