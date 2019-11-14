# Triggering Mails After 3 Days of Cold Weather
## Context

This example shows how to create a workflow that triggers a promotional email about a tropical vacation after 3 days of cold weather. It can be useful for an agency or anyone who wants to trigger notification based on data from an external API and time factors.

## Requirements

- A [Zenaton](https://www.zenaton.com/) account, API id and API key 
- An [OpenWeatherMap](https://openweathermap.org/api) API key
- A [Mailchimp](https://www.google.com/gmail/) account

## Workflow Logic

Step by step, the workflow logic is:

- Call a weather API to get the temperature of the current day during a specific period (ie. number of days)
- If the temperature is less than 40°F for three days in a row, then send an email to users using gmail.
- If not, then keep checking everyday until the end of the time period
- If during the time period, the temperature hasn't dropped below 40°F for 3 days, then send a different promotional email.

This flowchart shows a visual representation of the workflow tasks.

![Workflow chart](/doc/images/flowchart.png)


## Going further

To make this example usable in a real-world production environment, we could:

- Use (lat, long) boxes to pinpoint users in a specific area, not a city
- Add A/B testing in the worklow to increase conversion rate

Feel free to submit a PR if you extended this example!
