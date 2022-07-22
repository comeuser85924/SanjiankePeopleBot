function generateQueryString(data) {
   const params = [];
   for (const d in data)
      params.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return  params.join('&');
}