$(document).ready(function () {
  $("form.login").on("submit", function(event) {
    event.preventDefault();
    var username = $("#loginID").val()
    console.log(username)
  })
  $("form.signup").on("submit", function(event) {
    console.log("test")
    event.preventDefault();
    var username = document.getElementById("signupID").value
    console.log(username)
    $.post("/user",{
      username: username
    })
    .then(function (data){
      console.log("user added");
      console.log(data)
    })
    .catch(function (err){
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    })
  })
})


