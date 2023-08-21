

class Service {
  btn
  btnProgress
  textElement
  steps
  currentStep
  inputs = {
    title: "",
    btnBackgroundColor: "",
    btnProgressColor: "",
    successValue: "",
    errorValue: "",
  }
  constructor(serviceName) {
    
    this.getValues(); 
    this.name = serviceName;
    this.btn = document.querySelector(".button");
    this.btnProgress = document.querySelector(".button__progress");
    this.currentStep = 0;
    this.btn.setAttribute("data-ready-text", this.inputs.title);
    this.btn.style.background = this.inputs.btnBackgroundColor;
    this.btnProgress.style.background = this.inputs.btnProgressColor;
    
    this.btn.onclick = () => {
      this.execute();
    }
  
    // overwrite this one for the different steps in your service
    this.steps = ["1. 1st step", "2. 2nd step", "3. 3rd step", "4. 4th step", "5. 5th step", "6. 6th step"];
    this.setButtonProgress(0);
    this.#validate();
    console.log(this);
  }
  getValues() {
    for (const input in this.inputs) {
      if (this.inputs.hasOwnProperty(input)) {
        this.inputs[input] = getValue(input)
        // console.log(`${input} : ${this.inputs[input]}`)
      }
    }
  }
  setButtonProgress(percent) {
    this.textElement = this.btn.querySelector(".button__text");
    this.btn.querySelector(".button__progress").style.width = `${percent}%`;

    if (percent == 0) {
      this.textElement.textContent = this.btn.dataset.readyText
      // this.textElement.textContent = "3"
    }

    if (percent > 0) {
      this.textElement.textContent = this.btn.dataset.progressText;
    }

    if (percent >= 100) {
      this.textElement.textContent = this.btn.dataset.completeText;
    }
  }
  resetBar() {
    this.setButtonProgress(0);
  }
  #validate() {
    for (const input in this.inputs) {
      if (this.hasOwnProperty(input)) {
        if (this.inputs[input] == null ) {
          fireEvent("failure", input + " is empty")
        }
        // console.log(`${input} : ${this.inputs[input]}`)
      }
    }

  }

  async #delayLoop() {
   
    setTimeout(() => {
      this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
      this.currentStep++;
      if (this.currentStep < this.steps.length) {
        this.#delayLoop();
      } else {
        setTimeout(() => {
          this.resetBar();
          fireEvent("success", this.inputs.successValue)  
        }, 400);
        
      }
    }, 400);
  };

  async execute() {
    this.#delayLoop()
  }

}






