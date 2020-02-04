const axios = require("axios");

// https://app.sendgrid.com/guide/integrate/langs/nodejs
const { SENDGRID_API_KEY } = process.env;

module.exports.handle = async function({ city, recipient }) {
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
        Authorization: "Bearer " + SENDGRID_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
};
