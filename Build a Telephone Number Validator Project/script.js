const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

const phoneNumberRegex = /^(1|1 )?((\([\d][\d][\d]\) ?)|([\d][\d][\d](-| )?))([\d][\d][\d](-| )?)([\d][\d][\d][\d](-| )?)$/;

const checkInput = () => {

    const input = userInput.value;
    
    if(input === ""){
        alert("Please provide a phone number");
        return;
    }
    
    if(phoneNumberRegex.test(input)){
        results.innerText = "Valid US number: " + input;
    } else {
        results.innerText = "Invalid US number: " + input;
    }
}

const clearInput = () => {
    results.innerHTML = "";
}

checkBtn.addEventListener("click", checkInput);
clearBtn.addEventListener("click", clearInput);