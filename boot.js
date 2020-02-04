// load dependencies
const { workflow, task } = require("zenaton");

// define workflows
workflow(
  "temperatureCampaignWorkflow",
  require("./workflows/triggerEmailsWeather")
);

// define tasks
task("getCityTemparature", require("./tasks/getCityTemparature"));
task("SendWeatherCampaign", require("./tasks/sendWeitherCampaign"));
