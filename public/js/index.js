$(document).ready(function () {
  //post to favorites
  $(".far").on("click", function () {

    $(this).attr("class", "fa fa-heart")
    console.log("clicked")
    var articleID = $(this).attr("id");
    //comments

    $.ajax({
      method: "POST",
      url: "/fav",
      data: {
        articleID: articleID
      }
    })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //view favorites
  $("#favoritesLink").on("click", function (){
    console.log("go into favorites")
    $.ajax({
      method: "GET",
      url: "/fav",
    })
    .then(function(data) {
      console.log(data);
    })
  })
})