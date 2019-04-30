import request, { api } from "../util/request";
import * as types from "./ActionTypes.js";

export const changeCurrentMenuKey = currentKey => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.CHANGE_CURRENT_MENU_KEY,
      payload: {
        currentKey
      }
    });
  };
};
export const getDeviceList = flag => {
  return async (dispatch, getState) => {
    let deviceList =
      flag == false
        ? []
        : await request({
            url: api.device,
            method: "get",
            data: {}
          });
    dispatch({
      type: types.DEVICE_LIST,
      payload: {
        deviceList: flag == false ? [] : deviceList.data
      }
    });
  };
};
export const getServiceList = flag => {
  return async (dispatch, getState) => {
    let serviceList =
      flag == false
        ? []
        : await request({
            url: api.service,
            method: "get",
            data: {}
          });
    dispatch({
      type: types.SERVICE_LIST,
      payload: {
        serviceList: flag == false ? [] : serviceList.data
      }
    });
  };
};
export const getSystemList = flag => {
  return async (dispatch, getState) => {
    let systemList =
      flag == false
        ? []
        : await request({
            url: api.system,
            method: "get",
            data: {}
          });
    dispatch({
      type: types.SYSTEM_LIST,
      payload: {
        systemList: flag == false ? [] : systemList.data
      }
    });
  };
};
export const getComponentList = flag => {
  return async (dispatch, getState) => {
    let componentList =
      flag == false
        ? []
        : await request({
            url: api.component,
            method: "get",
            data: {}
          });
    dispatch({
      type: types.COMPONENT_LIST,
      payload: {
        componentList: flag == false ? [] : componentList.data
      }
    });
  };
};
export const addOrUpdateServiceList = param => {
  return async (dispatch, getState) => {
    let res = await request({
      url: param.id ? api.serviceUpdate : api.serviceAdd,
      method: "post",
      data: { ...param }
    });
    console.log("zkfres", res);
    return res;
  };
};

export const deleteServiceList = param => {
  return async (dispatch, getState) => {
    let res = await request({
      url: api.serviceDelete,
      method: "delete",
      data: { ...param }
    });
    console.log("zkfres", res);
    return res;
  };
};

export const addOrUpdateDeviceList = param => {
  return async (dispatch, getState) => {
    let res = await request({
      url: param.id ? api.deviceUpdate : api.deviceAdd,
      method: "post",
      data: { ...param }
    });
    console.log("zkfres", res);
    return res;
  };
};

export const deleteDeviceList = param => {
  return async (dispatch, getState) => {
    let res = await request({
      url: api.deviceDelete,
      method: "delete",
      data: { ...param }
    });
    console.log("zkfres", res);
    return res;
  };
};
