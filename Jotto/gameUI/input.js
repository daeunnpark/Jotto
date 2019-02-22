/*const nameInput = document.querySelector("input");*/
const nameInput = document.getElementById("name");
const form = document.querySelector("form");

nameInput.addEventListener("name", () => {
  nameInput.setCustomValidity("");
  nameInput.checkValidity();
});

nameInput.addEventListener("invalid", () => {
  if (nameInput.value === "") {
    nameInput.setCustomValidity("Enter your username!");
  } else {
    nameInput.setCustomValidity(
      "Usernames can only contain upper and lowercase letters. Try again!"
    );
  }
});
