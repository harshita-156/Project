window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('play').addEventListener('click', () => {
        isPlayerOneTurn = true
        document.getElementById('message').textContent = 'Player 1 (blue), click roll to begin.'
        document.getElementById('play').style.display = 'none'
        document.getElementById('roll').style.display = 'inline-block'
    })
    document.getElementById('roll').addEventListener('click', playGame)
})