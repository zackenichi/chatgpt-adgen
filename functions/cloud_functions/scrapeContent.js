import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { onRequest } from 'firebase-functions/v2/https';

const getHtml = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch the URL');
    }

    const html = await response.text(); // Get the HTML content from the response
    const $ = cheerio.load(html);
    const divs = [];
    const extractedContent = new Set(); // Track extracted content to avoid duplicates

    $('div:not(footer *)').each((index, element) => {
      // Exclude elements inside the <footer> tag
      $(element)
        .find('h1, h2, h3, h4, p')
        .each((_index, el) => {
          const elementType = $(el).prop('tagName').toLowerCase();
          const content = $(el).text().trim().replace(/\s+/g, ' ');

          // Check if content is already extracted
          if (!extractedContent.has(content)) {
            divs.push({ type: elementType, content });
            extractedContent.add(content);
          }
        });
    });

    const extractedText = divs.map((div) => div.content).join('\n');
    return extractedText;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

export const scrapeContent = onRequest(async (req, res) => {
  // Set CORS headers to allow cross-origin requests
  res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Methods', '*');
  // res.set('Access-Control-Allow-Methods', 'GET');

  try {
    const { baseUrl } = req.query;
    const extractedText = await getHtml(baseUrl);
    res.status(200).json({ extractedText });
  } catch (error) {
    console.error('Error with web scraping:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
