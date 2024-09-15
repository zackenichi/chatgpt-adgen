import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Constants for character limits and number of choices
const NUMBER_OF_CHOICES = 3;
const HEADLINE_CHARACTER_LIMIT = 30;
const BODY_CHARACTER_LIMIT = 90;

// Function to get the company name
const getCompanyName = async (content) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Get the company name based on the following content:

    ${content}`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 100,
    });

    const generatedChoices = completion.data.choices;
    if (generatedChoices && generatedChoices.length > 0) {
      const companyName = generatedChoices[0].message.content.trim();
      return companyName;
    } else {
      throw new Error('No company name generated');
    }
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

// Function to get the tone
const getTone = async (content) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Commonly used tones in ads:
    Humorous, Emotional, Inspirational, Informational, Aspirational, Urgent, Problem-Solving, Nostalgic, Sentimental, Whimsical, Playful and Luxurious.
    
    In one word, pick the tone that closely matches the content below:
    
    \`\`\`${content}\`\`\``;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 100,
    });

    const generatedChoices = completion.data.choices;
    if (generatedChoices && generatedChoices.length > 0) {
      const tone = generatedChoices[0].message.content.trim();
      return tone;
    } else {
      throw new Error('No tone matches');
    }
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

// Function to generate headlines
const generateHeadlines = async (content, prompt) => {
  try {
    if (!configuration.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const fullPrompt = `${prompt}
    
    \`\`\`${content}\`\`\``;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0.2,
      max_tokens: 100,
      n: NUMBER_OF_CHOICES,
    });

    const generatedChoices = completion.data.choices;
    return generatedChoices;
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    throw error;
  }
};

// Function to get HTML content
const getHtml = async (baseUrl) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SCRAPE_FUNCTION_URL}${baseUrl}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch the HTML content');
    }

    const data = await response.json(); // Get the JSON data from the response
    const siteContent = data.extractedText;

    return siteContent;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Next.js API route handler
export default async function handler(req, res) {
  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { baseUrl } = req.query;

    if (!baseUrl) {
      return res.status(400).json({ error: 'Base URL is required' });
    }

    const extractedText = await getHtml(baseUrl);
    const companyName = await getCompanyName(extractedText);
    const tone = await getTone(extractedText);

    const prompt = `You are a marketing copywriter for ${companyName}. I'd like for you to help me make some digital ads. Give me a headline and copy that sounds ${tone}. The marketing copy should capture the tone within ${BODY_CHARACTER_LIMIT} characters and the headline within ${HEADLINE_CHARACTER_LIMIT} characters. Use the following content`;

    const generatedChoices = await generateHeadlines(extractedText, prompt);

    const adContent = generatedChoices.map((choice) => {
      const text = choice.message.content.trim();

      // Extracting headline and copy from the generated text
      const [headline, copy] = text.split('Copy:');

      // Removing "Headline:" prefix and quotes from the headline
      const cleanHeadline = headline
        .replace(/^Headline:\s*/, '')
        .replace(/['"]+/g, '')
        .replace(/\n/g, '');

      // Removing quotes and \n from the copy
      const cleanCopy = copy.trim().replace(/['"]+/g, '').replace(/\n/g, '');

      // Creating an object with the extracted headline and copy
      return {
        headline: cleanHeadline,
        copy: cleanCopy,
      };
    });

    res.status(200).json(adContent);
  } catch (error) {
    console.error('Error with content generation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
