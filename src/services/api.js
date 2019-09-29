import urls from 'configs/urls';
import { convertObjectToQueryString } from 'utils/convert-object';
import { state } from 'react-beep';
import base64 from 'base-64'

const getHeaders = () => {
  return {
    // Accept: 'application/json',
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Basic ' + base64.encode(state.base.username + ":" + state.base.password)
  };
};

const request = async (url, options) => {
  let result;
  try {
    result = await fetch(url, {
      ...options,
      headers: getHeaders()
    });
  } catch (e) {
    console.log(e);
  }
  if (result && result.status === 401) {
    window.history.pushState({}, '', '/logout');
  } else {
    return await result;
  }
};

export const post = ({ api, model } = {}) => {
  return request(`${urls.endPointAdmin}${api}`, {
    method: 'POST',
    body: JSON.stringify(model)
  });
};

export const get = ({ api, model } = {}) => {
  const query = convertObjectToQueryString(model);
  return request(`${urls.endPointAdmin}${api}?${query}`, {
    method: 'GET'
  });
};

export const remove = ({ api, model } = {}) => {
  const query = convertObjectToQueryString(model);
  return request(`${urls.endPointAdmin}${api}?${query}`, {
    method: 'DELETE'
  });
};

//FIXME: need determine entity id
export const put = ({ api, model } = {}) => {
  const query = convertObjectToQueryString(model);
  return request(`${urls.endPointAdmin}${api}?${query}`, {
    method: 'PUT',
    body: JSON.stringify(model)
  });
};

//FIXME: need determine entity id
export const patch = ({ api, model } = {}) => {
  return request(`${urls.endPointAdmin}${api}`, {
    method: 'PATCH',
    body: JSON.stringify(model)
  });
};
