// app.py - front end js
function getIDToken(token_name){
  let url = new URL(location.href)
  let this_id_token = null
  url.hash.substr(1).split('&').some(
    function(keyValueString){
      let keyValueArray = keyValueString.split('=')
      if(keyValueArray[0]==="id_token"){
        this_id_token = keyValueArray[1]
        return true
      }
    }
  )
  if (this_id_token){
    localStorage.setItem(token_name, this_id_token)
    return this_id_token
  }
  let stored_id_token = localStorage.getItem(token_name)
  // test it to see if it's valid
  if (stored_id_token) {
    return stored_id_token
  }
  return null
}

function redirect(URL, token_name){
  fetch(URL, {
    credentials: 'include',
    headers: {
      'Authorization': localStorage.getItem(token_name)
    }
  })
  .then((response) => {
    return response.text();
  })
  .then((html) => {
    document.body.innerHTML = html
  })
  .catch(err => {
    console.assert('Error Redirecting:')
    console.error(err)
  })
}
