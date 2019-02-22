const nameInput = document.getElementById("name");
/*Now working only with first input field */
/* not working with byClassName */

nameInput.addEventListener("input", () => {
  nameInput.setCustomValidity("");
  nameInput.checkValidity();
});

nameInput.addEventListener("invalid", () => {
  if (nameInput.value === "") {
    nameInput.setCustomValidity("Enter your guess.");
  } else {
    nameInput.setCustomValidity("Your guess can only contain letters.");
  }
});
