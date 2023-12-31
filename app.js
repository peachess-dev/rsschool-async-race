//import layout
import AppLayout from "./src/components/layout.js";
const layout = new AppLayout();
layout.initLayout();

//import garage view
import GarageView from "./src/views/garage.js";
const garageView = new GarageView();
async function displayGarage() {
  await garageView.init();
}
displayGarage();

//add a car
const addCar = document.getElementById("addCar");
const addCarName = addCar.querySelector(".modify_car_name");
const addCarColor = addCar.querySelector(".modify_car_color");
const addCarBtn = document.getElementById("addCarBtn");
addCarBtn.addEventListener("click", () => {
  const car = { name: addCarName.value, color: addCarColor.value };
  garageView.addCar(car);
});

//update a car

//start race

//reset race

//generate random cars
const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", () => {
  garageView.addRandomCars().then(() => {
    checkPrevBtnStatus();
    checkNextBtnStatus();
  });
});

//go to the next page
const nextBtn = document.getElementById("next_btn");
nextBtn.addEventListener("click", async () => {
  garageView.nextPage();
  await garageView.init();
  checkNextBtnStatus();
  checkPrevBtnStatus();
});

//go to the previous page
const prevBtn = document.getElementById("prev_btn");
prevBtn.disabled = true;
prevBtn.addEventListener("click", async () => {
  garageView.previousPage();
  await garageView.init();
  checkPrevBtnStatus();
  checkNextBtnStatus();
});

function checkPrevBtnStatus() {
  if (garageView.currentPage > 1) {
    prevBtn.disabled = false;
  } else prevBtn.disabled = true;
}

function checkNextBtnStatus() {
  const totalPages = Math.ceil(garageView.totalCars / garageView.pageSize);
  if (garageView.currentPage < totalPages) {
    nextBtn.disabled = false;
  } else nextBtn.disabled = true;
}
