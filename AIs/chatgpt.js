const axios = require('axios');


async function chat(req,res){
    const q = req.body.message;
    if(!q){
        return res.status(400),json({status:400,message:"Invalid Request message body parameter required"});
    }
    var options = {
        method: "POST",
        url: "https://chat.oaifree.com/backend-api/conversation",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.5.1",
          "X-Authorization":
            "Bearer lJ1es8rPG_YetKk77G17O0vlDUPfGAXFn__HckAD0tM",
          Cookie:
            "_Secure-next-auth.apps-origin=https://chat.oaifree.com; google-analytics_v4_PnTc__ga4sid=1563106130; google-analytics_v4_PnTc__session_counter=1; google-analytics_v4_PnTc__ga4=32e8a6bb-59e7-4c08-b552-f3e2feb305f1; cf_chl_3=22e504c37e87f86; cf_clearance=HYIEkBpsV.7orPHM6b650op5btLL79uGMrvMlX71LyA-1705610588-1-AYQmD7/UWhmwp3uIiJiGdhHUq77MxWJaMG234C9YksXiGeuCUN94cg7k9ij09hUXwpM6Q73CzFa0BYoy7dxvIhI=; _Secure-next-auth.session-id=Ay3DE3ib4g5dGgiBD6hzWbf3HWWRFpI2LO8ji9jlAk0; google-analytics_v4_PnTc__engagementDuration=0; google-analytics_v4_PnTc__engagementStart=1705610604864; google-analytics_v4_PnTc__counter=5; google-analytics_v4_PnTc__let=1705610604864; _Secure-next-auth.session-data=MTcwNTYxMDYwNHwzUFpCaVYwdTJDYWdUT2JhZjBrZHUtcm9ZaFpudUpFeVhtcHE5MlpaQlVOYWEwRVdQYTM1N242RTFfTHV4Q0FNUUpRczhtenJkY1JMa0dOZ085anFEVEZtM0Y3STZRMWx8V06hu86R1AzLYy2D0FyyWpBt0WS3o7JAa5TSGVBkoQM=; _dd_s=rum=0&expire=1705611516326",
        },
        data: {
          action: "next",
          messages: [
            {
              id: "aaa28538-8a7d-4b2b-b813-40c26a6b72d0",
              author: { role: "user" },
              content: {
                content_type: "text",
                parts: [q],
              },
              metadata: {},
            },
          ],
          parent_message_id: "aaa1cae6-a010-48ab-85c1-3984ae23b830",
          model: "text-davinci-002-render-sha",
          timezone_offset_min: -480,
          suggestions: [
            "Tell me a random fun fact about the Roman Empire",
            "Write a short-and-sweet text message inviting my neighbor to a barbecue.",
            "Can you suggest fun activities for a family of 4 to do indoors on a rainy day?",
            "Show me a code snippet of a website's sticky header in CSS and JavaScript.",
          ],
          history_and_training_disabled: false,
          arkose_token: null,
          conversation_mode: { kind: "primary_assistant" },
          force_paragen: false,
          force_rate_limit: false,
        },
      };

      var validResponses = [];

      await axios.request(options).then(function (response) {
          const responses = response.data;

          const splitResponses = responses.split("\n\n");

          splitResponses.forEach((response) => {
            if (response.includes("DONE")) {
              console.log("Stream complete");
            } else {
              try {
                const data = JSON.parse(response.replace("data: ", ""));

                if (data && data.message && data.message.content && data.message.content.parts) {
                  const content = data.message.content.parts[0];
              
                  if (content.trim() !== "") {
                    validResponses.push(content);
                  }
                } else {
               
                }
              } catch (error) {}
            }
          });
          const l = validResponses.length;
          const content = validResponses[l - 1];
          res.json({ content });
        }).catch(function (error) {
          console.error(error);
        });
}

async function hackergpt(req, res) {
    const q = req.body.message;
  
    async function token() {
      const options = {
        method: "POST",
        url: "https://securetoken.googleapis.com/v1/token",
        params: { key: "AIzaSyCQ8QlvMtQvpnj_7sfEIE8-YorcFOGlHCo" },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "insomnia/8.5.1",
          Referer: "https://www.hackergpt.co/",
        },
        data: {
          grant_type: "refresh_token",
          refresh_token:
            "AMf-vByoxp1FeqmDXZnBFg2Y_qnwC6UzHRjhrrxWHlJ8Oty5YXl7kwIL5KaqOyJi6M_wP0cySDzgMgk6gvYOVH_veI5Adv_oNaPkxq4YJBANF6y0sSy7-7ll54E-GoIa3i-Q27IHtUxllRIoHluyugbJoeLDSgZ5QfAaFcvcDKRCAfFrPxXD-weIZTBPeE8NJOi0hwoJY4GnLS3vAqdRFbVZS_YGaCyihXA4kVBrIoazqChoWfW1HljCDFDGYtDtkrWqPNG1H-16uysNNvwU1gNPh4rKUzIUZdgDBPD32HTMxnu05KNQeqEOn4qujx2acTnYtMymWFItpjw5nJAAo7D4luKEzcX6sJDTXGgSeBCFHMo56CIrQT1OprSHzuI5GSwv2t4ib4-Y2K9ld-aXErprPMKGxbgdIUBowoYw7JCKBXDF2g3_KLhEEYtrv1u_CHOLK76tx2OB-sx692Qyg2Vca6KxDO_sPA",
        },
      };
  
      try {
        const response = await axios.request(options);
        const accessToken = response.data.access_token;
        return accessToken;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async function hackergptApi(query, accessToken) {
      const options = {
        method: 'POST',
        url: 'https://www.hackergpt.co/api/chat',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/8.5.1',
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          model: 'gpt-3.5-turbo-instruct',
          messages: [{ role: 'user', content: query }],
          toolId: 'enhancedsearch',
        },
      };
  
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    try {
      const accessToken = await token();
      const result = await hackergptApi(q, accessToken);
      res.json({ content: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
module.exports ={chat,hackergpt};