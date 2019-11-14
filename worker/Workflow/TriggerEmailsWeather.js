const { workflow, duration } = require(‘zenaton’)

// Check the temperature of a given city every day for n days.
// When the temperature drops below minTemp for minRep then send a promotional email via Maichimp
// to visit a warm weather destination. Otherwise send a regular email campaign.
module.exports = workflow('TemperatureCampaignWorkflow', {
 *handle(days, minTemp, minRep, city, emailRecipients) {
 
   // You can get your connectors id here: https://app.zenaton.com/connectors
   const openweathermap = this.connector('openweathermap', 'your-connector-id')
   const mailchimp = this.connector('mailchimp', 'your-connector-id')
   
   let repCount = 0
   do {
     //Check the temperature of Paris via openweathermap API.
     response = yield openweathermap.get(`/weather?q=${city}&units=imperial`)
     //If the temperature is under minTemp degrees (42 degrees fahrenheit) for at least minRep(3 days),
     if (response.main.temp < minTemp) {
       repCount++
     } else {
       repCount = 0
     }
     //wait one day
     yield this.wait.for(duration.days(1));
     days--
   } while (repCount < minRep && days > 0)
   
   //trigger an email campaign on mailchimp based on the weather.
   if (repCount === minRep) {
     yield mailchimp.post(`/campaigns/campaign_${city}_hot/actions/send`)
   } else {
     yield mailchimp.post(`/campaigns/campaign_${city}_cold/actions/send`)
   }
}})