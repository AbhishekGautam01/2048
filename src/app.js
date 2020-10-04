document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.getElementById("result");
    const widht = 4;
    let squares = [];

    //Creatign a play board
    function createBoard(){
        for(let i=0; i < widht * widht; i++){
            sqaure = document.createElement('div');
            sqaure.innerHTML = 0;
            gridDisplay.appendChild(sqaure);
            squares.push(sqaure);
        }
    }

})