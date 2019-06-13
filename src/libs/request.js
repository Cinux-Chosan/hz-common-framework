import { fetch } from "whatwg-fetch";
import { getCookie } from "./utils";

import { TIME_OUT } from "../consts/common";

/**
 *
 * @param {boolean} [withToken=true] 是否携带 token
 * @returns
 */
function getRequestHeaders(
  withToken = window.hzConfig && window.hzConfig.withToken
) {
  let headers = null;
  const userCode = 'admin' || getCookie("usercode");
  const userName = 'admin' || getCookie("username");
  const userToken = '63c38c32-845a-4c86-b266-ee590c041fb4' || getCookie("usertoken");
  const user = escape(escape(`usercode:${userCode}&username:${userName}`));
  if (withToken) {
    headers = {
      Authorization: `bearer ${userToken}`,
      "us-app": escape(escape("source:基础架构&version:1.0.0.1")),
      User: user
    };
  } else {
    headers = {
      Authorization: user,
      "us-app": escape(escape("source:基础架构&version:1.0.0.1"))
    };
  }
  return headers;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const headers = getRequestHeaders();
const defaultOptions = {
  credentials: "include",
  method: "GET"
};

export default function request(url, options) {
  let { infraApiOrigin: origin } = window.hzConfig;
  if (url.indexOf("http") > -1) {
    origin = "";
  }

  const urlAddress = `${origin}${url}`;

  // 防止IE下请求有缓存，给url后家随机参数
  const resUrl =
    urlAddress.indexOf("?") > -1
      ? `${urlAddress}&number=${Math.random()}`
      : `${urlAddress}?number=${Math.random()}`;

  const opts = options;

  if (opts) {
    delete opts.origin;
  }

  // const newOptions = { ...defaultOptions, ...options };
  const newOptions = {
    ...defaultOptions,
    ...opts,
    headers
  };

  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE" ||
    newOptions.method === "PATCH"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };

      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "*/*",
        ...newOptions.headers
      };
    }
  }

  return Promise.race([
    fetch(resUrl, newOptions),
    new Promise((resolve, reject) => {
      // 请求超时时间可动态传入
      setTimeout(
        () =>
          reject({
            error_code: -1,
            error: -1,
            message: "请求超时"
          }),
        newOptions.timeout || TIME_OUT
      );
    })
  ])
    .then(response => {
      if (response.status === 204) {
        return response.text();
      }
      if (newOptions.noJson) {
        return response;
      }
      if (response.status >= 200 && response.status < 300) {
        if (newOptions.method === "DELETE") {
          return "删除成功";
        }
        return response.json();
      } else if (response.status === 500) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch(err => {
      return {
        error_code: -1,
        error: -1,
        message: JSON.stringify(err)
      };
    });
}
