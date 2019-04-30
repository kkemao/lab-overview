/* global window */
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import qs from "qs";

/**
 * [buildParam description]
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function buildParam(url, params) {
  if (!params) {
    return url;
  }
  return url.replace(
    /\/:(\w+)/gm,
    index =>
      // eslint-disable-next-line
      `/${index == "/:id" ? "" : index.replace(/\/:/g, "") + "/"}${
        params[`${index.replace(/\/:/g, "")}`]
      }`
  );
}

/**
 * [fetch description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
const fetch = options => {
  let { method = "get", data = {}, url, timeout } = options;
  try {
    url = buildParam(url, data.urlParams);
  } catch (e) {
    throw new Error("请求链接参数错误.");
  }

  delete data.urlParams;
  console.log("request url", url, data);
  const cloneData = _.cloneDeep(data);

  //配置axios请求默认值
  let token = "";
  if (Cookies.get("token")) {
    token = Cookies.get("token");
  }
  //默认Url地址
  axios.defaults.baseURL = window._c.apiBaseURL;
  // 手动跨域
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  switch (method.toLowerCase()) {
    case "get":
      return axios.get(url, {
        params: cloneData
      });
    case "delete":
      return axios.delete(url, {
        data: cloneData
      });
    case "post":
      return axios.post(url, cloneData, { timeout: timeout || 0 });
    case "put":
      return axios.put(url, cloneData);
    case "patch":
      return axios.patch(url, cloneData);
    case "form":
      return axios.post(url, qs.stringify(cloneData), {
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          Authorization: "Basic " + btoa("clientweb:123456"),
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      });
    case "upload":
      if (options.progress) {
        return axios.post(url, data, {
          onUploadProgress: options.progressCallback
        });
      } else {
        return axios.post(url, data, {
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        });
      }
    default:
      return axios(options);
  }
};

/**
 * [request description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export default function request(options) {
  return fetch(options)
    .then(response => {
      const { data } = response;
      return Promise.resolve({
        ...data
      });
    })
    .catch(error => {
      const currentUrl = window.location.pathname;

      recordError({
        options,
        error,
        currentUrl
      });

      return Promise.resolve({
        error
      });
    });
}

/**
 * [recordError description]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
function recordError(error) {
  localStorage.setItem(String(new Date().getTime()), qs.stringify(error));
}

export const api = {
  device: "/device",
  deviceAdd: "/device/add",
  deviceUpdate: "/device/update",
  deviceDelete: "/device/delete",
  service: "/service",
  serviceAdd: "/service/add",
  serviceUpdate: "/service/update",
  serviceDelete: "/service/delete",
  system: "/system",
  component: "/component"
};
