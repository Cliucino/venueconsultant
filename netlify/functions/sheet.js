exports.handler = async function(event) {
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw3QI3qkDb6dDoqTCx8-fXsbE64pAz67h1eZQgRNyhcFEIG6Udz4johaF7FbuA_3Pfg/exec';
  
  const params = event.queryStringParameters || {};
  const qs = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
  const url = SHEET_URL + '?' + qs;
  
  try {
    const response = await fetch(url);
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
