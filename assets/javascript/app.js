// Create an array of dog breeds
var dogBreedArr = [
  "Boxer", 
  "Cavalier Spaniel", 
  "Puggle", 
  "Chihuaha", 
  "Laborador", 
  "Pit Bull", 
  "Great Dane", 
  "Siberian Husky", 
  "Blue Heeler"
];

// Dynamically create buttons from array
// Function for displaying movie data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#dogBtnBox").empty();

  // Looping through the array of dogBreedsArr
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

//Add click event listener to all buttons
$(document).on("click", ".dogBreed", function() {
  // Grab and store the data-breed property from the buttons
  var dog = $(this).attr("data-breed");
  // Construct a queryURL using the dog name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      dog + "&api_key=DmiWe4jPGJ3gDvH3mFCDQ0Mnhnn5jtTW&limit=10";
  // Perform an AJAX request with queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);
      console.log(response);
      // Store the data from the AJAX request in a results variable
      var results = response.data;

      // Loop through each result item
      for (var i = 0; i < results.length; i++) {
        // Store div tag 
        var dogDiv = $("<div>");

        // Create a paragraph tag with the gif rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Create and store img tag
        var dogImage = $("<img>");
        // Set the src attribute of the image to a property pulled off the result item
        dogImage.attr("src", results[i].images.fixed_height_.url);

        // Append the paragraph and image tag to the dogDiv
        dogDiv.append(p);
        dogDiv.append(animalImage);

        // Append the dogDiv to the HTML page in the #dogGif div
        $("#dogGifsBox").append(dogDiv);
      }
    });
});

renderButtons();