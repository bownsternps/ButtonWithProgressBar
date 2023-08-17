

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
const propValues = {
  station: "",
  title:"",
  btnBackgroundColor: "",
  btnProgressColor: "",
  successValue: "",
  errorValue: "",
}

for (var key in propValues) {
  propValues[key] = getValue(key);
  if (propValues[key] == "") {
     fireEvent("Error", key +" input value is missing" )
  }
}
var currentStep = 0;
btn.setAttribute("data-ready-text", propValues.title);
btn.style.background = propValues.btnBackgroundColor;
btnProgress.style.background = propValues.btnProgressColor;
console.log("Changed the colors to: " + propValues.btnProgressColor);
console.log(propValues);







