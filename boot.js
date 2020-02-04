// load dependencies
const { workflow } = require("zenaton");

// define workflows
workflow(
  "temperatureCampaignWorkflow",
  require("./workflows/triggerEmailsWeather")
);
