// SELECTOR
let historyValue = document.getElementById("history-value");
let outputValue = document.getElementById("output-value");
let operator = document.getElementsByClassName("operator");
let number = document.getElementsByClassName("number");



/// FUNCTION

function getHistory(){
	return historyValue.innerText;
}

function printHistory(num){
	historyValue.innerText = num;
}

function getOutput(){
	return outputValue.innerText;
}		

function printOutput(num){
	if (num == "") {
		outputValue.innerText = num;
	} else {
		outputValue.innerText = getFormattedNumber(num);
	}
}

function getFormattedNumber(num){
	if (num=="-") {
		return "";
	}
	let n = Number(num);
	let value = n.toLocaleString("en");
	return value; 
}


function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}


for (let i  = 0; i < operator.length; i++){
	operator[i].addEventListener('click', function() {
		if (this.id == "clear") {
			printHistory("");
			printOutput("");
		}
		else if (this.id == "backspace") {
				let output = reverseNumberFormat(getOutput()).toString();
				if (output) { // if output has value
					output = output.substr(0, output.length-1);
					printOutput(output);
				}
		}
		else {
			let output = getOutput();
			let history = getHistory();

			if (output==""&&history!="") {
				if (isNaN(history[history.length-1])) {
					history = history.substr(0,history.length-1);
				}
			}
			if (output!="" || history!="") {
				output = output == "" ?
				output : reverseNumberFormat(output);
				history = history+output;
				if (this.id=="=") {
					let result =eval (history);
					printOutput(result);
					printHistory("");
				} else {
					history = history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
	});
}


for (let i  = 0; i < number.length; i++){
	number[i].addEventListener('click', function() {
		let output = reverseNumberFormat(getOutput());
		if (output!=NaN) {
			output = output+this.id;
			printOutput(output);
		}
	});
}