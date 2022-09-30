let width = 10
let height = 10
let minesCount = width/5
let indexGrid = 0;
let grid
let checkMockData = false;
let shuffledArray


document.addEventListener('DOMContentLoaded', () => 
{
    if(window.location.search.includes('?')){
        loadBoardFromMockData();
        checkMockData = true;
    }
document.getElementById('board').style.width = 40*width + "px"
document.getElementById('board').style.height = 40*height + "px"

//create board


createBoard()

})

function createBoard() {
    let board = document.querySelector('#board')

    //shuffle game array
    const minesArray = Array(minesCount).fill('mine')
    const emptyArray = Array(width * height - minesCount).fill("empty")
    const gameArray = emptyArray.concat(minesArray)
    if(!checkMockData)
        shuffledArray = gameArray.sort(() => Math.random() -0.5)

    grid = Array(height).fill().map(() => (Array(width).fill().map(() => shuffledArray[indexGrid++])))
    console.log(grid)
    for(let i = 0; i < height; i++) for(let j = 0; j < width; j++){ 
        let square = document.createElement('div');
        square.setAttribute('id', i + "-" + j)
        square.classList.add(grid[i][j])
        board.appendChild(square)

        square.addEventListener('click', function(e){
            click(square)
        })
    }
}


function click(square){
    if(square.classList.contains('mine')){
       console.log('Game Over')
    }
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



