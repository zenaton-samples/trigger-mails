const { duration } = require("zenaton");

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
