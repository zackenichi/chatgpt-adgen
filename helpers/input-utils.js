export function isValidUrl(url) {
  const urlPattern =
    /^(?:(?:https?):\/\/)?(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w-.\/?%&=]*)?$/i;
  return urlPattern.test(url);
}

export function sanitizeUrl(url) {
  const urlPattern = /^(?:https?:\/\/)?(?:www\.)?(.*)$/;
  const matches = url.match(urlPattern);

  if (matches && matches.length === 2) {
    const domain = matches[1];

    return domain.replace(/^www\./, '');
  }

  return url;
}

export function addHttpToUrl(url) {
  // Check if the input starts with 'http://' or 'https://'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    // If not, add 'http://' prefix
    url = 'http://' + url;
  }
  return url;
}
