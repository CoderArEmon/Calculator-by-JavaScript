function getHistory(){
   return document.getElementById("history").innerText;
}

function printHistory(num){
    document.getElementById("history").innerText = num;
}

function getOutput(){
    return document.getElementById("output").innerText;
}

function printOutput(num){
    if(num == ""){
        document.getElementById("output").innerText = num;  //prevent showing 0
    }else{
        document.getElementById("output").innerText = formatNumber(num);
    }
 
}

//adding coma

function formatNumber(num){
    let dot = Number(num);
    let value = dot.toLocaleString("en");
    return value;
}

//get number input

let history_value; //global value
let output_value;

let number = document.getElementsByClassName("number");
for(let i=0; i< number.length; i++){
    number[i].addEventListener("click", function(){
        history_value = getHistory();
        history_value += this.id;
        printHistory(history_value);
    })
}

function normalNumber(num){
    return Number(num.replace(/,/g,"")); //replace coma in history
}

let operator = document.getElementsByClassName("operator");
for(let i=0; i< operator.length; i++){
    operator[i].addEventListener("click", function(){
        if(this.id == "clear"){
            printHistory("");
            printOutput("");
        }else if(this.id == "back"){
            history_value = getHistory();
            history_value = history_value.substr(0, history_value.length-1);
            printHistory(history_value);
        }else if(this.id == "equal"){
            history_value = getHistory();
            let result = eval(history_value);
            if(result.toString().length <= 11){
                printOutput(result);
                printHistory(history_value + "=");
            }else{
                alert("The result is too large to show!!");
            }

        }else{
            output_value = getOutput();
            history_value = getHistory();
            if(output_value){
                history_value = normalNumber(output_value) + this.id;
                printHistory(history_value);
            }else if(history_value == ""){
                printHistory("");
            }else if(isNaN(history_value[history_value.length-1])){
                history_value = history_value.substr(0, history_value.length-1) + this.id;
                printHistory(history_value);
            }
            else{
                history_value += this.id;
                printHistory(history_value);
            }
        }
    })
}