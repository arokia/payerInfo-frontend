const BASE_API_URL = "http://localhost:8000/api/v1";
const PAYER_API_URL = `${BASE_API_URL}/payer`;

class PayerDataService{

 __capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

 __collectErrors = response => {
  let errors = [];

  if (response.status === 404) {
    errors.push(response.error);
    return errors;
  }

  const fields = Object.keys(response);
  fields.forEach(field => {
    const prefix = this.__capitalizeFirstLetter(field);
    response[field].forEach(message => {
      errors.push(`${prefix} ${message}`);
    });
  });
  return errors;
};

 getPayers = () => {
  let response_ok = null;
  return fetch(`${PAYER_API_URL}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(response => {
      response_ok = response.ok;
      return response.json();
    })
    .then(response => {
      if (response_ok) {
        return [false, response];
      } else {
        return [true, this.__collectErrors(response)];
      }
    });
};

 getPayer = id => {
  let response_ok = null;
  return fetch(`${PAYER_API_URL}/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      response_ok = response.ok;
      return response.json();
    })
    .then(response => {
      if (response_ok) {
        return [false, response];
      } else {
        return [true, this.__collectErrors(response)];
      }
    });
};

 savePayer = (data, id = null) => {
  let apiUrl = `${PAYER_API_URL}`;
  let apiMethod = "post";
  const body = JSON.stringify(data);

  let response_ok = null;
  return fetch(apiUrl, {
    method: apiMethod,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  })
    .then(response => {
      response_ok = response.ok;
      return response;
    })
    .then(response => {
      if (response_ok) {
        return [false, response];
      } else {
        return [true, this.__collectErrors(response)];
      }
    })
    
};
}
export default new PayerDataService()

// module.exports = {
//   savePayer: savePayer,
//   getPayer: getPayer,
//   getPayers: getPayers
// };
