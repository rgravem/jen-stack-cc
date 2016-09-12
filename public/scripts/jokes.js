console.log('js sourced');
var jokes = [];
var test = {};
var jokeCount = 0;

$(document).ready(function(){

  $.ajax({
    type: "POST",
    url: "/loadJokes",
    data: test,
    success: function(data){
      console.log(data);
      jokes = data;
    }
  });

  var appendJokes = function(){
    console.log('in appendJokes');
    for (var i = 0; i < jokes.length; i++) {
      $('#outputDiv').append('<p>Author: ' + jokes[i].whoseJoke + '<br>Set up: ' + jokes[i].jokeQuestion + '<br>Punch Line: ' + jokes[i].punchLine );
    }
  }; // end appendJokes

  $('#viewAll').on('click', function(){
    appendJokes();
  });

  $('#submit').on('click', function(){
    console.log('in on click');
    var author = $('#author').val();
    var setUp = $('#setUp').val();
    var punchLine = $('#punchLine').val();

    var objectToSend = {
      author: author,
      setup: setUp,
      punchLine: punchLine,
    };
    var sendObject = function(){
      console.log('in send object');
    $.ajax({
      type: "POST",
      url: "/addJoke",
      data: objectToSend,
      success: function(data){
        console.log(data);
        jokes = data;
      } // end success
    }); // end ajax call
  };
  sendObject();
  }); // end on click

  $('#oneByOne').on('click', function(){
    $('#outputDiv').empty();
    $('#outputDiv').append('<p>Author: ' + jokes[jokeCount].whoseJoke + '<br>Set up: ' + jokes[jokeCount].jokeQuestion + '<p>Click joke to reveal punch line!');
  }); // end oneByOne

  $('#outputDiv').on('click', function(){
    console.log('in reveal on click');
    $('#outputDiv').append('<p><br>Punch Line: ' + jokes[jokeCount].punchLine + '</p>');
    $('#outputDiv').append('<p>click One at a time button for next joke!');
    jokeCount++;
    if (jokeCount >= jokes.length) {
      alert('Out of jokes! Submit more jokes!');
      jokeCount = 0;
    }

  });
}); // end document ready
