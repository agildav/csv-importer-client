import { camelizeKeys, decamelizeKeys, decamelize } from "humps";

export default class FetchService {
  static errorTypes = {
    unauthorizedError: "unauthorized_error",
    routingError: "routing_error",
    argumentError: "argument_error",
    notFoundError: "not_found_error",
    parameterMissingError: "parameter_missing_error",
    forbiddenAttributeError: "forbidden_attribute_error",
    forbiddenError: "forbidden_error",
    processingError: "processing_error",
    invalidError: "invalid_error",
    notUniqueError: "not_unique_error",
    internalError: "internal_error"
  };

  static handleResponse(response) {
    if (!response) {
      throw new Error("no response from API");
    }

    if (response.status === 204) {
      return Promise.resolve();
    }

    return response
      .json()
      .catch(e => {})
      .then(data => {
        if (!response.ok) {
          if ([401].indexOf(response.status) !== -1) {
            if (!response?.url.includes("/auth/login")) {
              window.localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
              window.location.reload(true);
              return;
            }
          }

          // eslint-disable-next-line
          throw { response, data: camelizeKeys(data) };
        }

        return Promise.resolve(camelizeKeys(data));
      });
  }

  static sendRequest(url, headers, reqBody, HttpMethod) {
    if (HttpMethod.toUpperCase().includes("GET")) {
      return fetch(url, {
        method: HttpMethod,
        headers
      }).then(FetchService.handleResponse);
    } else {
      const sanitizedBody = FetchService.fixNullValues(reqBody);

      return fetch(url, {
        method: HttpMethod,
        body: JSON.stringify(decamelizeKeys(sanitizedBody)),
        headers
      }).then(FetchService.handleResponse);
    }
  }

  static sendMultiFormRequest(
    url,
    headers,
    HttpMethod = "POST",
    reqBody = {},
    reqFiles = {},
    rootBody = "data"
  ) {
    const data = new FormData();

    const sanitizedBody = FetchService.fixNullValues(reqBody);

    const body = JSON.stringify(decamelizeKeys(sanitizedBody));

    data.append(rootBody, body);

    for (const key in reqFiles) {
      if (reqFiles.hasOwnProperty(key) && reqFiles[key]) {
        data.append("file_" + decamelize(key), reqFiles[key]);
      }
    }

    return fetch(url, {
      method: HttpMethod,
      body: data,
      headers
    }).then(FetchService.handleResponse);
  }

  static fixNullValues = (reqBody = {}) => {
    for (const key in reqBody) {
      if (reqBody.hasOwnProperty(key)) {
        if ([undefined, null, ""].includes(reqBody[key])) {
          reqBody[key] = null;
        }
      }
    }

    return reqBody;
  };
}
