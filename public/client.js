// client-side js
// run by the browser each time your view template is loaded

$(document).ready(function() {
  
  $("#new-user").on("submit", function() {
    
    var item = $('#new-user input');
    var data = item.val();
    
    //var data = $("#new-user").serializeArray()[0].value;

    $.ajax({
      type: 'POST',
      url: '/api/exercise/new-user',
      data: data,
      dataType: "text",
      success: function(data) {console.log("success!");},
      error: function(err) {console.log(err);}
    });
    
    return false;
    
  });
  
  $("#add-exercise").on("submit", function(e) {
  
    $.ajax({
      type: "POST",
      url: "/api/exercise/add"
    });
  
  });
  
});