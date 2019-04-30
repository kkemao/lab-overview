import * as types from "./ActionTypes";

const defaultState = {
  showMsg: false,
  menu: [
    {
      key: 1,
      value: "系统列表",
      type: "deployment-unit"
    },
    {
      key: 2,
      value: "服务器管理",
      type: "hdd"
    },
    {
      key: 3,
      value: "组件服务列表",
      type: "profile"
    }
  ],
  currentKey: 1,
  deviceList: [],
  serviceList: [],
  systemList: [],
  componentList: []
};
export default (state = defaultState, action) => {
  console.log("zkf", state, action);
  switch (action.type) {
    case types.CHANGE_CURRENT_MENU_KEY:
      return {
        ...state,
        ...action.payload
      };
    case types.DEVICE_LIST:
    case types.SERVICE_LIST:
    case types.SYSTEM_LIST:
    case types.COMPONENT_LIST:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
