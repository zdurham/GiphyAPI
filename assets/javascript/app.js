// Code will run when page loads
$(document).ready(function() {
  
  // Array of strings that will become buttons
  var shows = ["Mr. Robot", "Twin Peaks", "Silicon Valley", "Mad Men", "The Wire", "Fargo", "Courage the Cowardly Dog", "The Office", "House of Cards", "Rick and Morty", "Westworld"]

  
  // For loop function that generates buttons
  function buttonMaker() {
    
    // Clear out buttons
    $("#button-holder").html("");

    for (var i = 0; i < shows.length; i++) {
      var gifButton = $("<button class='gif-button'>")
      gifButton.attr("data-name", shows[i])
      gifButton.appendTo($("#button-holder"))
      gifButton.text(shows[i])
    }
  };

  // Call buttonMaker();
  buttonMaker();

  
  // Below is the onclick function for the submit button
  $("#submit-button").on("click", function() {
    event.preventDefault();

    var input =  $("input").val().trim()
    
    if (shows.indexOf(input) > -1) {
      alert("There's already a button for that!")
    }

    if (input === "") {
      alert("Please put something into the input box!")
    }

    else {
      $("input").val("")
      shows.push(input)
      buttonMaker();
    } 
  });

  // On click event for the buttons -> AJAX call
  $(document.body).on("click", ".gif-button", function(){
    
    // This first bit clears the div so that the gifs do not stack
    $("#gifs").html("")
    // variables to be used in AJAX call
    var search = "&q=" + $(this).attr("data-name")
    var apiKey = "api_key=a5d5a60f34f646a9874ac6e7b0f96b72"
    var limit = "&limit=10"
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + apiKey + search + limit

    // Actual AJAX call
    $.ajax({url: queryURL, method: "get"})
    .done(function(response) {
      console.log(response)
      
      // Results is a var we will use to save some typing of response.data everytime
      var results = response.data

      

      // Use a for loop to create content
      for (var i = 0; i < results.length; i++) {
        // Create divs
        var gifHolder = $("<div class='gif-holder'>")
        var rating = $("<h3 class='rating'>")
        var img = $("<img class='gif'>")

        // Append gifHolder to the "gifs" div and append rating and img to gifHolder
        gifHolder.appendTo($("#gifs"))
        rating.prependTo(gifHolder)
        img.appendTo(gifHolder)
        
        img.attr("src", "assets/images/stat.gif")
        // Now give the img and rating their content
        rating.text("Rating: " + results[i].rating.toUpperCase())
        img.attr("src", results[i].images.original_still.url).attr("data-still", results[i].images.original_still.url).attr("data-animate", results[i].images.original.url).attr("data-state", "still")
      };
    });
  });

  // Now we need an onclick function for the gifs to un-pause and pause
  $(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state")
    
    if (state === "still") {
      $(this).attr("src", "assets/images/static.gif")
      $(this).attr("src", $(this).attr("data-animate"))
      $(this).attr("data-state", "animate")
    }

    else {
      $(this).attr("src", "assets/images/static.gif")
      $(this).attr("src", $(this).attr("data-still"))
      $(this).attr("data-state", "still")
    }
  });
});

