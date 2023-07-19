// GARAGE API //
const baseUrl = "http://127.0.0.1:3000/garage";

export async function getCars(httpParams) {
  let url = baseUrl;
  if (httpParams) url += `?${httpParams}`;
  return fetch(url).then((res) => {
    return res.json();
  });
}

export async function createCar(car) {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error creating car: ${error}`);
      throw error;
    });
}

export async function updateCar(car) {
  return fetch(`${baseUrl}/${car.id}`, {
    method: "PATCH",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error updating car: ${error}`);
      throw error;
    });
}

export async function deleteCar(car) {
  return fetch(`${baseUrl}/${car.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error deleting car: ${error}`);
      throw error;
    });
}

// ENGINE API //
const engineURL = "http://127.0.0.1:3000/engine";

// Start or stop engine of specified car, and return it's actual velocity and distance
export async function startCar(httpParams) {
  let url = engineURL;
  if (httpParams) url += `?${httpParams}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}

// Switch engine of specified car to drive mode and finish with success message or fail with 500 error
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
