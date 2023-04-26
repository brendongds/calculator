let runningTotal = 0;
let buffer = 0.0;
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = 0.0;
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.toString().length === 1){
                buffer = 0.0;
            }else{
                buffer = parseFloat(buffer.toString().substring(0, buffer.toString().length - 1));
            }
            break;
        case '+':
        case '−':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
        case '.':
            if(buffer.toString().indexOf('.') === -1){
                buffer = parseFloat(buffer.toString() + '.');
            }
            break;
    }
}

function handleMath(symbol){
    if(buffer === 0.0){
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = floatBuffer;
    }else{
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = 0.0;
}

function flushOperation(floatBuffer){
    if(previousOperator === '+'){
        runningTotal += floatBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= floatBuffer;
    }else if(previousOperator === 'x'){
        runningTotal *= floatBuffer;
    }else{
        runningTotal /= floatBuffer;
    }
    buffer = parseFloat(runningTotal.toFixed(2));
}

function handleNumber(numberString){
    if(buffer === 0.0){
        buffer = parseFloat(numberString);
    }else if(numberString === '.' && buffer.toString().indexOf('.') !== -1){
        // ignorar entrada de ponto se o buffer já contém um
        return;
    }else{
        buffer = parseFloat(buffer.toString() + numberString);
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();