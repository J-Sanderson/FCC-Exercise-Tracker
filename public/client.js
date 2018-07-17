// client-side js
// run by the browser each time your view template is loaded

$(document).ready(function() {
  
  $("#new-user").on("submit", function() {
    
    $.ajax({
      type: "POST",
      url: "/api/exercise/new-user"
    });
    
  });
  
  $("#add-exercise").on("submit", function() {
  
    $.ajax({
      type: "POST",
      url: "/api/exercise/add"
    });
  
  });
  
});