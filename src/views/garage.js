// DEPENDENCIES

import { PaginationView } from "./pagination.js";
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  startCar,
  driveCar,
} from "../components/helpers.js";
import { Car } from "../models/car.js";

// VIEW
export default class GarageView extends PaginationView {
  constructor() {
    super(1, 7);
    this.cars = [];
    this.totalCars = 0;
  }

  async init() {
    await this.countCars();
    await this.fetchCars();
    this.renderView();
  }

  async countCars() {
    let allCars;
    try {
      allCars = await getCars();
      this.totalCars = allCars.length;
    } catch (error) {
      console.log("Error counting cars", error);
    }
  }

  async fetchCars() {
    try {
      const httpParams = new URLSearchParams();
      httpParams.append("_limit", this.pageSize);
      httpParams.append("_page", this.currentPage);
      this.cars = await getCars(httpParams);
    } catch (error) {
      console.log("Error fetching cars!", error);
    }
  }

  renderView() {
    this.displayGarageInfo();
    this.displayCars();
  }

  async displayGarageInfo() {
    let carsInfo = document.querySelector(".info");
    carsInfo.innerHTML = `There are ${this.totalCars} cars in your garage`;
    let pageInfo = document.querySelector(".page_info");
    pageInfo.innerHTML = `You are on page ${this.currentPage}`;
  }

  displayCars() {
    this.clearCars();
    this.cars.forEach((x) => this.renderCar(x));
  }

  clearCars() {
    let displayCars = document.querySelector(".garage_cars");
    if (displayCars) displayCars.innerHTML = "";
  }

  renderCar(car) {
    let carDiv = document.createElement("div");
    carDiv.className = "car_div";
    carDiv.id = `car_${car.id}`;

    // car info
    let carDivTop = document.createElement("div");
    carDivTop.className = "car_div__top";
    let carName = document.createElement("h3");
    carName.className = "car_name";
    carName.innerHTML = `${car.name}`;

    // car control buttons
    let carStart = document.createElement("button");
    carStart.className = "car_start";
    carStart.innerHTML = '<i class="fa-solid fa-play"></i>';

    let carStop = document.createElement("button");
    carStop.className = "car_stop";
    carStop.innerHTML = '<i class="fa-solid fa-stop"></i>';

    let carUpdate = document.createElement("button");
    carUpdate.className = "car_update";
    carUpdate.innerHTML = "update";

    let carRemove = document.createElement("button");
    carRemove.className = "car_remove";
    carRemove.innerHTML = "remove";

    // car image
    let carDivBody = document.createElement("div");
    carDivBody.className = "car_div__body";
    // let carImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // let carImgSrc = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "use"
    // );
    // carImgSrc.setAttributeNS(
    //   "http://www.w3.org/1999/xlink",
    //   "href",
    //   "../assets/img/car1.svg#car1"
    // );
    // carImgSrc.setAttribute("width", 150);
    // carImgSrc.setAttribute("height", 150);
    // carImgSrc.setAttribute("fill", `${car.color}`);
    // carImg.appendChild(carImgSrc);
    let carImg = document.createElement("div");
    carImg.className = "car-img";
    carImg.innerHTML = '<i class="fa-solid fa-car-side"></i>';
    carImg.style.color = `${car.color}`;

    // wtf is this
    let carDivBottom = document.createElement("div");
    carDivBottom.className = "car_div__bottom";

    // car append to car div
    carDivTop.append(carName, carStart, carStop, carUpdate, carRemove);
    carDivBody.append(carImg);
    carDiv.append(carDivTop, carDivBody, carDivBottom);

    this.addCarEventListeners(car, carDiv);

    const displayCars = document.querySelector(".garage_cars");
    displayCars.appendChild(carDiv);
  }

  // EVENT LISTENERS

  addCarEventListeners(car, carDiv) {
    const carStart = carDiv.querySelector(".car_start");
    const carStop = carDiv.querySelector(".car_stop");
    const carUpdate = carDiv.querySelector(".car_update");
    const carRemove = carDiv.querySelector(".car_remove");

    carStart.addEventListener("click", () => {
      changeCarStatus(car, "started");
      this.startOrStopCarEngine(car);
    });

    carStop.addEventListener("click", () => {
      if (car.status !== "stopped") {
        changeCarStatus(car, "stopped");
        this.startOrStopCarEngine(car);
        stopCarAnimation(car);
      }
    });

    carUpdate.addEventListener("click", () => {
      updateCar(car);
    });

    carRemove.addEventListener("click", () => {
      this.deleteCar(car);
      carRemove.dataset.car = JSON.stringify(car);
    });
  }

  ////////////////////////////////////
  // move these to the new js file //
  //////////////////////////////////
  async addCar(car) {
    try {
      await createCar(car);
      this.init();
    } catch (err) {
      console.log("Error with createCar()", err);
    }
  }

  async updateCar(car) {
    await updateCar(car);
    this.init();
  }

  async deleteCar(car) {
    console.log("remove", car);
    await deleteCar(car);
    this.init();
  }

  async addRandomCars() {
    const newCars = this.generateRandomCars(10);
    await Promise.all(newCars.map((car) => createCar(car)));
    return this.init();
  }

  generateRandomCars(numCars) {
    const carNamesPart1 = [
      "Tesla",
      "Ford",
      "Chevrolet",
      "Toyota",
      "Honda",
      "Nissan",
      "Jeep",
      "Dodge",
      "Mazda",
      "Mercedes",
    ];
    const carNamesPart2 = [
      "Model S",
      "Mustang",
      "Corvette",
      "Camry",
      "Civic",
      "Altima",
      "Wrangler",
      "Charger",
      "MX-5",
      "E-Class",
    ];
    const carColors = [
      "Red",
      "Blue",
      "Green",
      "Silver",
      "Black",
      "White",
      "Gray",
      "Yellow",
      "Purple",
      "Orange",
    ];

    const randomCars = [];
    for (let i = 0; i < numCars; i++) {
      const name = `${
        carNamesPart1[Math.floor(Math.random() * carNamesPart1.length)]
      } ${carNamesPart2[Math.floor(Math.random() * carNamesPart2.length)]}`;
      const color = carColors[Math.floor(Math.random() * carColors.length)];
      randomCars.push({ name, color });
    }
    return randomCars;
  }

