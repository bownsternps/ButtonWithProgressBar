////////////////////////////////////////////////////////////
// START: that section is only needed when running outside of Tulip 
////////////////////////////////////////////////////////////

// function getValue(prop, callback) {
    function getValue(prop) {    
    console.log("That's what getValue was called with: ", prop );
    switch (prop) {
      case 'Station':
        station = {"id":"iJqBRzjCHSXEyDTXx"};
        return station;
        // callback(prop);
        break;
        case 'Ttile':
          Title = "Get SAP Ops";
          return Title;
        //   callback(prop);
          break;
      default:
        break;
    }
  }
  
  
  
  function fireEvent(type, text) {
    console.log("That's what fire event got: ", text);
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
  