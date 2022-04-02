$(document).ready(function () {

    // Notifies the console that jquery is loaded
    console.log("jQuery Loaded")

    // This will remove the loader from the page one second after the page has finished loading
    function removeLoader() {
        $('#loaderBackground').fadeOut(500, function () {
          $('#loaderBackground').remove();
        });
      }

    setTimeout(removeLoader, 1000); 
    
    // Initializes an array for form data to be inputted
    let formDataArray = [];

    

      

      // AJAX to PHP file for passing and receiving the form data
      createCheque = (formDataArrayParam) => {
        $.ajax({
          url: "scripts/PHP/createCheque.php",
          type: 'POST',
          dataType: 'json',
          data: {
            formArray : formDataArrayParam
          },
          success: function (result) {
            if (result.status.name === "ok") {
              console.log(result);     
              
            } 
          }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
          }
        })
      }

      // On submitting the "Create your cheque" form variables will be set & PHP CreateCheque file will be called
    $( "#chequeForm" ).submit(function( event ) {
      
      // Clears the array for multiple use in one session
      let formDataArray = [];

      console.log("form submitted")

      // Sender's Details
      let fName = $('#fname').val();
      let lName = $('#lname').val();
      let hNumber = $('#hnumber').val();
      let rName = $('#rname').val();
      let postcode = $('#postcode').val();
      
      //Recipient's Details
      let recipientFName = $('#recipientfname').val();
      let recipientLName = $('#recipientlname').val();

      // Payment Details
      let amount = $('#amount').val();
      let reference = $('#reference').val();
      let date = $('#date').val();

      console.log(`${fName} ${lName} ${hNumber} ${rName} ${postcode} ${recipientFName} ${recipientLName} ${amount} ${reference} ${date}`);

      // Pushes all the form data to an array
      formDataArray.push(fName ,lName, hNumber, rName, postcode, recipientFName, recipientLName, amount, reference, date);

      createCheque(formDataArray);

      return false;
    });

});