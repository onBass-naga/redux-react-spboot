import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import fetch from 'isomorphic-fetch';
import request from 'superagent';

const API_ROOT = 'http://localhost:8080/api/';


function _fetch(url) {
  return fetch(url)
      .then(response =>
          response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (response.ok) {
          return Promise.resolve(json);
        } else {
          return Promise.reject(json);
        }
      });
}

function _delete(url) {
  return new Promise((resolve, reject) => {
    request
        .del(url)
        .end((error, response) => {
          if (response.ok) {
            resolve(response.body);
          } else {
            reject(error.response.body);
          }
        });
  });
}

function _post(url, requestBody) {
  return new Promise((resolve, reject) => {
    request
        .post(url)
        .send(requestBody)
        .set('Content-Type', 'application/json;charset=UTF-8')
        .end((error, response) => {
          if (response.ok) {
            resolve(response.body);
          } else {
            reject(error.response.body);
          }
        });
  });
}

function _put(url, requestBody) {
  return new Promise((resolve, reject) => {
    request
        .put(url)
        .send(requestBody)
        .set('Content-Type', 'application/json;charset=UTF-8')
        .end((error, response) => {
          if (response.ok) {
            resolve(response.body);
          } else {
            reject(error.response.body);
          }
        });
  });
}

export const API_METHOD = {
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  DELETE: 'delete',
  UNDEFINED: ''
};

// APIにアクセスする処理
export function callApi(endpoint, method, requestBody) {

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
      ? API_ROOT + endpoint : endpoint;

  switch(method) {
    case API_METHOD.GET:
      return _fetch(fullUrl);
    case API_METHOD.POST:
      return _post(fullUrl, requestBody);
    case API_METHOD.PUT:
      return _put(fullUrl, requestBody);
    case API_METHOD.DELETE:
      return _delete(fullUrl);
  }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

export default store => next => action => {

  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));
  const apiMethod =
        /^LOAD_/.test(requestType)? API_METHOD.GET
      : /^ADD_/.test(requestType)? API_METHOD.POST
      : /^EDIT_/.test(requestType)? API_METHOD.PUT
      : /^DELETE_/.test(requestType)? API_METHOD.DELETE
      : API_METHOD.UNDEFINED;

  if (apiMethod === API_METHOD.UNDEFINED) {
    throw Error(`apiMethod is undefined: ${requestType}`);
  }

  const requestBody = action.requestBody;

  return callApi(endpoint, apiMethod, requestBody).then(
    response => next(actionWith({
      type: successType,
      id: action.id,
      response
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
