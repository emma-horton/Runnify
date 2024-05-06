// import of the helper functions
import { createElement, getElement, appendChildren, createButton, createSelect, createLabelInput } from '../helperFunctions.js';


//create the registration page
const createRegistrationPage = () =>{

    //Mandatory registration form
    let registrationManDiv = createElement("div", "manDiv")
    let manForm = createElement("form")
    let userNameInput = createLabelInput(manForm, "input", "username", "Username: ", "Select your username")
    
    const userPasswordInput = createLabelInput(manForm, "password", "password", "Password :", "Enter a password")
    const userPasswordRetypeInput = createLabelInput(manForm, "password", "reEnterPassword", "Re-enter your password: ", "Confirm password")

    
    let registrationPage = getElement("registrationPage")
    appendChildren(registrationManDiv, manForm)
    appendChildren(registrationPage, registrationManDiv)

    let AgeOptions = []
    for (var i = 16; i <= 99; i++) {
        AgeOptions.push(i);
     }

    //Optional Registration Form 
    let registrationOptDiv = createElement("div", "optDiv")
    let optForm = createElement("form")
    let weightOptions = []
    for (let i = 40; i <= 150; i++) {
      weightOptions.push(i);
    }
    let weightInput = createSelect(optForm, weightOptions, "weightInput", "Select your weight (kg) ")
    let heightOptions = [];
      for (let i = 100; i <= 230; i++) {
        heightOptions.push(i);
      }
    let heightInput = createSelect(optForm, heightOptions, "heightInput","Enter your height (cm) " )
    let ageInput = createSelect(optForm, AgeOptions, "ageDropdown", "Age: ")


    let trainingGoalOptions = ["Get Fit", "5km PB", "10km PB", "Halfmarathon", "Marathon"]
    let trainingGoal = createSelect(optForm, trainingGoalOptions, "trainingGoal", "Training goals: ")

    let emojiOptions = ["🐱", "🏃‍♀️", "💪", "💙", "🍏",  "🌟", "🌸", "🎈", "🐬", "🐢", "🍓", "🥑", "🍪"];

    let emojiList = createSelect(optForm, emojiOptions, "emojiList", "Your Avatar: ")

    let registerButton = createButton("Register", "registerButton")
    let goBackButton = createButton("Go Back", "goBackButton")
    registerButton.addEventListener("click", ()=>{

      if(getElement("password").value == getElement("reEnterPassword").value){
        registerUser()
      }
      else{
        alert("Passwords are not matching!")
      } 

    })

    goBackButton.addEventListener("click", () =>{window.location.href = "../index.html"})
    appendChildren(registrationOptDiv, optForm)
    appendChildren(registrationPage,registrationOptDiv,registerButton, goBackButton)


}


// pop-ups for different scenarios
function popupok(){
  Swal.fire({
    title: 'Welcome to Runnify',
    text: 'You have successfuly signed up to Runnify. Enjoy!',
    icon: 'success',
    confirmButtonText: 'Time to go and log in',  
    backdrop:false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
}

function popup409(){
  Swal.fire({
    title: "Username Taken",
    text: 'Looks like someone already has that username. Please try again',
    icon: 'warning',
    confirmButtonText: 'Okay',
    backdrop:false,
  })
}


// takes all inputs from the registration page and sends post request to the server
const registerUser = () =>{

  // retrieve inputs
  let userName = getElement("username").value
  let userPassword = getElement("password").value
  let weightUser = getElement("weightInput").value
  let heightUser = getElement("heightInput").value
  let ageUser = getElement("ageDropdown").value
  let goalUser = getElement("trainingGoal").value
  let userEmoji = getElement("emojiList").value


  fetch("/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "userName": userName,
      "userPassword": userPassword,
      "weightUser":weightUser,
      "heightUser":heightUser,
      "ageUser": ageUser,
      "goalUser": goalUser,
      "userEmoji": userEmoji

    })
  })
  // if response is ok, user is registered
    .then(response => {
      if (response.ok) {
        popupok()
      } else if(response.status == "409") {
        // alert user if user name is already taken
        popup409()
      }
    })
    .catch(error => {
      console.error('Error', error);
    });
}


//Creates login form when page is loaded
window.onload = () => {
  createRegistrationPage();
};