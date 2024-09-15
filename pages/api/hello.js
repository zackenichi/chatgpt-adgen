import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// console.log('API Key:', process.env.OPENAI_API_KEY);

const numberOfChoices = 3;

export default async function handler(req, res) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            'hello ChatGPT, do you have any suggestions for me to do today?',
        },
      ], // This is the correct way to format chat input
      temperature: 0.6,
      n: numberOfChoices,
      max_tokens: 100,
    });

    const response = completion.data.choices;

    const chats = response.map(
      (choice, index) => `Choice ${index + 1}: ${choice.message.content}`
    );
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
