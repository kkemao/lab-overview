import { Button, Icon, Layout, Menu, Modal, PageHeader } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addOrUpdateServiceList,
  changeCurrentMenuKey,
  deleteServiceList,
  getComponentList,
  getDeviceList,
  getServiceList,
  getSystemList,
  addOrUpdateDeviceList,
  deleteDeviceList
} from "../store/homepageAction";
import WrappedDeviceAdd from "./DeviceAddForm";
import DeviceTable from "./DeviceTable";
import WrappedServiceAdd from "./ServiceAddForm";
import ServiceTable from "./ServiceTable";
import SystemTable from "./SystemTable";

const { Header, Content, Footer, Sider } = Layout;

const mapStateToprops = state => {
  return {
    deviceList: state.homepageReducer.deviceList,
    serviceList: state.homepageReducer.serviceList,
    systemList: state.homepageReducer.systemList,
    componentList: state.homepageReducer.componentList,
    currentKey: state.homepageReducer.currentKey,
    menu: state.homepageReducer.menu
  };
};

const mapActionToprops = {
  getDeviceList,
  getServiceList,
  getSystemList,
  changeCurrentMenuKey,
  getComponentList,
  addOrUpdateServiceList,
  deleteServiceList,
  addOrUpdateDeviceList,
  deleteDeviceList
};

class LayoutComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      record: null
    };
  }

  componentDidMount() {
    const {
      getServiceList,
      getDeviceList,
      getSystemList,
      getComponentList
    } = this.props;
    getServiceList();
    getSystemList();
    getDeviceList();
    getComponentList();
  }

  // 子窗口控制关闭弹窗时设置record，
  setModalVisible = modalVisible => {
    this.setState({ modalVisible, record: null });
  };

  closeModal = () => {
    return this.setModalVisible;
  };

  updateList = () => {
    return record => {
      this.setModalVisible(true);
      this.setState({
        record
      });
    };
  };

  setKey = e => {
    console.log("zkf", e);
    this.props.changeCurrentMenuKey(e.key);
    // this.setState({
    //     key: e.key
    // });
  };
  render() {
    const { currentKey, menu } = this.props;
    const { record } = this.state;
    console.log(record);
    const {
      deviceList,
      serviceList,
      systemList,
      componentList,
      getDeviceList,
      getServiceList,
      getSystemList,
      addOrUpdateServiceList,
      deleteServiceList,
      addOrUpdateDeviceList,
      deleteDeviceList
    } = this.props;
    let _m = menu.filter(val => val.key == currentKey)[0];

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {menu.map(v => (
              <Menu.Item key={v.key} onClick={this.setKey}>
                <Icon type={v.type} />
                <span className="nav-text">{v.value}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: 0,
              height: 60,
              textAlign: "left"
            }}
          >
            <PageHeader
              onBack={() => null}
              title="业务概览"
              subTitle="龙岗现网在线业务一览"
            >
              <span className="headerspan">
                <Button
                  type="primary"
                  icon="plus"
                  size={"large"}
                  onClick={() => this.setModalVisible(true)}
                >
                  新增
                </Button>
              </span>
            </PageHeader>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              height: "calc( 100% - 120px )",
              overflow: "auto",
              background: "white"
            }}
          >
            <div style={{ padding: 24, background: "#fff", height: "100%" }}>
              {currentKey == "1" && (
                <SystemTable
                  systemList={systemList}
                  getSystemList={getSystemList}
                  updateList={this.updateList()}
                />
              )}
              {currentKey == "2" && (
                <DeviceTable
                  serviceList={serviceList}
                  deviceList={deviceList}
                  updateList={this.updateList()}
                  getServiceList={getServiceList}
                  deleteDeviceList={deleteDeviceList}
                  getDeviceList={getDeviceList}
                  deleteServiceList={deleteServiceList}
                />
              )}
              {currentKey == "3" && (
                <ServiceTable
                  serviceList={serviceList}
                  getServiceList={getServiceList}
                  updateList={this.updateList()}
                  deleteServiceList={deleteServiceList}
                />
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: "center", height: 60 }}>
            龙岗业务概览 ©2019 Created by Longgang
          </Footer>
        </Layout>
        {this.state.modalVisible && (
          <Modal
            title={`${_m.value}-${record ? "修改" : "新增"}`}
            width="500px"
            centered
            maskClosable={false}
            footer={null}
            visible={this.state.modalVisible}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
            onOK={() => this.setModalVisible(false)}
            onCancel={() => this.setModalVisible(false)}
          >
            {currentKey == "2" && (
              <WrappedDeviceAdd
                record={record}
                getDeviceList={getDeviceList}
                addOrUpdateDeviceList={addOrUpdateDeviceList}
                closeModal={this.closeModal()}
              />
            )}
            {currentKey == "3" && (
              <WrappedServiceAdd
                record={record}
                deviceList={deviceList}
                getServiceList={getServiceList}
                componentList={componentList}
                addOrUpdateServiceList={addOrUpdateServiceList}
                closeModal={this.closeModal()}
              />
            )}
          </Modal>
        )}
      </Layout>
    );
  }
}

export default connect(
  mapStateToprops,
  mapActionToprops
)(LayoutComp);
