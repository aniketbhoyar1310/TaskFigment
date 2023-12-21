export const apiData = {
  method : 'GET',
  headers: {
    'X-RapidAPI-Key': '4801d70312mshcfe3f24d1e6ca2bp19179djsn79a5618fa570',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
};

export const getData = async (url,options) => {
  const datafetch = await fetch(url,options);
  const data = await datafetch.json();

  return data;
};