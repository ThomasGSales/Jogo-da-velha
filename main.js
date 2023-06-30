const regions = document.querySelectorAll(".gameBoard span")
let vBoard = []
let turnPlayer = ''

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById("turnPlayer").innerText = playerInput.value
}

function disableRegion(e){
    e.classList.remove("cursor")
    e.removeEventListener("click", handleBoardClick)
}

function initializeGame(){
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = "Player1"
    document.querySelector("h2").innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    regions.forEach(function (e){
        e.classList.remove("win")
        e.innerText = ""
        e.classList.add("cursor")
        e.addEventListener("click", handleBoardClick)
    })
}

function getWinRegions(){
    const winRegions = []

    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")

    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")

    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")

    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")

    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")

    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")

    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")

    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")

    return winRegions
}

function handleBoardClick(ev){
    const span = ev.currentTarget
    const region = ev.currentTarget.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if(turnPlayer === "Player1"){
        span.innerText = "X"
        vBoard[row][column] = "X"
    } else {
        span.innerText = "O"
        vBoard[row][column] = "O"
    }
    console.clear()
    console.table(vBoard)
    disableRegion(span)
    const winRegions = getWinRegions()
    if(winRegions.length > 0){
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === "Player1" ? "Player2" : "Player1"
        updateTitle()
    } else{
        document.querySelector("h2").innerHTML = "Empate"
    }
}

function handleWin(regions){
    regions.forEach(function(e){
        document.querySelector("[data-region='"+ e +"']").classList.add("win")
    })
    const player = document.getElementById(turnPlayer).value
    document.querySelector("h2").innerHTML = player + " venceu!"
}

document.getElementById("start").addEventListener("click", initializeGame)