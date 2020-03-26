'use strict';
//USER SELECTS TYPE OF WORKOUT
const workoutTypeSelect = document.querySelector(`#type`);
//IS IT CARDIO?
const cardioForm = document.querySelector(`.cardio-form`);
//IS IT RESISTANCE?
const resistanceForm = document.querySelector(`.resistance-form`);
//NAME OF CARDIO IF CARDIO
const cardioNameInput = document.querySelector(`#cardio-name`);
//NAME OF EXERCISE TYPE
const nameInput = document.querySelector(`#name`);
//IF WEIGHT
const weightInput = document.querySelector(`#weight`);
//HOW MANY SETS
const setsInput = document.querySelector(`#sets`);
//HOW MANY REPS
const repsInput = document.querySelector(`#reps`);
//FOR HOW LONG
const durationInput = document.querySelector(`#duration`);
//HOW LONG DID THEY RESIST FOR
const resistanceDurationInput = document.querySelector(`#resistance-duration`);
//HOW FAR DID THEY GO
const distanceInput = document.querySelector(`#distance`);
//DONE!
const completeButton = document.querySelector(`button.complete`);
//ADD IT IN
const addButton = document.querySelector(`button.add-another`);
//IDK WHAT TOAST HAS TO DO WITH ANYTHING
const toast = document.querySelector(`#toast`);
//DEFINE WORKOUT TYPE AS A VARIABLE THAT CAN CHANGE
let workoutType = null;
//IDK WHAT THIS MEANS
let shouldNavigateAway = false;
//INITIALIZE EXERCISE SEQUENCE
async function initExercise() {
  //DEFINE WORKOUT AS A VARIABLE THAT CAN CHANGE
  let workout;
//CREATE A WORKOUT
  if (location.search.split(`=`)[1] === undefined) {
    workout = await API.createWorkout();
    console.log(workout);
  }
  if (workout) {
    location.search = `?id=${ workout._id}`;
  }

}
//CALLBACK FUNCTION
initExercise();
//CHANGE WORKOUT TYPE FUNCTION
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === `cardio`) {
    cardioForm.classList.remove(`d-none`);
    resistanceForm.classList.add(`d-none`);
  } else if (workoutType === `resistance`) {
    resistanceForm.classList.remove(`d-none`);
    cardioForm.classList.add(`d-none`);
  } else {
    cardioForm.classList.add(`d-none`);
    resistanceForm.classList.add(`d-none`);
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (workoutType === `resistance`) {
    if (nameInput.value.trim() === ``) {
      isValid = false;
    }

    if (weightInput.value.trim() === ``) {
      isValid = false;
    }

    if (setsInput.value.trim() === ``) {
      isValid = false;
    }

    if (repsInput.value.trim() === ``) {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === ``) {
      isValid = false;
    }
  } else if (workoutType === `cardio`) {
    if (cardioNameInput.value.trim() === ``) {
      isValid = false;
    }

    if (durationInput.value.trim() === ``) {
      isValid = false;
    }

    if (distanceInput.value.trim() === ``) {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute(`disabled`);
    addButton.removeAttribute(`disabled`);
  } else {
    completeButton.setAttribute(`disabled`, true);
    addButton.setAttribute(`disabled`, true);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const workoutData = {};

  if (workoutType === `cardio`) {
    workoutData.type = `cardio`;
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === `resistance`) {
    workoutData.type = `resistance`;
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add(`success`);
}

function handleToastAnimationEnd() {
  toast.removeAttribute(`class`);
  if (shouldNavigateAway) {
    location.href = `/`;
  }
}

function clearInputs() {
  cardioNameInput.value = ``;
  nameInput.value = ``;
  setsInput.value = ``;
  distanceInput.value = ``;
  durationInput.value = ``;
  repsInput.value = ``;
  resistanceDurationInput.value = ``;
  weightInput.value = ``;
}

if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener(`change`, handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener(`click`, event => {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener(`click`, handleFormSubmit);
}
toast.addEventListener(`animationend`, handleToastAnimationEnd);

document
  .querySelectorAll(`input`)
  .forEach(element => element.addEventListener(`input`, validateInputs));
