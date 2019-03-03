// Global variables start
//for history
var currentUserName = "";
var time;
var userWord = "";
var computerWord = "";
var userGuessList = [];
var userCorrectCountList = [];
var computerGuessList = [];
var computerCorrectCountList = [];
var winner = "";

var numUserGuess = 0;
// Global variables end

/* attach a submit handler to the form */
$("#inputform2").submit(function (event) {

  var url = "/guess"; // the script where you handle the form input.

  $.ajax({
    type: "POST",
    url: url,
    data: $("#inputform2").serialize(), // serializes the form's elements.
    success: function (data) {
      alert(data); // show response from the php script.
    }
  });
  /*document.getElementById(letter_1).innerHTML = "";*/

  return false; // avoid to execute the actual submit of the form.
});

document.getElementById("submitbtn2").addEventListener("click",function () {
  table = document.getElementById("userGuessTable");
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  var char1 = document.getElementById("letter_1").textContent;

  var char2 = document.getElementById("letter_2").textContent;

  var char3 = document.getElementById("letter_3").textContent;

  var char4 = document.getElementById("letter_4").textContent;

  var char5 = document.getElementById("letter_5").textContent;

  var myguess = char1 + char2 + char3 + char4 + char5;


  cell1.innerHTML = "1";  //numUserGuess;
  cell2.innerHTML = myguess;  //userGuess;
  cell3.innerHTML = "2";  //count;
  //user_guess();
});

$(window).load(function() {
  $("#secretWordModal").modal("show");
  /*
  var table = document.getElementById("wordtable1");
  table.rows[0].cells[0].innerHTML = "T";
  */
});

/*
$(document).ready(function() {
  var isshow = localStorage.getItem("isshow");
  if (isshow == null) {
    localStorage.setItem("isshow", 1);

    // Show popup here
    $("#secretWordModal").show();
  }
});
*/
document.querySelectorAll(".letterboard td").forEach(e =>
  e.addEventListener("click", function() {
    if (this.style.backgroundColor == "green") {
      this.style.backgroundColor = "red";
    } else if (this.style.backgroundColor == "red") {
      this.style.backgroundColor = "white";
    } else if (this.style.backgroundColor == "white") {
      this.style.backgroundColor = "green";
    } else {
      // first click
      this.style.backgroundColor = "green";
    }
    color_code(this.textContent.trim(), this.style.backgroundColor);
  })
);

function color_code(letter, color) {
  var table = document.getElementById("userGuessTable");
  for (var r = 1, n = table.rows.length; r < n; r++) {
    // skip header
    str = table.rows[r].cells[1].innerHTML;
    /*
window.alert(
"this is = " +
  table.rows[r].cells[1].innerHTML +
  "letter is " +
  letter
);
*/
    if (str.includes(letter)) {
      /*
                        window.alert(
                          str + "contains " + letter + " " + str.charAt(0)
                        );
*/
      for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === letter) {
          table.rows[r].cells[1].innerHTML =
            str.substring(0, i) +
            '<span style="background-color:' +
            color +
            '">' +
            str.charAt(i) +
            "</span>" +
            str.substring(i + 1);
        }
      }
    }
    //break;
  }
}

function user_guess() {
  var user_table = document.getElementById("user_table");

  var div = document.createElement("div");

  var char1 = document.getElementById("letter_1").textContent;

  var char2 = document.getElementById("letter_2").textContent;

  var char3 = document.getElementById("letter_3").textContent;

  var char4 = document.getElementById("letter_4").textContent;

  var char5 = document.getElementById("letter_5").textContent;

  var myguess = char1 + char2 + char3 + char4 + char5;

  //need to keep incrementing this var
  var guessnumber = 1;

  //update based on user's secret word
  var letters_correct = 2;

  div.innerHTML =
    "<tr><td>" +
    guessnumber +
    "</td><td>" +
    myguess +
    "</td><td>" +
    letters_correct +
    "</td></tr>";
}
