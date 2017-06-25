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

    var input =  $("input").val()
    movies.push(input)
    buttonMaker();
  })

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


    })


  })
})

