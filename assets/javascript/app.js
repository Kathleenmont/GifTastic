
var apiKey = "1hdR2KkNdeLTsHrQQ5j2WhHb0nmSLCXH";
var topics = ["The Office", "Sharp Objects", "Mad Men", "Pen15", "Broad City", "Drag Race", "British Bake Off", "Handmaid's Tail", "Insecure", "Parks and Recreation", "Mind Hunter", "chewing Gum"]
var gifCount = 10;

// render function that makes buttons and refreshes the DOM
function rendor() {
    $("#button-area").html("");
    $("#search-bar").val("");


    // makes show buttons
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button class='show-button btn btn-info m-2'>").text(topics[i]);
        button.attr("data-topic", topics[i]);
        $("#button-area").append(button);
    }
}

// on click event for creating new button from search input
$("#add-show").on("click", function (event) {
    
    event.preventDefault();
    
    newShow = $("#search-bar").val().trim();

    topics.push(newShow);

    rendor();

});

// main function makes ajax for images and logic for stoping and starting images
function getAJAX() {

    // clears display so buttons dont repeat
    $("#display-area").html("");


    var show = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1hdR2KkNdeLTsHrQQ5j2WhHb0nmSLCXH&q=" + show + "&limit=10&offset=0&rating=PG-13";


    // api call fucntion 
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'json'
    }).then(function (response) {

        


        // loop to print out ratings and images from ajax call
        for (var j = 0; j < gifCount; j++) {

            // div to put image and rating into
            var gifDiv = $("<div>");
            gifDiv.addClass("gif-area").attr("id", j);
            $("#display-area").append(gifDiv);


            // inital/still image
            var gifURLInitial = response.data[j].images.fixed_height_still.url;
            var gifInitial = $("<img>").attr("src", gifURLInitial).addClass("gif").attr("data-status", "still").attr("data-value", j);
            $("#" + j).append(gifInitial);
            var state = $(".gif").attr("data-status");


            // rating
            var rating = response.data[j].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            $("#" + j).append(ratingText);

            // title
            var title = response.data[j].title;
            var titleText = $("<p>").text(title).addClass("title");
            $("#" + j).append(titleText);
            


            
            // funciton to animage and stop animation on gif
            function animate() {
                $(this).html("");
                // variables needed to set animate/still
                var arrayIndex = $(this).attr("data-value");
                var gifURLAnimate = response.data[arrayIndex].images.fixed_height.url;
                var gifURLStill = response.data[arrayIndex].images.fixed_height_still.url;

                // logic for still state- when click sets to animate
                if (state === "still") {

                    $(this).attr("src", gifURLAnimate);
                    $(this).attr("data-status", "animated");
                    state = $(this).attr("data-status");


                    // logic for animate state when clicked sets to still 
                } else if (state === "animated") {

                    $(this).attr("src", gifURLStill);
                    $(this).attr("data-status", "still");
                    state = $(this).attr("data-status");
                }
            }
        }
        // on click event that calls the animate funciton
        $(document).on("click", ".gif", animate);

    
    });
}
// initial loading of buttons
rendor();

// on click event that calls the getAjax main funciton
$(document).on("click", ".show-button", getAJAX);








