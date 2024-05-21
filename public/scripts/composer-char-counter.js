$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    let counter = $(this).closest('.new-tweet').find('.counter');
    const maxLength = 140;
    let currentLength = $(this).val().length;
    let remaining = maxLength - currentLength;

    // Update the counter on the page
    $(counter).text(remaining);

    // Change the color if the text is too long
    if(remaining < 0) {
      $(counter).addClass('text-danger'); 
    } else {
      $(counter).removeClass('text-danger');
    }
  });
});