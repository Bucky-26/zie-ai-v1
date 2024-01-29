const axios = require('axios');

const API_KEY = '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';
const _API_URL_ = 'https://openrouter.ai/api/v1/chat/completions';

async function mistral(req, res){
  try {
    const message = req.body.message;
    if (!message) {
      return res.status(400).json({ status: 400, message: "Invalid request. 'message' parameter required." });
    }

    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "HTTP-Referer": "https://zie-ai--v1.ea-sy.tech", // Optional, for including your app on openrouter.ai rankings.
      "X-Title": "ZIE-AI--v1", // Optional. Shows in rankings on openrouter.ai.
      "Content-Type": "application/json"
    };

    const payload = {
      "model": "mistralai/mistral-7b-instruct",
      "messages": [
        { "role": "user", "content": message }
      ]
    };

    const response = await axios.post(_API_URL_, payload, { headers });
    const data = response.data;
    const content = data.choices[0].message.content;

    const json_response = {
      model: "mistral-ai",
      content: content
    };
    res.status(200).json(json_response);
  } catch (error) {
    console.error("An error occurred:", error);

    if (error.response) {
      // The request was made, but the server responded with a status code other than 2xx
      console.error("Server responded with status code:", error.response.status);
      console.error("Response data:", error.response.data);
      res.status(error.response.status).json({ error: error.message, data: error.response.data });
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received from the server");
      res.status(500).json({ error: "No response received from the server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      res.status(500).json({ error: "Error setting up the request" });
    }
  }
};

module.exports = { mistral } ;
