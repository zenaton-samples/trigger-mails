const { duration, task } = require("zenaton");
const axios = require("axios");

// Get your API key here: https://openweathermap.org/appid
const YOUR_OPEN_WEATHER_API_KEY = "";
// https://app.sendgrid.com/guide/integrate/langs/nodejs
const YOUR_SENDGRID_API_KEY = "";

// Check the temperature of a given city every day for n days.
// When the temperature drops below minTemp for minRep then send a promotional email via Sendgrid to visit a warm weather destination
module.exports.handle = function*({ city, days, minTemp, minRep, recipient }) {
  let repCount = 0;
  do {
    //Check the temperature of the city via openweathermap API.
    const response = yield this.run.task("getCityTemparature", city);
    //If the temperature is under minTemp degrees (45 degrees fahrenheit) for at least minRep(3 days),
    if (response.main.temp < minTemp) {
      repCount++;
    } else {
      repCount = 0;
    }
    // wait one day
    yield this.wait.for(duration.days(1));
    days--;
  } while (repCount < minRep && days > 0);

  if (repCount === minRep) {
    // trigger an email campaign on sendgrid based on the weather.
    yield this.run.task("SendWeatherCampaign", {
      city,
      recipient
    });
  }
};

task("getCityTemparature", async function(city) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${YOUR_OPEN_WEATHER_API_KEY}`
  );
  return response.data;
});

task("SendWeatherCampaign", async function({ city, recipient }) {
  const body = `Hey Freezing in ${
    city.split(",")[0]
  }? It's the right time to plan vacations in Bahamas! \n`;

  await axios.post(
    "https://api.sendgrid.com/v3/mail/send",
    {
      personalizations: [{ to: [{ email: recipient }] }],
      content: [
        {
          type: "text/plain",
          value: body
        }
      ],
      subject: "50% OFF Bahamas!",
      from: { email: "zenaton-tutorial@zenaton.com" }
    },
    {
      headers: {
        Authorization: "Bearer " + YOUR_SENDGRID_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
});
