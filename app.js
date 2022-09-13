import {token} from './token.js';

document
  .querySelector('button')
  .addEventListener('click', function () {
    fetchShortenedUrl();
  });

const fetchShortenedUrl = async () => {
  const url = document.querySelector('input').value;
  const outputUrl = document.getElementById('output__url');
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    try {
      const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ long_url: url, domain: 'bit.ly' })
        });
      const data = await response.json();
      if (data.link) {
        outputUrl.innerHTML = data.link;
      } else {
        outputUrl.innerHTML = data.message;
      }
    } catch (err) {
      console.log("ERROR: ", err);
    };
  } else {
    document.querySelector('input').value = 'https://' + url;
    fetchShortenedUrl();
  };
};
