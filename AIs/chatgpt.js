const axios = require('axios');

async function  deletemessage(id){
  var options = {
    method: "PATCH",
    url: "https://chat.oaifree.com/backend-api/conversation/" + id,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.5.1",
      "X-Authorization": "Bearer oEfET3WA-75vsDFuRzE1L6E4qBPCfg9UCIrorg39Npc",
      Cookie:
        "_Secure-next-auth.apps-origin=https://chat.oaifree.com; google-analytics_v4_PnTc__ga4=823fd194-64ea-434b-a90c-ad0e5a504244; _Secure-next-auth.session-id=hS34E72AJuDr4eGIyNVMNg80Y6Ie9VQGzexUPreF6ws; google-analytics_v4_PnTc__ga4sid=1749964907; google-analytics_v4_PnTc__session_counter=5; cf_clearance=grTuciuoS0mH1TmXm5MSmSwAfsEMRFMD1DNqge5k1zE-1706525536-1-AXsVxS7MGDzHWbElJCdOyZFKnDlAeUvC1Ac9L4xuaUh46E7zuhEQveuNnMV3ZNuXqlxvgaRZixWjCDqh/FMuY00=; google-analytics_v4_PnTc__engagementDuration=0; _Secure-next-auth.session-data=MTcwNjUyNjIyNXxPOWY1cWd2VWsycS0xcVFQMUxkOTdlVTJ2bnhvV2RTVHRENTJHaEhrbmtzd3p3cS11RzlxRnlRYjNjUnpoQndBRHpnWG5MMlJ5bWdacVBnRnFNTnJGSHdyOUJWSzhBMmR8MigLGbXylhgZ6a1l2nr3lg7mpKTAwQVD3PUU0O0DL0U=; google-analytics_v4_PnTc__engagementStart=1706526338152; google-analytics_v4_PnTc__counter=52; google-analytics_v4_PnTc__let=1706526338152; _dd_s=rum=0&expire=1706527254990    ",
    },
    data: { is_visible: false },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
async function chat(req,res){
    const q = req.body.message;
    if(!q){
        return res.status(400),json({status:400,message:"Invalid Request message body parameter required"});
    }
  var options = {
  method: 'POST',
  url: 'https://chat.oaifree.com/backend-api/conversation',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Cookie: '_Secure-next-auth.apps-origin=https://chat.oaifree.com; google-analytics_v4_PnTc__ga4=823fd194-64ea-434b-a90c-ad0e5a504244; _Secure-next-auth.session-id=hS34E72AJuDr4eGIyNVMNg80Y6Ie9VQGzexUPreF6ws; google-analytics_v4_PnTc__engagementDuration=0; google-analytics_v4_PnTc__counter=29; google-analytics_v4_PnTc__ga4sid=1749964907; google-analytics_v4_PnTc__session_counter=5; google-analytics_v4_PnTc__let=1706525535628; _Secure-next-auth.session-data=MTcwNjUyNTUzNXwwWHVXMkV0YUlMOXJfV21rZzZBYncwajh0UDJ2UXZaTmd1YmNubTNTcXhPUnFDcWkzbTRQaHFmUEFEdzBBMFlVVUgxMmNHSjdtZTIxXzc1NEsydUZ4RDhZSWwzZFkwOGp8xK6rSlPwsQhgw2H-brsRs_UtNDGO0mRF0vHGhEEOwqI=; cf_clearance=grTuciuoS0mH1TmXm5MSmSwAfsEMRFMD1DNqge5k1zE-1706525536-1-AXsVxS7MGDzHWbElJCdOyZFKnDlAeUvC1Ac9L4xuaUh46E7zuhEQveuNnMV3ZNuXqlxvgaRZixWjCDqh/FMuY00=; google-analytics_v4_PnTc__engagementStart=1706525550431; _dd_s=rum=0&expire=1706526463590',
    'X-Authorization': 'Bearer oEfET3WA-75vsDFuRzE1L6E4qBPCfg9UCIrorg39Npc'
  },
  data: {
    action: 'next',
    messages: [
      {
        id: 'aaa2f1fb-b0aa-4e78-91dc-8b25726741c0',
        author: {role: 'user'},
        content: {content_type: 'text', parts: [q]},
        metadata: {}
      }
    ],
    parent_message_id: 'aaa1a4c7-3ba7-40ab-9dd7-da68fe4e798e',
    model: 'text-davinci-002-render-sha',
    timezone_offset_min: -480,
    suggestions: [
      'I\'m going to cook for my date who claims to be a picky eater. Can you recommend me a dish that\'s easy to cook?',
      'Compare storytelling techniques in novels and in films in a concise table across different aspects',
      'Plan a 3-day trip to see the northern lights in Norway. Also recommend any ideal dates.',
      'Give me 3 ideas about how to plan good New Years resolutions. Give me some that are personal, family, and professionally-oriented.'
    ],
    history_and_training_disabled: false,
    arkose_token: null,
    conversation_mode: {kind: 'primary_assistant'},
    force_paragen: false,
    force_rate_limit: false
  }
};

      var validResponses = [];
var id;

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
              const iid = data.conversation_id;
              id = iid; 
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
                  deletemessage(id);

        }).catch(function (error) {
          console.error(error);
        });
}

