$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    var maxLength = 140;
    var currentLength = $(this).val().length;
    var remaining = maxLength - currentLength;

    // Update the counter on the page
    // Assuming the counter has a class 'counter'
    $('.new-tweet .counter').text(remaining);

    // Optional: Change the color if the text is too long
    if(remaining < 0) {
      $('.new-tweet .counter').addClass('text-danger'); // Example class for red text
    } else {
      $('.new-tweet .counter').removeClass('text-danger');
    }
  });
});