const loadTweets = () => {
  return $.get("/tweets")
};

const renderTweets = function(tweets) {
  // Clear the tweet container before rendering new tweets
  $('.tweets-list').empty();
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let singleTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweets-list').prepend(singleTweet);
  }
}

// sanitization of user's input
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creating tweets from already esiting tweets db
// timego implementation is in the <p> on the line 39
const createTweetElement = (data) => {
  const tweet = $('<article>').addClass('tweet')
  const tweetInfo = `<header class="tweet-header">
<div class="tweet-author">
  <img src="${data.user.avatars}">
  <p>${escape(data.user.name)}</p>
</div>
<p>${data.user.handle}</p>
</header>
<div class="tweet-content">
<p>${escape(data.content.text)}</p>
</div>
<footer class="tweet-footer">
<p>${timeago.format(data.created_at)}</p>
<div>
  <i class="fa-solid fa-flag"></i>
  <i class="fa-solid fa-retweet"></i>
  <i class="fa-solid fa-heart"></i>
</div>
</footer>`

  let tweetElement = tweet.prepend(tweetInfo);
  return tweetElement;
}

const addPost = (formData) => {
  return $.post("/tweets", formData);
}

$(document).ready(function() {

  $("form").on("submit", (event) => {
    event.preventDefault();

    const remaining = 140 - $('.new-tweet textarea').val().length;

    // not displaying the errors
    $('.empty-tweet-error').hide();
    $('.exceeded-chars-error').hide();

    // tweet length rules validation
    if (remaining === 140) {
      // if empty tweet - displaying the error
      $('.empty-tweet-error').slideDown();
    } else if (remaining < 0) {
      // if more than 140 chars - displaying the error
      $('.exceeded-chars-error').slideDown();
    } else {
      const formData = $(event.target).serialize();

      addPost(formData)
        .then((res) => {
          loadTweets()
            .then((data) => renderTweets(data))
            .then(() => {
              // Clear the tweet text area
              $('#tweet-text').val('');
              // Reset the character counter
              $('.counter').text(140);
            });
        })
        .catch((err) => console.log(err));
    }

  })

  //removing the error from the page when user started typing in the textarea
  $('.new-tweet textarea').on('input', () => {
    $('.empty-tweet-error').hide();
    $('.exceeded-chars-error').hide();
  });

  loadTweets()
    .then((data) => renderTweets(data))
    .catch((err) => console.log("OH NO", err))

});