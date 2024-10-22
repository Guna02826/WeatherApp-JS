const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e8b43f6388ecdd4b149597b25c6daeb8";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.toLowerCase();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${Math.ceil(temp - 273.15)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 202:
      return "🌩️";
    case weatherId >= 202 && weatherId <= 212:
      return "⛈️";
    case weatherId === 221:
      return "🌪️";
    case weatherId >= 230 && weatherId <= 232:
      return "🌧️🌩️";

    case weatherId >= 300 && weatherId <= 301:
      return "🌦️";
    case weatherId >= 302 && weatherId <= 321:
      return "🌧️🌦️";

    case weatherId === 500:
      return "🌦️";
    case weatherId === 501:
      return "🌧️";
    case weatherId >= 502 && weatherId <= 504:
      return "🌧️🌩️";
    case weatherId === 511:
      return "🧊🌧️";
    case weatherId >= 520 && weatherId <= 531:
      return "🌧️🌫️";

    case weatherId === 600:
      return "🌨️";
    case weatherId === 601:
      return "❄️";
    case weatherId >= 602 && weatherId <= 622:
      return "❄️🌨️";

    case weatherId === 701:
      return "🌫️";
    case weatherId === 711:
      return "💨";
    case weatherId === 721:
      return "🌫️🌞";
    case weatherId === 731 || weatherId === 761:
      return "🌪️";
    case weatherId === 741:
      return "🌫️";
    case weatherId === 751:
      return "🏜️";
    case weatherId === 762:
      return "🌋";
    case weatherId === 771:
      return "🌬️";
    case weatherId === 781:
      return "🌪️🌪️";

    case weatherId === 800:
      return "☀️";
    case weatherId === 801:
      return "🌤️";
    case weatherId === 802:
      return "⛅";
    case weatherId === 803:
      return "🌥️";
    case weatherId === 804:
      return "☁️";

    default:
      return "🌈";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  console.log(errorDisplay);

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
