$(window).load(function() {
  $("#secretWordModal").modal("show");
});

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
/*
document.querySelectorAll(".letterboard td").forEach(e =>
  e.addEventListener("mouseover", function() {
    this.style.background = "green";
  })
);

document.querySelectorAll(".letterboard td").forEach(e =>
  e.addEventListener("mouseleave", function() {
    this.style.background = "white";
  })
);

window.onload = function() {};
*/
