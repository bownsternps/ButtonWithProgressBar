////////////////////////////////////////////////////////////
// START: that section is only needed when running outside of Tulip 
////////////////////////////////////////////////////////////

function getValue(prop) {
    // const propValues = {
    //     station: "",
    //     title: "",
    //     btnBackgroundColor: "",
    //     btnProgressColor: "",
    //     successValue: "",
    //     errorValue: "",
    //   }    

    switch (prop) {
        case 'station':
            return { "id": "iJqBRzjCHSXEyDTXx" };
            break;
        case 'title':
            return "This is a placeholder"
            break;
        case 'btnBackgroundColor':
            return "#729B79";
            break;
        case 'btnProgressColor':
            return "#475B63";
            break;
        case 'successValue':
            return "This is a placeholder success value";
            break;
        case 'errorValue':
            return "This is a placeholder error value";
            break;
        default:
            break;
    }
}



function fireEvent(type, text) {
    // Get the modal 
    document.getElementById("fireEventText").innerHTML = text
    document.getElementById("fireEventType").innerHTML = type
    modal.style.display = "block";
}


var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

  ////////////////////////////////////////////////////////////
  // END: that section is only needed when running outside of Tulip
  ////////////////////////////////////////////////////////////
