const axios = require("axios");

// Get your API key here: https://openweathermap.org/appid
const { OPEN_WEATHER_API_KEY } = process.env;

module.exports.handle = async function(city) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${OPEN_WEATHER_API_KEY}`
  );
  return response.data;
};
