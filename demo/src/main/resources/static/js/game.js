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

//for gameplay
var numUserGuess = 0;
var numComGuess = 0;

/*var fullArray = []; changed to dictArray*/
var currentArray = [];
var firstTimePlaying = 1;

//for legal_words.txt
var dictArray = [];
var word_list_URL =
  "https://raw.githubusercontent.com/daeunnpark/daeunnpark.github.io/master/legal_words.txt";

// Global variables end

$(window).load(function() {
  $("#secretWordModal").modal("show");
});

/* Load txt file from web and store it in array Not working with local file */
$(document).ready(function() {
  $.get(word_list_URL, function(response) {
    /*alert("Word list is loaded");*/
    var word_list = response;
    dictArray = word_list.split("\n");
    userWord = random(dictArray).toUpperCase();
    currentArray = dictArray;
  });
});

$("#inputform").submit(function(e) {
  e.preventDefault();
  var value = document.getElementById("secret_word").value;
  if (is_valid(value)) {
    computerWord = value;
    set_secret_word(computerWord);
    $("#secretWordModal").modal("hide");
  }
  return false;
});

function set_secret_word(str) {
  // User chooses computer's secret word
  document.getElementById("comp_letter_1").value = str.charAt(0);
  document.getElementById("comp_letter_2").value = str.charAt(1);
  document.getElementById("comp_letter_3").value = str.charAt(2);
  document.getElementById("comp_letter_4").value = str.charAt(3);
  document.getElementById("comp_letter_5").value = str.charAt(4);

  document.getElementById("user_letter_1").value = "?";
  document.getElementById("user_letter_2").value = "?";
  document.getElementById("user_letter_3").value = "?";
  document.getElementById("user_letter_4").value = "?";
  document.getElementById("user_letter_5").value = "?";
}

$("#inputform2").submit(function(event) {
  var url = "/guess"; // the script where you handle the form input.

  $.ajax({
    type: "POST",
    url: url,
    data: $("#inputform2").serialize(), // serializes the form's elements.
    success: function(data) {
      alert("HERE" + data); // show response from the php script.
    }
  });
  /*document.getElementById(letter_1).innerHTML = "";*/

  return false; // avoid to execute the actual submit of the form.
});

document.getElementById("inputform2").addEventListener("submit", function() {
  user_guess();
  computerGuess(currentArray);
});

/*
document.getElementById("submitbtn2").addEventListener("submit", function() {
  alert("submitted");
  user_guess();
  computerGuess(currentArray);
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

/* event handler helper function start */
function is_valid(guess) {
  if (dictArray.includes(guess)) {
    /*alert("List contains this word : " + guess);*/
    // Reset input field
    document.getElementById("letter_1").value = "";
    document.getElementById("letter_2").value = "";
    document.getElementById("letter_3").value = "";
    document.getElementById("letter_4").value = "";
    document.getElementById("letter_5").value = "";

    return true;
  } else {
    // Reset input field
    document.getElementById("letter_1").value = "";
    document.getElementById("letter_2").value = "";
    document.getElementById("letter_3").value = "";
    document.getElementById("letter_4").value = "";
    document.getElementById("letter_5").value = "";

    alert("Not a know word: " + guess);
  }
  return false;
}

function color_code(letter, color) {
  var table = document.getElementById("userTable");
  // skip header
  for (var r = 1, n = table.rows.length; r < n; r++) {
    str = table.rows[r].cells[1].innerHTML;

    // replaceAll
    var find = letter;
    var re = new RegExp(find, "g");

    if (str.includes(letter)) {
      table.rows[r].cells[1].innerHTML = str.replace(
        re,
        '<span style="background-color:' + color + '">' + letter + "</span>"
      );
    }
  }
}
/* event handler helper function end */

