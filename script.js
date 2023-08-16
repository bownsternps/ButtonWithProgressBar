

const btn = document.querySelector(".button");

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

let station,title = "";

station = getValue('station');
if (station == "") {
  fireEvent("Error", "No station provided")
}

var currentStep = 0;
function incrementBar() {
  currentStep++;
  document.getElementById('bar').setAttribute("style", `width:${currentStep / loopList.length * 100}%`);

}

function resetBar() {
  setButtonProgress(btn,0);
}

