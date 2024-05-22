const loadTweets = () => {
  return $.get("/tweets")
};

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let singleTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweets-list').prepend(singleTweet);
  }
}

const createTweetElement = (data) => {
  const tweet = $('<article>').addClass('tweet')
  const tweetInfo = `<header class="tweet-header">
<div class="tweet-author">
  <img src="${data.user.avatars}">
  <p>${data.user.name}</p>
</div>
<p>${data.user.handle}</p>
</header>
<div class="tweet-content">
<p>${data.content.text}</p>
</div>
<footer class="tweet-footer">
<p>${timeago.format(data.created_at)}</p>
<div>
  <i class="fa-solid fa-heart"></i>
  <i class="fa-solid fa-retweet"></i>
  <i class="fa-solid fa-comment"></i>
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
    if (remaining === 140) {
      alert("The tweet cannot be empty")
    } else if (remaining < 0) {
      alert("Tweet length should not exceed 140 characters")
    } else {
      const formData = $(event.target).serialize();
  
      addPost(formData)
      .then((res) => {
        loadTweets()
        .then((data) => renderTweets(data))
      })
      .catch((err) => console.log(err));
    }
    
  })

   loadTweets()
  .then((data) => renderTweets(data))
  .catch((err) => console.log("OH NO", err))

});