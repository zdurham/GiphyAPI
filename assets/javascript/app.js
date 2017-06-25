// Code will run when page loads
$(document).ready( function() {
  
  // Array of strings that will become buttons
  var movies = ["There Will Be Blood", "American Psycho", "Star Wars", "Indiana Jones", "The Grand Budapest Hotel", "Mad Max", "Drive", "Hot Fuzz", "Shaun of the Dead", "Lone Wolf and Cub", "Resevoir Dogs", "American Beauty"]


  
  // For loop function that generates buttons
  function buttonMaker() {
    
    // Clear out buttons
    $("#button-holder").html("");

    for (var i = 0; i < movies.length; i++) {
      var gifButton = $("<button class='gif-button btn btn-primary'>")
      gifButton.attr("data-name", movies[i])
      gifButton.appendTo($("#button-holder"))
      gifButton.text(movies[i])
    }
  };

  // Call buttonMaker();
  buttonMaker();

  
  
  // Below is the onclick function for the submit button
  $("#submit-button").on("click", function() {
    event.preventDefault();

    var input =  $("input").val().trim()
    movies.push(input)
    buttonMaker();
  });

  // On click event for the buttons -> AJAX call
  $(document.body).on("click", ".gif-button", function(){
    // variables to be used in AJAX call
    var search = "&q=" + $(this).attr("data-name")
    var apiKey = "api_key=a5d5a60f34f646a9874ac6e7b0f96b72"
    var limit = "&limit=10"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
    var queryURL = "http://api.giphy.com/v1/gifs/search?" + apiKey + search + limit

    // Actual AJAX call
    $.ajax({url: queryURL, method: "get"})
    .done(function(response) {
      console.log(response)
      
      // Results is a var we will use to save some typing of response.data everytime
      var results = response.data

      // Use a for loop to create content
      for (var i = 0; i < results.length; i++) {
        var gifHolder = $("<div class='gif-holder'>")
        var rating = $("<h3>")
        var img = $("<img class='gif'>")

        // Append gifHolder to the "gifs" div and append rating and img to gifHolder
        gifHolder.appendTo($("#gifs"))
        rating.prependTo(gifHolder)
        img.appendTo(gifHolder)

        // Now give the img and rating their content
        rating.text("Rating: " + results[i].rating)
        img.attr("src", results[i].images.original_still.url).attr("data-still", results[i].images.original_still.url).attr("data-animate", results[i].images.original.url).attr("data-state", "still")
      };
    });
  });

  // Now we need an onclick function for the gifs to un-pause and pause
  $(document.body).on("click", ".gif", function() {

  });
});