////////HackerGPT
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
  
  
  
 async function gogpt(req, res) {
  const { message } = req.body;

  const handleDecodeToken = (token, isSuggest = "") => {
    try {
      const modifiedString = token.slice(0xa, -0x14);
      const finalToken = Buffer.from(modifiedString, 'base64').toString('utf-8');
      return finalToken; // Return the decoded token
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error; // Rethrow the error
    }
  };

  const fetchData = async () => {
    const options = {
      method: 'POST',
      url: 'https://gptgo.ai/get_token.php',
      headers: {
        'Cookie': '_ga=GA1.1.687864986.1705627051; FCNEC=%5B%5B%22AKsRol8bDZBrlv9Nim2etr1Yok_ku5fQDoUXxYXYQTBCQvuqOp4Fn9ez6Mko97OASe4DD9Qw-m1QwUQLJxX4NNVUXkczwlE756LmSXtOXxKF2Dsbwy9pOuFQ2SaKPU4aL-Kng_qJvjXGGoJSNmlulF-BXFoM4DIaag%3D%3D%22%5D%5D; cf_clearance=Ni9SZctWMWACBMHuGklwkcm5ztqxGWJwjD.yUP2iHnM-1706134771-1-AXnAWHvKuIMTVbDDk+2oHMjgznvDkcnG7i8x0u+cHjZms7SXMmm21CDvTTVqOj8cK5KeXqO6vgi0LvXAgqKEC6k=; _ga_79DKXDR85G=GS1.1.1706134761.2.1.1706134780.0.0.0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'insomnia/8.5.1',
        'Origin': 'https://gptgo.ai'
      },
      data:'ask='+message
    };

    try {
      const response = await axios.request(options);
      const decodedToken = handleDecodeToken(response.data, "");
      return decodedToken;
    } catch (error) {
      console.error("Error making request:", error);
      throw error; // Rethrow the error
    }
  };

  try {
    const token = await fetchData();
    const options = {
      method: 'GET',
      url: 'https://api.gptgo.ai/web.php',
      params: { array_chat: token },
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' }
    };

    axios.request(options)
      .then(function (response) {
        const streamResponse = response.data;
        const contentList = streamResponse.match(/"content":"(.*?)"/g) || [];

        // Remove special characters and join the content
        const cleanedContent = contentList
          .map((content) =>
            content.match(/"content":"(.*?)"/)[1].replace(/[^A-Za-z0-9\s:/./]+/g, ""),
          )
          .join("");
        const replacedContent = cleanedContent.replace(/nGPTGO/g, '#GPTGO');

        console.log(cleanedContent);
 res.status(200).json({content:replacedContent});
      })
      .catch(function (error) {
        console.error(error);
      });

  } catch (error) {
    console.error("Error:", error);
  }
}
  async function gpt4(req,res){
        const { message } = req.body;
      var options = {
	method: 'POST',
	url: 'https://gpt4free.io/wp-json/mwai-ui/v1/chats/submit',
	headers: {
		'Content-Type': 'application/json',
		'User-Agent': 'insomnia/8.6.0',
		Cookie: 'sbjs_migrations=1418474375998%3D1; sbjs_current_add=fd%3D2024-01-27%2013%3A45%3A15%7C%7C%7Cep%3Dhttps%3A%2F%2Fgpt4free.io%2Freverse-proxy-api%2F%7C%7C%7Crf%3Dhttps%3A%2F%2Fwww.google.com%2F; sbjs_first_add=fd%3D2024-01-27%2013%3A45%3A15%7C%7C%7Cep%3Dhttps%3A%2F%2Fgpt4free.io%2Freverse-proxy-api%2F%7C%7C%7Crf%3Dhttps%3A%2F%2Fwww.google.com%2F; sbjs_current=typ%3Dorganic%7C%7C%7Csrc%3Dgoogle%7C%7C%7Cmdm%3Dorganic%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29%7C%7C%7Cid%3D%28none%29; sbjs_first=typ%3Dorganic%7C%7C%7Csrc%3Dgoogle%7C%7C%7Cmdm%3Dorganic%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29%7C%7C%7Cid%3D%28none%29; sbjs_udata=vst%3D1%7C%7C%7Cuip%3D%28none%29%7C%7C%7Cuag%3DMozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F121.0.0.0%20Safari%2F537.36; ezoadgid_529392=-1; ezoref_529392=google.com; ezosuibasgeneris-1=89a0756c-679a-405a-4241-b648b89c6b4e; ezoab_529392=mod203; lp_529392=https://gpt4free.io/reverse-proxy-api/; ezovuuid_529392=aad1f1ed-3aa8-406f-6881-787f19750312; cookieyes-consent=consentid:VUY0OVBMU2R1R1hiQTE5aGxNU1ZNaU10ZHlvQTRnUUI,consent:no,action:,necessary:yes,functional:no,analytics:no,performance:no,advertisement:no; sbjs_session=pgs%3D2%7C%7C%7Ccpg%3Dhttps%3A%2F%2Fgpt4free.io%2Fchat%2F; active_template::529392=pub_site.1706363115; ezovuuidtime_529392=1706363117; ezopvc_529392=2; ezds=ffid%3D1%2Cw%3D1026%2Ch%3D751; ezohw=w%3D1024%2Ch%3D747',
		'X-Wp-Nonce': '45e21d3b46'
	},
	data: {
		botId: 'default',
		customId: null,
		session: 'N/A',
		chatId: 'yaideee0gd',
		contextId: 1581,
		messages: [
			{
				id: '9x2imj9poma',
				role: 'assistant',
				content: 'How can I help you today?',
				who: 'AI: ',
				timestamp: 1706363126039
			}
		],
		newMessage: message,
		newImageId: null,
		stream: false
	}
};

axios.request(options).then(function (response) {
 const data = response.data;
 const content = data.reply;
 res.status(200).json({content:content});
    
}).catch(function (error) {
	console.error(error);
});
  }
  
  
module.exports ={chat,hackergpt,gogpt,gpt4};