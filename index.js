// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
  if (!state) {
    displayError("State code cannot be empty");
    return;
  }

  return fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network failure");
      }
      return response.json();
    })
    .then(data => {
      displayAlerts(data);
      clearError();
    })
    .catch(error => {
      displayError(error.message);
    });
}

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  const ul = document.createElement("ul");

  data.features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);

  stateInput.value = "";
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(state)) {
    displayError("Invalid state code");
    return;
  }

  fetchWeatherAlerts(state);
});

module.exports = {
  fetchWeatherAlerts,
  displayAlerts,
  displayError,
  clearError
};
