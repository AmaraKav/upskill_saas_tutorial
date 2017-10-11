/* global $ */
// turbolinks:load = wait until document is loaded before running code
$(document).on('turbolinks:load', function() {
// values are in milliseconds
  $('.alert').delay(1000).fadeOut(4000);
});