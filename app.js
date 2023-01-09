//import layout
import AppLayout from "./components/layout.js";
const layout = new AppLayout();
layout.initLayout();

//import garage view
import GarageView from "./views/garage.js";
const garageView = new GarageView();
async function displayGarage() {
  await garageView.init();
}
displayGarage();

//add a car
const addCar = document.querySelector("#addCar");
const addCarName = addCar.querySelector(".modify_car_name");
const addCarColor = addCar.querySelector(".modify_car_color");
addCar.addEventListener("click", () => {
  const car = { name: addCarName.value, color: addCarColor.value };
  garageView.addCar(car);
});

//update a car

//start race

//reset race

//generate random cars
const generateBtn = document.querySelector("#generateBtn");
generateBtn.addEventListener("click", () => {
  garageView.addRandomCars().then(() => {
    checkPrevBtnStatus();
    checkNextBtnStatus();
  });
});

//go to the next page
//it allows me to keep going to the next page even when I reached the limits of existing cars, need to fix that
const nextBtn = document.querySelector("#next_btn");
nextBtn.addEventListener("click", () => {
  garageView.nextPage();
  garageView.init();
  checkNextBtnStatus();
  checkPrevBtnStatus();
});

//go to the previous page
const prevBtn = document.querySelector("#prev_btn");
prevBtn.disabled = true;
prevBtn.addEventListener("click", () => {
  garageView.previousPage();
  garageView.init();
  checkPrevBtnStatus();
  checkNextBtnStatus();
});

function checkPrevBtnStatus() {
  if (garageView.currentPage > 1) {
    prevBtn.disabled = false;
  } else prevBtn.disabled = true;
}

function checkNextBtnStatus() {
  //const totalPages = Math.ceil(garageView.totalCars / garageView.pageSize);
  if (garageView.currentPage * garageView.pageSize >= garageView.totalCars) {
    nextBtn.disabled = true;
  } else nextBtn.disabled = false;
}
