import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const numberOfChoices = 3;

export default async function handler(req, res) {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'hello ChatGPT',
      temperature: 0.6,
      max_tokens: 100,
      n: numberOfChoices,
    });

    const response = completion.data.choices;

    const chats = response.map(
      (choice, index) => `Choice ${index + 1}: ${choice.text}`
    );
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
