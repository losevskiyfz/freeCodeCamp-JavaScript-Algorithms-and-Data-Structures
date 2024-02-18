const input = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const outputField = document.getElementById("output");
const romanLiterals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

const isInputEmpty = () => input.value === "";
const HasNotAllowedSymbol = () => /[^\d-]/.test(input.value) || /-\D/.test(input.value);
const isInputLessThanOne = () => input.value < 1;
const isInputMoreOrEqualsThenFourHundreds = () => input.value >= 4000;

const setOutputText = (textToSet) => {
    outputField.innerText = textToSet;
}

const checkInput = () => {
    
    if(isInputEmpty() || HasNotAllowedSymbol()){
        setOutputText("Please enter a valid number");
    }
    else if(isInputLessThanOne()){
        setOutputText("Please enter a number greater than or equal to 1");
    }
    else if(isInputMoreOrEqualsThenFourHundreds()){
        setOutputText("Please enter a number less than or equal to 3999");
    }
    else{
        outputField.innerText = convertFromArabicToRoman(input.value);
    }
}

const convertFromArabicToRoman = (arabicNumber) => {
    
    let romanNumber = "";
    let arabicNumberFigures = [];
    let literalShift = 0;
    let currentNumber;

    while(arabicNumber !== 0){
        arabicNumberFigures.unshift(arabicNumber % 10);
        arabicNumber = Math.floor(arabicNumber / 10);
    }

    const figuresArraySize = arabicNumberFigures.length;
    
    for(let i=0; i<figuresArraySize; i++){
        currentNumber = arabicNumberFigures.pop();
        if (currentNumber <=3){
            for (let j=0; j<currentNumber; j++){
                romanNumber = romanLiterals[literalShift] + romanNumber;
            }
        } else if(currentNumber === 4){
            romanNumber = romanLiterals[literalShift+1] + romanNumber;
            romanNumber = romanLiterals[literalShift] + romanNumber;
        } else if(5 <= currentNumber && currentNumber < 9){
            for(let j=0; j<currentNumber % 5; j++){
                romanNumber = romanLiterals[literalShift] + romanNumber;
            }
            romanNumber = romanLiterals[literalShift+1] + romanNumber;
        } else if(currentNumber == 9 ){
            romanNumber = romanLiterals[literalShift+2] + romanNumber;
            romanNumber = romanLiterals[literalShift] + romanNumber;
        }

        literalShift +=2;
    }

    return romanNumber;
}

convertButton.addEventListener('click', checkInput);