  ////////////////////////////////
  // these are for car controls //
  ////////////////////////////////

  async startCarDriving(car) {
    try {
      const httpParams = new URLSearchParams();
      httpParams.append("id", car.id);
      httpParams.append("status", car.status);
      const response = await driveCar(httpParams);
      // Set car status to stopped
      if (response.status === 500) {
        car.status = "stopped";
        console.log(car.status);
        stopCarAnimation(car);
      } else {
        car.status = "drive";
        console.log(car.status);
      }
      console.log(car.name, response);
    } catch (error) {
      console.error("Error starting car driving!", error);
    }
  }

  moveCar(car) {
    const carContainer = document.querySelector(`#car_${car.id} .car-img`);
    const carContainerWidth = carContainer.getBoundingClientRect().width;
    const carImg = carContainer.querySelector("i");
    const raceDistance = carContainerWidth;
    let startTime = null;

    function animateCar(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const carSpeed = (car.velocity * carContainerWidth) / car.distance;
      const carPosition = Math.min(carSpeed * elapsed, raceDistance);
      carImg.style.marginLeft = `${carPosition}px`;
      if (carPosition >= raceDistance) {
        return;
      }
      requestAnimationFrame(animateCar);
    }

    requestAnimationFrame(animateCar);
  }

  // stopCarAnimation(car) {
  //   const carContainer = document.querySelector(`#car_${car.id} .car-img`);
  //   const carImg = carContainer.querySelector("i");
  //   if (!startTime) startTime = timestamp;
  //   const elapsed = timestamp - startTime;
  //   const carSpeed = (car.velocity * carContainerWidth) / car.distance;
  //   const carPosition = Math.min(carSpeed * elapsed, raceDistance);

  //   // const currentMarginLeft = parseInt(carImg.style.marginLeft, carPosition);
  //   cancelAnimationFrame(car.animationRequestId);
  //   carImg.style.marginLeft = `${carPosition}px`;
  // }

  async startOrStopCarEngine(car) {
    try {
      const httpParams = new URLSearchParams();
      httpParams.append("id", car.id);
      httpParams.append("status", car.status);
      console.log(car.status);
      // Add car class with status
      const { velocity, distance } = await startCar(httpParams);
      console.log(`${car.name} velocity: ${velocity} - distance: ${distance}`);
      // Add velocity and Distance to car as well
      car.velocity = velocity;
      car.distance = distance;

      if (car.status === "stopped") {
        this.stopCarAnimation(car);
      } else {
        car.status = "drive";
        this.startCarDriving(car);
        this.moveCar(car);
      }
    } catch (error) {
      console.error("Error starting or stopping car engine!", error);
    }
  }
}

// REFACTORING THE CAR CONTROL FUNCTIONS HERE
// Function to change car status
function changeCarStatus(car, newStatus) {
  car.status = newStatus;
  if (newStatus === "drive" || newStatus === "started") {
    startCarAnimation(car);
  } else if (newStatus === "stopped") {
    stopCarAnimation(car);
  }
}

// Function to start car animation
function startCarAnimation(car) {
  const carContainer = document.querySelector(`#car_${car.id} .car-img`);
  const carContainerWidth = carContainer.getBoundingClientRect().width;
  const carImg = carContainer.querySelector("i");
  const raceDistance = carContainerWidth;
  let startTime = null;

  function animateCar(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const carSpeed = (car.velocity * carContainerWidth) / car.distance;
    const carPosition = Math.min(carSpeed * elapsed, raceDistance);
    carImg.style.marginLeft = `${carPosition}px`;
    if (carPosition >= raceDistance) {
      return;
    }
    requestAnimationFrame(animateCar);
  }
  requestAnimationFrame(animateCar);
}

// Function to stop car animation
function stopCarAnimation(car) {
  const carContainer = document.querySelector(`#car_${car.id} .car-img`);
  const carImg = carContainer.querySelector("i");
  let startTime = null;
  let carContainerWidth = carContainer.getBoundingClientRect().width;
  let raceDistance = carContainerWidth;
  let carSpeed = (car.velocity * carContainerWidth) / car.distance;
  let elapsed = 0;

  function animateCar(timestamp) {
    if (!startTime) startTime = timestamp;
    elapsed = timestamp - startTime;
    const carPosition = Math.min(carSpeed * elapsed, raceDistance);
    carImg.style.marginLeft = `${carPosition}px`;
    if (carPosition >= raceDistance) {
      return;
    }
    requestAnimationFrame(animateCar);
  }

  cancelAnimationFrame(car.animationRequestId);

  // Calculate the remaining distance the car needs to travel
  const remainingDistance = raceDistance - carSpeed * elapsed;
  carImg.style.marginLeft = `${remainingDistance}px`;
}

// Function to handle server request and update car status
async function startCarDriving(car) {
  try {
    const httpParams = new URLSearchParams();
    httpParams.append("id", car.id);
    httpParams.append("status", car.status);
    const response = await driveCar(httpParams);
    if (response.status === 200) {
      changeCarStatus(car, "drive");
    } else if (response.status === 500) {
      changeCarStatus(car, "stopped");
    }
    console.log(car.name, response);
  } catch (error) {
    console.error("Error starting car driving!", error);
  }
}
