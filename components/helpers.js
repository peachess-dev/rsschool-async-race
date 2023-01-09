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
  }).then((res) => res.json());
}

export async function updateCar(car) {
  return fetch(`${baseUrl}/${car.id}`, {
    method: "PUT",
    body: JSON.stringify(car),
  }).then((res) => res.json());
}

export async function deleteCar(car) {
  return fetch(`${baseUrl}/${car.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

//Start or stop engine
const engineURL = "http://127.0.0.1:3000/engine?id={id}&status={status}";

export async function startCar(httpParams) {
  let status = httpParams.status;
  status = "stopped";
  if (status === "started") {
    status = "stopped";
  } else {
    status = "started";
  }

  let url = engineURL;
  url = url.replace("{id}", httpParams.id);
  url = url.replace("{status}", status);

  return fetch(url).then(async (res) => {
    const data = await res.json();
    console.log(data);
  });
}

//Switch engine to drive mode
