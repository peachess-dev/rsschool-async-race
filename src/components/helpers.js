// GARAGE API //
const baseUrl = "http://127.0.0.1:3000/garage";

export async function getCars(httpParams) {
  let url = baseUrl;
  if (httpParams) url += `?${httpParams}`;
  return fetch(url).then((res) => {
    return res.json();
  });
}

// Add a new car
export async function createCar(car) {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  }).then((res) => res.json());
}

// Update car
export async function updateCar(car) {
  return fetch(`${baseUrl}/${car.id}`, {
    method: "PUT",
    body: JSON.stringify(car),
  }).then((res) => res.json());
}

// Delete car
export async function deleteCar(car) {
  return fetch(`${baseUrl}/${car.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

// ENGINE API //
const engineURL = "http://127.0.0.1:3000/engine";

// Starts or stops engine of specified car, and returns it's actual velocity and distance.
export async function startCar(httpParams) {
  let url = engineURL;
  if (httpParams) url += `?${httpParams}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
}

// Switches engine of specified car to drive mode and finishes with success message or fails with 500 error.
export async function driveCar(httpParams) {
  let url = engineURL;
  if (httpParams) url += `?${httpParams}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error(`Error starting car: ${error}`);
      throw error;
    });
}
