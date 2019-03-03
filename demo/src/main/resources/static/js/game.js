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
  });
});

function is_valid(guess) {
  if (dictArray.includes(guess)) {
    alert("List contains this word : " + guess);
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

    alert("List doesn't contain this word : " + guess);
  }
  return false;
}

/* attach a submit handler to the form */
$("#inputform2").submit(function(event) {
  var url = "/guess"; // the script where you handle the form input.

  $.ajax({
    type: "POST",
    url: url,
    data: $("#inputform2").serialize(), // serializes the form's elements.
    success: function(data) {
      alert(data); // show response from the php script.
    }
  });
  /*document.getElementById(letter_1).innerHTML = "";*/

  return false; // avoid to execute the actual submit of the form.
});

document.getElementById("submitbtn2").addEventListener("click", function() {
  table = document.getElementById("userGuessTable");
  user_guess(table);
  computerGuess(table, currentArray);
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

/* User function start */
function user_guess(table){
  var char1 = document.getElementById("letter_1").value;
  var char2 = document.getElementById("letter_2").value;
  var char3 = document.getElementById("letter_3").value;
  var char4 = document.getElementById("letter_4").value;
  var char5 = document.getElementById("letter_5").value;

  if(!(char1 === "" || char2 === "" || char3 === "" || char4 === "" || char5 === "")){
    var myGuess = char1 + char2 + char3 + char4 + char5;

    numUserGuess++;
    userGuessList.push(myGuess);
    var count = count(myGuess,userWord);
    userCorrectCountList.push = count;
    printGuess(table,numUserGuess,myGuess,count);
    checkGuess(myGuess, userWord, "user");
  }
}

/* User function end */


/* Computer function start */

function computerInit(){
  computerWord = random(dictArray);
  currentArray = dictArray;
}

function computerGuess(table, current_array){
  numComGuess++;
  var guess = random(current_array);
  computerGuessList.push(guess);
  var count = count(guess,computerWord);
  computerCorrectCountList.push = count;
  printGuess(table,numComGuess,guess,count);
  checkGuess(guess, computerWord, "computer");
  currentArray = refine_array(computerWord, count, current_array);
}

function random(arr){
  return arr[Math.random()*arr.length];
}

function count(word1, word2){
  var chaArr1 = word1.split('');
  var chaArr2 = word2.split('');
  var i;
  var count = 0;
  for(i=0; i<chaArr1.length; i++){
    if(chaArr2.includes(chaArr1[i])){
      count++;
    }
  }
  return count;
}

function refine_array(word, count, array){
  var temp = [];
  var i;
  for(i=0; i<array.length; i++){
    if(count(word,array[i]) == count){
      temp.push(array[i]);
    }
  }
  return temp;
}

function printGuess(table, numGuess, guess, count){
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = numGuess;
  cell2.innerHTML = guess;
  cell3.innerHTML = count;
}

function checkGuess(guess, word, player){
  if(guess === word){
    winner = player;
    saveHistory();
    popUpWinner();
  }
}

function saveHistory(){
  //send the game result to DB
}

function popUpWinner(){
  //pop up winner window
  //end the game
}

/* Computer function end */
