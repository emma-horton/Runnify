// import helper functions
import { createElement, getElement, appendChildren, createButton } from '../helperFunctions.js';

//Creating html for login form  and listens for click on login button
const createLogIn = () => {

  // create Elements need for the logIn page
  let logInDiv = createElement("div", "logInDiv")
  let buttonDiv = createElement("div", "buttonDiv")
  let userNameInput = createElement("input", "userNameInput")
  userNameInput.placeholder = "Please enter Username"
  let userPassword = createElement("input", "userPassword")
  userPassword.type = "password"
  userPassword.type = "password"
  userPassword.placeholder = "Please enter Password"
  let logInButton = createButton("Log In", "loginBtn")
  let registerButton = createButton(`Don't have an account?  Sign up now`, "registerBtn")

  logInButton.addEventListener("click", ()=>{
    checkUserCredentials()
  })
  registerButton.addEventListener("click" , () =>{
    window.location.href = "/register/register.html";
  })

  appendChildren(logInDiv, userNameInput, userPassword)
  appendChildren(buttonDiv, logInButton, registerButton)
  let logInPage = getElement("LogInPage")
  appendChildren(logInPage,logInDiv, buttonDiv)
}

// pop-ups for different scenarios 
function popup401(){
  Swal.fire({
    title: 'Incorrect username or password',
    text: 'Please try again or sign up as a new user',
    icon: 'error',
    confirmButtonText: 'Okay',
    backdrop:false,
  })
}

function popup404(){
  Swal.fire({
    title: "Looks like you're new here",
    text: 'Please try again or sign up as a new user',
    icon: 'question',
    confirmButtonText: 'Okay',
    backdrop:false,
  })
}


//Function to 'check user credentials' and send to server - logic is on the server
const checkUserCredentials = () => {
  let userName = document.getElementById("userNameInput").value;
  let userPassword = document.getElementById("userPassword").value;

  fetch("/checkUserCredentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName: userName,
      userPassword: userPassword
    })
  })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          title: 'This Website Uses Cookies',
          text: 'Click okay to accept or redirect to be redirected',
          icon: 'warning',
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: 'Okay',
          denyButtonText: `Redirect`,
          backdrop:false,
      }).then((result) => {
          if (result.isConfirmed) {
              window.location.href = "/RunningFeed/cardPage.html";
          } else {
              window.location.href = "https://www.google.com";
          }
      });
      } else if (response.status === 401) { 
        console.log("Username exists but password is incorrect");
        popup401()
      } else if (response.status === 404){
        console.log("Username not found - user should register as new user");
        popup404()
      }else {
        console.log("Server Error:", response.statusText);
        alert("Server Error: " + response.statusText);
      }
    })
   
    .catch(error => {
      console.error('Error', error);
    });
};


// --------------------------------------------------------------Comment in when everything is done -------------------------------------------------

//Creates login form when page is loaded
window.onload = () => {
  
  createLogIn()
};

