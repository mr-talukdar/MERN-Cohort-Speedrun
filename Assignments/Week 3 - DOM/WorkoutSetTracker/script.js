const exercise = document.querySelector("#exercise");
const weight = document.querySelector("#weight");
const reps = document.querySelector("#reps");
const workoutForm = document.querySelector("#workout-form");
const setsContainer = document.querySelector("#sets-container");

workoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newSet = document.createElement("p");
  const newSetDeleteBtn = document.createElement("button");
  newSet.id = Math.random();
  newSet.textContent =
    exercise.value + " " + weight.value + "kgs for :" + reps.value + " Reps";

  newSetDeleteBtn.textContent = "remove";

  newSetDeleteBtn.addEventListener("click", () => {
    newSet.remove();
  });

  newSetDeleteBtn.newSet.append(newSetDeleteBtn);

  setsContainer.append(newSet);
});