function user_guess() {
  var table = document.getElementById("userGuessTable");
  var char1 = document.getElementById("letter_1").value;
  var char2 = document.getElementById("letter_2").value;
  var char3 = document.getElementById("letter_3").value;
  var char4 = document.getElementById("letter_4").value;
  var char5 = document.getElementById("letter_5").value;

  if (
    !(
      char1 === "" ||
      char2 === "" ||
      char3 === "" ||
      char4 === "" ||
      char5 === ""
    )
  ) {

    var myGuess = (char1 + char2 + char3 + char4 + char5).toUpperCase();

    numUserGuess++;
    userGuessList.push(myGuess);
    var count1 = count(myGuess, userWord);
    userCorrectCountList.push(count1);
    printGuess(table, numUserGuess, myGuess, count1);
    checkGuess(myGuess, userWord, "user");
  }
}
/* User function end */

/* Computer function start */
function computerInit() {
  userWord = random(dictArray);
  currentArray = dictArray;
}

function computerGuess(current_array) {
  numComGuess++;
  var guess = random(current_array);
  computerGuessList.push(guess);
  var count1 = count(guess, computerWord);
  computerCorrectCountList.push(count);
  var table = document.getElementById("computerGuessTable");
  printGuess(table, numComGuess, guess, count1);
  checkGuess(guess, computerWord, "computer");
  currentArray = refine_array(guess, count1, current_array);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function count(word1, word2) {
  var charArr1 = word1.split("");
  var charArr2 = word2.split("");
  var i;
  var count1 = 0;
  for (i = 0; i < charArr1.length; i++) {
    if (charArr2.includes(charArr1[i])) {
      count1++;
    }
  }
  return count1;
}

function refine_array(word, count1, array) {
  var temp = [];
  var i;
  for (i = 0; i < array.length; i++) {
    if (count(word, array[i]) == count1) {
      temp.push(array[i]);
    }
  }
  return temp;
}

function printGuess(table, numGuess, guess, count) {
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = numGuess;
  cell2.innerHTML = guess.toUpperCase();
  cell3.innerHTML = count;
}

function checkGuess(guess, word, player) {
  if (guess === word) {
    winner = player;
    saveHistory();
    popUpWinner();
  }
}

function saveHistory() {
  //SEND GAME DATAS
  $.ajax({
    type: "POST",

    url: "/game/saveGame",

    data:
      "player1=" +
      currentUserName +
      "&winner=" +
      winner +
      "&userword=" +
      userWord +
      "&computerWord=" +
      computerWord,
    success: function(response) {
      alert(response);
    },
    error: function(e) {
      alert("Error: " + e);
    }
  });

  //SEND ALL THE DATAS FOR USERS
  for (let k = 0; k < userGuessList.length; k++) {
    var Log = {
      logID: 0,
      username: currentUserName,
      game_ID: 0,
      date: "TobeAdded",
      word: userGuessList[k],
      letterCount: userCorrectCountList[k]
    };
    var data = JSON.stringify(Log);
    $.ajax({
      type: "POST",

      url: "/log/saveGameLog",

      contentType: "application/json; charset=utf-8",

      dataType: "json",

      data: "logData=" + data,
      success: function(response) {
        alert(response);
      },
      error: function(e) {
        alert("Error: " + e);
      }
    });
  }

  //SEND ALL THE LOGS FOR COMPUTERS
  for (let l = 0; l < userGuessList.length; l++) {
    var Log = {
      logID: 0,
      username: "Computer",
      game_ID: 0,
      date: "TobeAdded",
      word: computerGuessList[l],
      letterCount: userCorrectCountList[l]
    };
    var data = JSON.stringify(Log);
    $.ajax({
      type: "POST",

      url: "/log/saveGameLog",

      contentType: "application/json; charset=utf-8",

      dataType: "json",

      data: "logData=" + data,

      success: function(response) {
        alert(response);
      },
      error: function(e) {
        alert("Error: " + e);
      }
    });
  }
}

function popUpWinner() {
  alert("Winner is " + winner+ ", userword = " + userWord);

  //pop up winner window
  //end the game
}
/* Computer function end */
