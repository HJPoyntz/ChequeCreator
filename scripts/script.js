$(document).ready(function () {

    // Notifies the console that jquery is loaded
    console.log("jQuery Loaded")

    // This will remove the loader from the page one second after the page has finished loading
    function removeLoader() {
        $('#loaderBackground').fadeOut(500, function () {
          $('#loaderBackground').css('display', 'none');
        });
      }

    setTimeout(removeLoader, 1000); 
    
    // Initializes an array for form data to be inputted
    let formDataArray = [];

    
    // Function for fading in the loading screen & fading out the form
    function chequeFormSubmitted() {
      // Fades out the form and brings the loading overlay
      $('#loaderBackground').fadeIn(250, function () {
        console.log("Loader in view")
      });
      $('#formPageBody').fadeOut(250, function () {
        console.log("Form faded out")
      });
    }; 

    // Function for fading out the loading screen and fading in the cheque screen
    function chequeCreated() {
      // Fades out the form and brings the loading overlay
      $('#loaderBackground').fadeOut(1000, function () {
        console.log("Loader faded out")
      });
      $('#chequeContainer').fadeIn(500, function () {
        console.log("Cheque faded in")
      });
    }; 

    // Function for creating another cheque
    function revertView() {
      // Fades in the loading overlay while the form loads back in
      $('#loaderBackground').fadeIn(250, function () {
        console.log("loader faded in")
      });
      $('#chequeContainer').fadeOut(500, function () {
        console.log("cheque faded out")
      });
      $('#formPageBody').fadeIn(500, function () {
        console.log("form loaded in")
      });
      // reverts the button back to normal & removes loader
      $('#createCheque').html("Create your Cheque");
      $("#createCheque").css("background-color", '#FFFFFF');
      $('#creatingChequeSpinner').remove();

      $('#loaderBackground').fadeOut(1000, function () {
        console.log("loader faded out")
      });
      
    }; 
      

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
              // Success callback 
              console.log(result);      
              // This fades out the loader and fades in
              chequeCreated();

              // Sets variables for the success output of the AJAX request
              let senderFirstName = result['data'][0];
              let senderLastName = result['data'][1];
              let senderRoadNum = result['data'][2];
              let senderRoadName = result['data'][3];
              let senderPostCode = result['data'][4];

              let recipientFirstName = result['data'][5];
              let recipientLastName = result['data'][6];

              let reference = result['data'][8];
              let amountInText = result['data'][10];
              let amountFormatted = result['data'][11];

              let day = result['data'][12][2];
              let month = result['data'][12][1];
              let year = result['data'][12][0];
              

              // jQuery DOM manipulation inside of the cheque
                // Sets the top left address information & name
                $('#senderFName').html(senderFirstName);
                $('#senderLName').html(senderLastName);
                $('#senderHouseNum').html(senderRoadNum);
                $('#senderRoadName').html(` ${senderRoadName}`);
                $('#senderPostCode').html(senderPostCode);
                // Sets the name of the recipient on the cheque
                $('#recipientFirstName').html(recipientFirstName);
                $('#recipientLastName').html(` ${recipientLastName}`);
                // Sets the amount ,the amount in text & the payment reference
                $('#amountInDigits').html(amountFormatted);
                $('#amountInText').html(amountInText);
                $('#paymentReference').html(reference);
                // Sets the name of the sender in the bottom right
                $('#senderFirstNameBottom').html(senderFirstName);
                $('#senderLastNameBottom').html(` ${senderLastName}`);
                // Sets the date in the top right
                $('#day').html(day);
                $('#month').html(month);
                $('#year').html(year);

            } 
          }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
          }
        })
      }

      // Block for reverting back to creating another cheque
      $('#createAnotherCheque').click(function( event ) {
        // Calls function for reverting view back to the form
        revertView();
      })

      // On submitting the "Create your cheque" form variables will be set & PHP CreateCheque file will be called
    $( "#chequeForm" ).submit(function( event ) {

      // Calls function for fading out the form and fading in the pre-loader
      chequeFormSubmitted();

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

      // Calls the PHP function
      createCheque(formDataArray);

      // Formats the create button to indicate to the user that the page is loading.
      $('#createCheque').html("Creating your Cheque");
      $("#createCheque").removeClass("bg-slate-50");
      $("#createCheque").css('background-color', '#CBD5E1');
      // Appends the Spinner to the submit button
      $("#createCheque").append(`<div id="creatingChequeSpinner" class="flex justify-center items-center">
      <div style="height: 16px; width: 16px;"  class="animate-spin rounded-full border-b-2 border-sky-600 "></div>
      </div> `);

      // Prevents page from refreshing
      return false;
    });

});