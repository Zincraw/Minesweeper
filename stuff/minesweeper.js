let width = 8
let height = 8
let minesCount = 10
let indexGrid = 0
let grid
let checkMockData = false
let gameStatus
let buttonStatus = document.getElementById("resetButton")
let isTimeCounting = false
let seconds = 0
let timeValue = document.getElementById("timeCounter")
let flags = 9
let flagValue = document.getElementById("flagCounter")
let shuffledArray

document.addEventListener('DOMContentLoaded', () => 
{
    if(window.location.search.includes('?')){
        loadBoardFromMockData();
        checkMockData = true;
    }
document.getElementById('board').style.width = 43*width + "px"
document.getElementById('board').style.height = 43*height + "px"

createBoard()
})

function createBoard() {
    let board = document.querySelector('#board')

    const minesArray = Array(minesCount).fill('mine')
    const emptyArray = Array(width * height - minesCount).fill("empty")
    const gameArray = emptyArray.concat(minesArray)
    if(!checkMockData)
        shuffledArray = gameArray.sort(() => Math.random() -0.5)
    grid = Array(height).fill().map(() => (Array(width).fill().map(() => shuffledArray[indexGrid++])))

    for(let i = 0; i < height; i++) for(let j = 0; j < width; j++){ 
        let square = document.createElement('div');
        square.setAttribute('id', i + "-" + j)
        square.setAttribute('data-testid', i + "-" + j)
        let row = square.id.split("-")[0]
        let column = square.id.split("-")[1]
        let numAround = checkingMinesNear(row, column);
        square.classList.add("hidden")
        board.appendChild(square)
        square.addEventListener('click', function(){
            clickCell(row, column, numAround, square)
            if(seconds === 0 && !isTimeCounting) 
                setInterval(timesStartsAdding, 1000)
                isTimeCounting = true;
        })
        buttonStatus.addEventListener('click', function(){
            clickResetButton()
        })
        square.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            rightClickCell('flag', square)
        }, false);
    }
}
 
function timesStartsAdding(){ 
    seconds += 1;
    if(seconds < 10)
        timeValue.innerHTML = "Timer <br>0" + seconds
    else 
        timeValue.innerHTML = "Timer <br>" + seconds       
}

function clickCell(row, column, numAround, square){
    let cellInfo = checkingCell(row, column)
    if (cellInfo == 'mine') {
        gamestatus = false;
        changeResetButton(gameStatus)
        square.removeAttribute('class')
        square.classList.add(cellInfo)
        //blockingAllCells(square)
    } 
    else {
        square.removeAttribute('class')
        if (numAround < 1) {
            square.removeAttribute('class')
            square.classList.add("empty")
        } else
            square.classList.add('mineNear'+checkingMinesNear(row, column))
    }
}

function rightClickCell(cellType, square){
    square.removeAttribute('class')
    square.classList.add(cellType)
    flagValue.innerHTML = "Flags <br>" + flags--

}

function clickResetButton(){
    location.reload();
}

function loadBoardFromMockData(){
    let contentUrl = window.location.search.split("=");
    console.log(contentUrl)
    let mockData = contentUrl[1].split("-");
    minesCount = (contentUrl[1].match(/x/g) || []).length
    console.log(mockData)
    width = mockData[0].length;
    height = mockData.length;
    let shuffledArray = []
    for(let i = 0; i < contentUrl[1].length; i++){
        if(contentUrl[1][i] == 'o')
            shuffledArray.push('empty')
        else if (contentUrl[1][i] == 'x')
            shuffledArray.push('mine')
    }
}

function changeResetButton(gameStatus){
    if(!gameStatus){
        buttonStatus.push = 'sad'
        changeImageButton("sad")
    }
    else {
        buttonStatus.classList.add = "happy"
        changeImageButton("happy")
    }
}

function changeImageButton(faceStatus){
    document.getElementById("faceImage").src="./numbers/"+ faceStatus +"-face.png";
}

function checkingCell(row, column){
    if(grid[row][column] == "mine"){
        return "mine"
    } 
    else
        return checkingMinesNear(row, column)
}

function areCoordinatesValid(row, column) {
    if (row < 0 || row >= grid.length) return false
    if (column < 0 || column >= grid[0].length) return false
    return true
}

function checkingMinesNear(row, column){
    let minesNear = 0
    let rowNum = parseInt(row)
    let columnNum = parseInt(column)
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            if(areCoordinatesValid(rowNum+i, columnNum+j))
            {
                if(grid[rowNum+i][columnNum+j] == "mine"){
                    minesNear++
                }
            }
        }
    }
    return minesNear
}

//trying to show all mines

/*function blockingAllCells(cell){
    cell.style.cursor = 'not-allowed'
    for(let i = 0; i < height; i++) for(let j = 0; j < width; j++){ 
        if(grid[i][j] == 'mine'){
            square.removeAttribute('class')
            square.classList.add('mine')
        }
    }
}*/




