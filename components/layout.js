export default class AppLayout {
  initLayout() {
    this.addContainer();
    this.addNavigation();
    this.addGarageSection();
    this.addWinnerSection();
  }

  addContainer() {
    this.container = document.createElement("div");
    this.container.className = "container";
    document.body.append(this.container);
  }

  addNavigation() {
    const navigation = document.createElement("div");
    navigation.className = "navigation";
    this.container.append(navigation);

    const garageBtn = document.createElement("button");
    garageBtn.className = "garage_title";
    garageBtn.innerHTML = "Garage";
    const winnersBtn = document.createElement("button");
    winnersBtn.className = "winners_title";
    winnersBtn.innerHTML = "Winners";

    navigation.append(garageBtn, winnersBtn);

    garageBtn.addEventListener("click", () => this.navigateToView("garage"));

    winnersBtn.addEventListener("click", () => this.navigateToView("winners"));
  }

  navigateToView(viewName) {
    const winnerSection = document.querySelector(".winners");
    const garageSection = document.querySelector(".garage");
    const garageNav = document.querySelector(".garage_title");
    const winnerNav = document.querySelector(".winners_title");

    switch (viewName) {
      case "garage":
        garageSection.classList.add("active");
        winnerSection.classList.remove("active");
        garageNav.classList.add("active");
        winnerNav.classList.remove("active");
        break;
      case "winners":
        garageSection.classList.remove("active");
        winnerSection.classList.add("active");
        garageNav.classList.remove("active");
        winnerNav.classList.add("active");
        break;
    }
  }

  addGarageSection() {
    const garage = document.createElement("div");
    garage.className = "garage";

    //garage top
    const garageTop = document.createElement("div");
    garageTop.className = "garage__top";

    //Create the garage control section
    const garageControls = document.createElement("div");
    garageControls.className = "garage__top__controls";

    const addCarDiv = document.createElement("div");
    addCarDiv.className = "modify_car";
    addCarDiv.id = "addCar";
    const addCarName = document.createElement("input");
    addCarName.className = "modify_car_name";
    const addCarColor = document.createElement("input");
    addCarColor.className = "modify_car_color";
    addCarColor.setAttribute("type", "color");
    addCarColor.value = "#F5EACD";
    const addCar = document.createElement("button");
    addCar.id = "addCarBtn";
    addCar.innerHTML = "Add car";
    addCarDiv.append(addCarName, addCarColor, addCar);
    garageControls.append(addCarDiv);

    const updateCarDiv = document.createElement("div");
    updateCarDiv.className = "modify_car disabled";
    updateCarDiv.id = "updateCar";
    const updateCarName = document.createElement("input");
    updateCarName.className = "modify_car_name";
    const updateCarColor = document.createElement("input");
    updateCarColor.className = "modify_car_color";
    updateCarColor.setAttribute("type", "color");
    updateCarColor.value = "#F5EACD";
    const updateCar = document.createElement("button");
    updateCar.id = "updateCarBtn";
    updateCar.innerHTML = "update car";
    updateCarDiv.append(updateCarName, updateCarColor, updateCar);
    garageControls.append(updateCarDiv);

    garageTop.append(garageControls);

    //create and append buttons section
    const buttons = document.createElement("div");
    buttons.className = "garage__top__buttons";

    //create 3 buttons for the buttons section
    const generateBtn = document.createElement("button");
    generateBtn.id = "generateBtn";
    generateBtn.innerHTML = "Generate Random Cars";
    const raceBtn = document.createElement("button");
    raceBtn.id = "raceBtn";
    raceBtn.innerHTML = "Start Race!";
    const resetBtn = document.createElement("button");
    resetBtn.id = "resetBtn";
    resetBtn.innerHTML = "Reset";

    // append all buttons to the button section
    buttons.append(raceBtn, resetBtn, generateBtn);
    garageTop.append(buttons);
    garage.append(garageTop);

    //create garage status section
    const garageStatus = document.createElement("div");
    garageStatus.classList = "garage_status";
    const garageStatusInfo = document.createElement("h2");
    garageStatusInfo.className = "info";
    const garageStatusPage = document.createElement("h3");
    garageStatusPage.className = "page_info";
    garageStatus.append(garageStatusInfo, garageStatusPage);
    //append garage status section
    garage.append(garageStatus);

    // create garage cars section
    const garageCars = document.createElement("div");
    garageCars.classList = "garage_cars";
    garage.append(garageCars);

    //create garage bottom section
    const garageBottom = document.createElement("div");
    garageBottom.className = "garage__bottom";
    const pageBtns = document.createElement("div");
    pageBtns.className = "page__bottom__btns";
    const prevPageBtn = document.createElement("button");
    prevPageBtn.id = "prev_btn";
    const nextPageBtn = document.createElement("button");
    nextPageBtn.id = "next_btn";
    prevPageBtn.innerHTML = "Previous";
    nextPageBtn.innerHTML = "Next";
    pageBtns.append(prevPageBtn, nextPageBtn);
    garageBottom.append(pageBtns);
    garage.append(garageBottom);

    // Append the garage section to the container
    this.container.append(garage);
  }

  addWinnerSection() {
    const winners = document.createElement("div");
    winners.className = "winners";
    this.container.append(winners);
  }
}
