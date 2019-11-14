  
const run = require("./client").run;

const parameters = {
    days: 30,
    min_temp: 45,
    min_rep: 3,
    city: 'Paris,FR',
    email_recipients: 'hey@zenaton.com',
};
run.workflow("TemperatureCampaignWorkflow", parameters);