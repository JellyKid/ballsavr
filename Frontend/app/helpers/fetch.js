export default function handleFetch(method, url, data) {
  var body, headers = {};
  if(data){
    if(data.tagName === 'FORM'){
      body = new FormData(data);
    } else {
      body = JSON.stringify(data);
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }
  }

  return fetch(
    url,
    {
      credentials: 'same-origin',
      method: method,
      body: body,
      headers: headers
    }
  )
  .then((res) => {
    if(res.status === 401){
      window.location.replace('/');
      throw `Unauthorized: ${method} ${url}`;
    }
    if(res.status !== 200){
      throw `${res.status} ${res.statusText}`;
    }
    return res.text();
  })
  .then(
    (text) => {
      try {
        let json = JSON.parse(text);
        return json;
      } catch (e) {        
        throw text;
      }
    }
  );
}
