import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// set number of choices to get here
const numberOfChoices = 3;

const getSiteContent = async (baseUrl) => {
  const response = await axios.post(
    `https://scrapecontent-cvvtxzln5a-uc.a.run.app?baseUrl=${baseUrl}`
  );

  const siteContent = response.data.extractedText;

  return siteContent;
};

const generateHeadlines = async (content, prompt) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const fullPrompt = `${prompt}
                    
                    ${content}
                    `;

    // console.log(fullPrompt);

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: fullPrompt,
      temperature: 0.6,
      max_tokens: 100,
      n: numberOfChoices,
    });

    // Process the completion response here
    const generatedChoices = completion.data.choices;
    return generatedChoices;
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    const { baseUrl } = req.query;

    const extractedText = await getSiteContent(baseUrl);

    // test only
    const prompt = `You are a marketing copywriter. I'd like for you to help me make some digital ads. Give me a headline and copy with given the following content`;

    const generatedChoices = await generateHeadlines(extractedText, prompt);

    res.status(200).json(generatedChoices);
  } catch (error) {
    console.error('Error with content generation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
