document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.getElementById('result');
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
        generate();
        generate();
    }
    createBoard();

    //generate a number randomly 
    function generate(){
        let randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2;
        } else generate();
    }

    //swipe right
    function moveRight(){
        for(let i = 0; i < widht* widht; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filteredRow = row.filter(num => num);
                let missing = row.length - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
                
            }
        }
    }

    //swipe left
    function moveLeft(){
        for(let i = 0; i < widht* widht; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filteredRow = row.filter(num => num);
                let missing = row.length - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
                
            }
        }
    }

    //swipe dowm
    function moveDown(){
        for(let i=0; i < widht; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+widht].innerHTML;
            let totalThree = squares[i+(widht*2)].innerHTML;
            let totalFour = squares[i+(widht*3)].innerHTML;
            let coulmn = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredCoumn = coulmn.filter(num => num);
            let missing = widht - filteredCoumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredCoumn);
            squares[i].innerHTML = newColumn[0];
            squares[i + (widht)].innerHTML = newColumn[1];
            squares[i + (2*widht)].innerHTML = newColumn[2];
            squares[i + (3*widht)].innerHTML = newColumn[3];
        }
    }

     //swipe up
     function moveUp(){
        for(let i=0; i < widht; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+widht].innerHTML;
            let totalThree = squares[i+(widht*2)].innerHTML;
            let totalFour = squares[i+(widht*3)].innerHTML;
            let coulmn = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredCoumn = coulmn.filter(num => num);
            let missing = widht - filteredCoumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredCoumn.concat(zeros);
            squares[i].innerHTML = newColumn[0];
            squares[i + (widht)].innerHTML = newColumn[1];
            squares[i + (2*widht)].innerHTML = newColumn[2];
            squares[i + (3*widht)].innerHTML = newColumn[3];
        }
    }

    //combine
    function combineRows(){
        for(let i=0; i < (widht*widht)-1; i++) {
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;
            }
        }
        CheckWin();
    }

    function combineColumns(){
        for(let i=0; i < (widht*widht)-widht; i++) {
            if(squares[i].innerHTML === squares[i+widht].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+widht].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+widht].innerHTML = 0;
            }
        }
        CheckWin();
    }

    //asign keycodes
    function control(e){
        if(e.keyCode === 39){
            keyRight();
        } else if(e.keyCode === 37){
            keyLeft();
        } else if(e.keyCode === 38){
            KeyUp();
        } else if(e.keyCode === 40){
            keyDown();
        }
    }

    document.addEventListener('keyup', control);

    function keyRight(){
        moveRight();
        combineRows();
        moveRight();
        generate();
    }

    function keyLeft(){
        moveLeft();
        combineRows();
        moveLeft();
        generate();
    }

    function keyDown(){
        moveDown();
        combineColumns();
        moveDown();
        generate();
    }

    function KeyUp(){
        moveUp();
        combineColumns();
        moveUp();
        generate();
    }

    //check for win 
    function CheckWin(){
        for(let i =0; i < squares.length; i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Win';
                document.removeEventListener('keyup', control);
            }
        }
    }


    
})