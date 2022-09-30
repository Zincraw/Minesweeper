let width = 10
let height = 10
let minesCount = 10
let indexGrid = 0;
let grid


document.addEventListener('DOMContentLoaded', () => 
{

document.getElementById('board').style.width = 40*width + "px"
document.getElementById('board').style.height = 40*height + "px"

//create board
if(window.location.search.includes('?'))
    {laodBoardFromMockData}

createBoard()

})

function createBoard() {
    let board = document.querySelector('#board')
    
    //shuffle game array
    const minesArray = Array(minesCount).fill('mine')
    const emptyArray = Array(width*height - minesCount).fill('empty')
    const gameArray = emptyArray.concat(minesArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)
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

function laodBoardFromMockData(){
    let contentUrl = windows.location.search.split("?");
    let mockData = contentUrl[1].split["-"];
    width = mockData.length;
    height = mockData.length;
}



