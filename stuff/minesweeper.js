let width = 8
let height = 8
let minesCount = 10
let indexGrid = 0
let grid
let checkMockData = false
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
        square.classList.add("hidden")
        board.appendChild(square)
        square.addEventListener('click', function(){
            click(grid[i][j], square)
        })
    }
}

function click(cellType, square){
    square.removeAttribute('class')
    square.classList.add(cellType)
}

function loadBoardFromMockData(){
    let contentUrl = window.location.search.split("=");
    console.log(contentUrl)
    let mockData = contentUrl[1].split("-");
    minesCount = (contentUrl[1].match(/x/g) || []).length
    console.log(mockData)
    width = mockData[0].length;
    height = mockData.length;
    shuffledArray = []
    for(let i = 0; i < contentUrl[1].length; i++){
        if(contentUrl[1][i] == 'o')
            shuffledArray.push('empty')
        else if (contentUrl[1][i] == 'x')
            shuffledArray.push('mine')
    }
}



