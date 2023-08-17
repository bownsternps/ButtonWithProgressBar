

function resetBar() {
  setButtonProgress(btn,0);
}
function incrementBar() {
  currentStep++;
  document.getElementById('bar').setAttribute("style", `width:${currentStep / loopList.length * 100}%`);
}



function setButtonProgress(button, percent) {
  console.log("in setButtonProgress. percent is:", percent);
  var textElement = button.querySelector(".button__text");
  button.querySelector(".button__progress").style.width = `${percent}%`; 
  
  if (percent == 0) {
    textElement.textContent = button.dataset.readyText
  }
  
  if (percent > 0) {
    textElement.textContent = button.dataset.progressText;
  }

  if (percent >= 100) {
    textElement.textContent = button.dataset.completeText;
    

  }
}
// setup
const btn = document.querySelector(".button");
const btnProgress = document.querySelector(".button__progress");
const propsValues = {
  station: "",
  title:"",
  btnBackgroundColor: "",
  btnProgressColor: "",
  successValue: "",
  errorValue: "",
}

for (var key in propsValues) {
  propsValues[key] = getValue(key);
  if (propsValues[key] == "") {
     fireEvent("Error", key +" input value is missing" )
  }
}
var currentStep = 0;
btn.setAttribute("data-ready-text", propsValues.title);
btn.style.background = propsValues.btnBackgroundColor;
btnProgress.style.background = propsValues.btnProgressColor;
console.log("Changed the colors to: " + propsValues.btnProgressColor);
console.log(propsValues);







