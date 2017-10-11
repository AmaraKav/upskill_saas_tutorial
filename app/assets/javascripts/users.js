/*global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
 
  //When user clicks form submit,
  submitBtn.click(function(event) {
    
  //prevent default submitting behavior
    event.preventDefault();
    
  //Change the submit button to say processing and disable the button
    submitBtn.val("Processing").prop('disabled', true);
    
  //Collect credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
  //Use Stripe JS library to check for card errors
  var error = false;
  
  //Valide card number
  if(!Stripe.card.validateCardNumber(ccNum)) {
    error = true;
    alert('The credit card number appears to be invalid')
  }
  
  //Validate the security code
  if(!Stripe.card.validateCVC(cvcNum)) {
    error = true;
    alert('The CVC code appears to be invalid')
  }
  
  //Validate expiration date
  if(!Stripe.card.validateExpiry(expMonth, expYear)) {
    error = true;
    alert('The expiration date appears to be invalid')
  }
  
  if (error) {
    //If there are card errors, don't send to Stripe and revert sign-up button back
    submitBtn.prop('disabled', false).val('Sign Up')
  } else {
      //Send card information to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  }
  

  
  return false;
  
});
  
  //Stripe will return a card token
  function stripeResponseHandler(status, response) {
    var token = response.id;

  //Inject card token as hidden field as form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
  
  //Submit form to our Rails app
    theForm.get(0).submit();
  }
});