const axios = require('axios');

async function palm(req,res){

    try {
        const q = req.body.message;
        const apiKey = 'AIzaSyDXraI13BG2fn7UE5iPO2zOCmSHRvXNQKo' ;
				const apiUrl = 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText';
if(!q){
  res.satus(400).json({error:`Invalid request message body parameter required`});
}
        const requestData = {
          prompt: {
            text: q
          }
        };

        const headers = {
          'Content-Type': 'application/json'
        };

        const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, { headers });

        const content = response.data.candidates[0].output;
        const safetyRatings = response.data.candidates[0].safetyRatings;
        res.locals.pageTitle = 'EASY API';
  console.log(content);
     
          const data = {'status':200,
                        "content":content,
                        };
        res.json(data);
      } catch (error) {
        res.status(500).json({ error:"Internal Server Error.." });
        console.log(error);
      }

}

module.exports = {palm};