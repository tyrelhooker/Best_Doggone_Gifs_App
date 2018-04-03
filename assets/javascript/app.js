var dogBreedArr = [
  "boxer", 
  "cavalier spaniel", 
  "puggle", 
  "chihuahua", 
  "labrador", 
  "pit bull", 
  "great dane", 
  "siberian husky", 
  "beagle"
];

// Dynamically creates buttons from array
function renderButtons() {
  // Deleting the buttons prior to adding new buttons
  $("#dogBtnBox").empty();
  // Loops through dogBreedsArr to produce btns
  for (var i = 0; i < dogBreedArr.length; i++) {
    // Then dynamicaly generating buttons for each dog in the array.
    var dogButton = $("<button>");
    // Adding a class
    dogButton.addClass("dogBreed");
    // Adding a data-attribute with a value of the dog at index i
    dogButton.attr("data-breed", dogBreedArr[i]);
    // Providing the button's text with a value of the dog at index i
    dogButton.text(dogBreedArr[i]);
    // Adding the button to the HTML
    $("#dogBtnBox").append(dogButton);
  }
}

// Adds click event listener to all rendered buttons
$(document).on("click", ".dogBreed", function() {
  // Clear Gifs Box on button click
  $('#dogGifsBox').empty();
  // Grabs the data-breed property from the buttons, removes spaces, adds dog reference to further limit search to dogs in giphy and adds + to concatentate str in url. 
  var dog = $(this).attr("data-breed").split(' ').join('+') + ("+dog");
  // Construct a queryURL using the dog name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      dog + "&api_key=DmiWe4jPGJ3gDvH3mFCDQ0Mnhnn5jtTW&limit=10";
  
  // Performs an AJAX request with queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      // Stores data from the AJAX request in a results variable
      var results = response.data; 
      // Loops through each result item
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r") {
          var originalURL = results[i].images.fixed_height_still.url;
          var stillImage = results[i].images.fixed_height_still.url;
          var animatedGif = results[i].images.fixed_height.url;
          // Store div tag 
          var dogDiv = $("<div class='dogDiv'>");
          // Creates a paragraph tag with the gif rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creates and store img tag
          var dogImage = $("<img class='gif'>");
          dogImage.attr("src", originalURL);
          dogImage.attr("data-still", stillImage);
          dogImage.attr("data-animate", animatedGif)
          dogImage.attr("data-state", "still");

        // Appends the paragraph and image tag to the dogDiv
          dogDiv.append(dogImage);
          dogDiv.append(p);
          console.log("dogImage" + dogImage);

        // Appends the dogDiv to the HTML page in the #dogGif div
          $("#dogGifsBox").append(dogDiv);
        }
      }
    });
});

$("#addDogBreed").on("click", function(event) {
  $("#duplicateBtn").hide();
  // Prevents form from trying to submit itself
  event.preventDefault();
  // Grabs user text from input box
  var newDogBreed = $("#dogBreedInput").val().trim().toLowerCase();
  // Checks to see if user input is in dogBreedArr
  if (dogBreedArr.indexOf(newDogBreed) === -1) { 
    // Adds user input dog breed to the global dogBreedArr
    dogBreedArr.push(newDogBreed);
    // re-renders the dogBreedArr buttons to page
    renderButtons();
    // clears user input box
    $("#dogBreedInput").val(" ");
    // Shows the hidden error box if breed is already shown
    } else {
      $("#duplicateBtn").show();
      $("#dogBreedInput").val(" ");
    }
});

// Function that starts/stops the gif img when user clicks img
$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// On page load
$("#duplicateBtn").hide();
renderButtons();