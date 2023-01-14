import { PaginationView } from "./pagination.js";
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  startCar,
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
    } catch (err) {
      console.log("Can't count this.cars, I'm blind", err);
    }
  }

  async fetchCars() {
    try {
      const httpParams = new URLSearchParams();
      httpParams.append("_limit", this.pageSize);
      httpParams.append("_page", this.currentPage);
      this.cars = await getCars(httpParams);
    } catch (error) {
      console.error("Error fetching cars!", error);
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

    let carDivTop = document.createElement("div");
    carDivTop.className = "car_div__top";
    let carName = document.createElement("h3");
    carName.className = "car_name";
    carName.innerHTML = `${car.name}`;
    let carRun = document.createElement("button");
    carRun.innerHTML = '<i class="fa-solid fa-play"></i>';
    //run clicklistener
    //carRun.addEventListener("click", () => this.startCar());
    carRun.addEventListener("click", () => startCar(car));
    let carStop = document.createElement("button");
    carStop.innerHTML = '<i class="fa-solid fa-stop"></i>';
    //stopclick listener
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
    let carImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let carImgSrc = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "use"
    );
    carImgSrc.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "href",
      "../assets/img/car1.svg#car1"
    );
    carImgSrc.setAttribute("width", 150);
    carImgSrc.setAttribute("height", 150);
    carImgSrc.setAttribute("fill", `${car.color}`);
    carImg.appendChild(carImgSrc);
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
    this.init();
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

      // Add velocity and Distance to car as well
    } catch (error) {
      console.error("Error starting or stopping car engine!", error);
    }
  }

  async driveCar(car) {
    // set status of car to drive

    try {
      const httpParams = new URLSearchParams();
      httpParams.append("id", Car.id);
      httpParams.append("status", Car.status);
      const response = await driveCar(httpParams);
      console.log("Drive car " + Car.name, response);
    } catch (error) {
      console.error("The car has stopped!", error);
      // Set car status to stopped
    }
  }
}
