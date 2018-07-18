// client-side js
// run by the browser each time your view template is loaded

$(document).ready(function() {
  
  $("#new-user").on("submit", function(e) {
    
    //e.preventDefault();
    
    var data = $("#new-user").serializeArray()[0].value;
    
    $.ajax({
      type: "POST",
      url: "/api/exercise/new-user",
      data: data
    });
    
    //return false;
    
  });
  
  $("#add-exercise").on("submit", function(e) {
  
    $.ajax({
      type: "POST",
      url: "/api/exercise/add"
    });
  
  });
  
});