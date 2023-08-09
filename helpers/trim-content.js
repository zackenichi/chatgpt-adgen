// helper function to make generated content fit within specified character limit and ensure complete sentences

const trimTextWithCompleteSentences = (text, maxCharacters) => {
  if (text.length <= maxCharacters) {
    return text;
  }
  // Find the last period before the limit
  const lastPeriodIndex = text.lastIndexOf('.', maxCharacters);

  if (lastPeriodIndex !== -1) {
    // If a period was found before the limit, trim up to that point
    return text.slice(0, lastPeriodIndex + 1); // Adding 1 to include the period
  } else {
    // If no period was found before the limit, simply trim the text to the limit
    return text.slice(0, maxCharacters);
  }
};

// Testing

// const trimmed = trimTextWithCompleteSentences(
//   'We provide experienced and caring pediatric dental care for children and families. Our knowledgeable staff is specially trained to meet the unique needs of each child. Schedule an appointment and find out why thousands of families have trusted us for over 15 years.',
//   90
// );

// console.log(trimmed);
