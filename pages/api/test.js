export default async function handler(req, res) {
  try {
    const message = process.env.TEST;

    res.status(200).json({ message: message });
  } catch (error) {
    //   console.error('Error with OpenAI API request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
