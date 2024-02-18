  let price = 19.5;
  let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
  const nominals = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  const cash = document.getElementById("cash");
  const purchaseBtn = document.getElementById("purchase-btn");

  const changeDue = document.getElementById("change-due");
  const priceElelment = document.getElementById("price");
  priceElelment.innerText = `Amount to pay: ${price}`;

  const changeInDraw = document.getElementById("change-in-draw");

  const updateChangeInDraw = () => {
    changeInDraw.innerHTML = "";
    for(const changeInDrawElement of cid){
      changeInDraw.innerHTML += `
        <p>${changeInDrawElement[0]}: ${changeInDrawElement[1]}</p>
      `
    }
  }

  updateChangeInDraw();

  const determineChange = () => {
    const receivedCash = Number(cash.value);
    if(receivedCash < price){
      alert("Customer does not have enough money to purchase the item");
    } else if (receivedCash === price){
      changeDue.innerText = "No change due - customer paid with exact cash";
    } else{
      
      const moneyInDrawer = Number(cid.map((cashElement)=>cashElement[1])
                               .reduce((a, b) => a+b, 0)
                               .toFixed(2));

      const changeAmount = Number(receivedCash.toFixed(2) - price.toFixed(2));
      let remaindedMoney = Number(changeAmount.toFixed(2));
      const result = [];
      let status;

      for(let i=0; i<nominals.length; i++){
        let count = 0;
        while(remaindedMoney >= nominals[nominals.length - 1 - i] && cid[nominals.length - 1 - i][1] >= (count+1) * Number(nominals[nominals.length - 1 - i].toFixed(2))){
          count++;
          remaindedMoney -= nominals[nominals.length - 1 - i].toFixed(2);
          remaindedMoney = Number(Number(remaindedMoney).toFixed(2));
        }
        result.unshift(count * Number(nominals[nominals.length - 1 - i].toFixed(2)));
      }


      if(moneyInDrawer === changeAmount){
        status = "CLOSED";
      } else if(remaindedMoney === 0){
        status = "OPEN";
        for(let i = 0; i<result.length; i++){
          cid[i][1]-=result[i];
          cid[i][1] = Number(cid[i][1].toFixed(2));
        }
      } else {
        status = "INSUFFICIENT_FUNDS";
        changeDue.innerText = `Status: ${status}`;
        return;
      }

      changeDue.innerText = `Status: ${status}`;
      
      for(let i=0; i<result.length; i++){
        if (result[result.length-1-i] === 0) {
          continue;
        } else {
          changeDue.innerText += ` ${cid[result.length-1-i][0]}: $${result[result.length-1-i]}`;
        }
      }

      updateChangeInDraw();
      changeDue.style.display = "block";
      cash.value = "";
    }

  }

  purchaseBtn.addEventListener("click", determineChange);