$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    var maxLength = 140;
    var currentLength = $(this).val().length;
    var remaining = maxLength - currentLength;

    // Update the counter on the page
    $('.new-tweet .counter').text(remaining);

    // Change the color if the text is too long
    if(remaining < 0) {
      $('.new-tweet .counter').addClass('text-danger'); 
    } else {
      $('.new-tweet .counter').removeClass('text-danger');
    }
  });
});