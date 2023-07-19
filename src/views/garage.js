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

export default class GarageView extends PaginationView {
  constructor() {
    super(1, 7);
    this.cars = [];
    this.totalCars = 0;
  }

  async init() {
    await this.countCars();
    await this.fetchCars();
    await this.renderView();
  }

  renderView() {
    this.displayGarageInfo();
    this.displayCars();
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

    let carDivTop = document.createElement("div");
    carDivTop.className = "car_div__top";
    let carName = document.createElement("h3");
    carName.className = "car_name";
    carName.innerHTML = `${car.name}`;

    let carRun = document.createElement("button");
    carRun.innerHTML = '<i class="fa-solid fa-play"></i>';
    carRun.addEventListener("click", () => {
      car.status = "started";
      this.startOrStopCarEngine(car);
    });

    let carStop = document.createElement("button");
    carStop.innerHTML = '<i class="fa-solid fa-stop"></i>';
    carStop.addEventListener("click", () => {
      car.status = "stopped";
      this.startOrStopCarEngine(car);
    });

    //FIX IT
    let carUpdate = document.createElement("button");
    carUpdate.className = "car_update";
    carUpdate.innerHTML = "update";
    carUpdate.addEventListener("click", () => this.updateCar(car));

    let carRemove = document.createElement("button");
    carRemove.className = "car_remove";
    carRemove.innerHTML = "remove";
    carRemove.addEventListener("click", () => this.deleteCar(car));
    carDivTop.append(carName, carRun, carStop, carUpdate, carRemove);

    carRemove.dataset.car = JSON.stringify(car);

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
    carDivBody.append(carImg);

    let carDivBottom = document.createElement("div");
    carDivBottom.className = "car_div__bottom";

    carDiv.append(carDivTop, carDivBody, carDivBottom);
    const displayCars = document.querySelector(".garage_cars");
    displayCars.appendChild(carDiv);
  }

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

  async startOrStopCarEngine(car) {
    try {
      const httpParams = new URLSearchParams();
      httpParams.append("id", car.id);
      httpParams.append("status", car.status);
      // Add car class with status
      const { velocity, distance } = await startCar(httpParams);
      console.log(`${car.name} velocity: ${velocity} - distance: ${distance}`);
      // Add velocity and Distance to car as well
      car.velocity = velocity;
      car.distance = distance;
      this.startCarDriving(car);
      if (car.status !== "stopped") {
        this.moveCar(car);
      }
    } catch (error) {
      console.error("Error starting or stopping car engine!", error);
    }
  }

  async startCarDriving(car) {
    // Set car status to drive
    car.status = "drive";
    try {
      const httpParams = new URLSearchParams();
      httpParams.append("id", car.id);
      httpParams.append("status", car.status);
      const response = await driveCar(httpParams);
      // Set car status to stopped
      if (response.status === 500) {
        car.status = "stopped";
        console.error("The car has stopped!", error);
      }
      console.log("Drive car " + car.name, response);
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
    // let carPosition = 0;
    // let carPositionId = setInterval(() => {
    //   if (carPosition >= raceDistance) {
    //     return clearInterval(carPositionId);
    //   } else {
    //     carPosition += carSpeed;
    //     carImg.style.marginLeft = `${carPosition}px`;
    //   }
    // }, 1);
    // return carPositionId;
  }
}

// function changeCarStatus( {
//   //if start pressed status = started
//   // if server response 200 status = drive
//   //if server response 500 or stop pressed status = stopped
// })

// function startCarDrive() {
//   // changeCarStatus();
//   // moveCar()
// }

// function handleCarStatus() {
// // if status is started call the startCarDrive()
// // if status is drive do nothing else
// // if status stopped stop the function startCarDrive() ??
// }
