const checkButton = document.getElementById("check-btn");
const inputField = document.getElementById("text-input");
const result = document.getElementById("result");

checkButton.addEventListener('click', checkTheInputWhetherItIsPalindrome);

function checkTheInputWhetherItIsPalindrome(){

    const inputValue = inputField.value;

    if(inputValue === ''){
        alert("Please input a value");
        return;
    };

    result.style.display = 'block';

    let currentValue = inputValue;

    currentValue = removeNotAlphabeticSymbols(currentValue);

    currentValue = currentValue.toLowerCase();

    if(isPolindrome(currentValue)){
        result.style.color = "green";
        result.innerText = `${inputValue} is a palindrome`
    } else {
        result.style.color = "red";
        result.innerText = `${inputValue} is not a palindrome`
    }
}

function removeNotAlphabeticSymbols(input){
    const regex = /[^0-9a-zA-Z]/g;
    return input.replace(regex, '');
}

function isPolindrome(input){
    const isOdd = input.length % 2;
    
    for(let i = 0; i < input.length/2 + isOdd; i++){
        if(input[i] != input[input.length - (1 + i)]){
            return false;
        }
    }
    return true;
}