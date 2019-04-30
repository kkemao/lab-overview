import { Divider, Modal, Table, message } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import DeviceDetailTable from "./DeviceDetailTable";
const confirm = Modal.confirm;

class SystemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      record: {},
      columns: [
        {
          title: "服务器IP",
          dataIndex: "ip",
          key: "ip",
          render: (text, record) => (
            <span>
              <a
                href="javascript:;"
                onClick={() => this.setModalVisible(true, record)}
              >
                {record.ip}
              </a>
            </span>
          )
        },
        {
          title: "型号",
          key: "type",
          dataIndex: "type"
        },
        {
          title: "归属",
          key: "owner",
          dataIndex: "owner"
        },
        {
          title: "操作系统版本",
          key: "version",
          dataIndex: "version"
        },
        {
          title: "备注",
          dataIndex: "descr",
          key: "descr"
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
            <span>
              <a
                href="javascript:;"
                onClick={() => this.setModalVisible(true, record)}
              >
                查看
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => this.props.updateList(record)}
              >
                修改
              </a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => this.deleteList(record)}>
                删除
              </a>
            </span>
          )
        }
      ],
      deviceList: this.props.deviceList || []
    };
  }

  deleteList = data => {
    console.log("zkf", data);
    const { deleteDeviceList, getDeviceList } = this.props;
    confirm({
      title: `删除服务器 <${data.ip}>?`,
      content: "删除后该记录不可恢复，请谨慎操作。",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        let res = await deleteDeviceList({ id: data.key });
        if (res && res.errCode == 0) {
          message.success("删除成功");
          getDeviceList();
        } else {
          message.error(res.data);
        }
      },
      onCancel() {}
    });
  };

  componentDidMount() {
    // const { getDeviceList } = this.props;
    // getDeviceList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // if(nextProps.deviceList && !_.isEqual(nextProps.deviceList, this.props.deviceList)){
    //     return true;
    // }else{
    //     return false;
    // }
  }

  componentWillUnmount() {
    // const { getDeviceList } = this.props;
    // getDeviceList(false);
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log("zkf", nextProps, this.props);
    if (nextProps.deviceList && !_.isEqual(nextProps, this.props)) {
      const { deviceList } = nextProps;
      this.setState({ deviceList });
    }
  }

  setModalVisible(modalVisible, record) {
    const option = record
      ? Object.assign({}, { modalVisible, record })
      : { modalVisible };
    this.setState(option);
  }

  render() {
    const { deleteServiceList, getServiceList } = this.props;
    const { record, columns, deviceList } = this.state;
    const { serviceList } = this.props;
    let data = deviceList.map((val, index) => ({
      key: val.id,
      type: val.type,
      ip: val.ip,
      owner: val.owner,
      version: val.version,
      descr: val.describe
    }));

    return (
      <div id="table_id">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
        <Modal
          title={record && record.ip}
          width="auto"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <DeviceDetailTable
            record={record}
            serviceList={serviceList}
            getServiceList={getServiceList}
            deleteServiceList={deleteServiceList}
          />
        </Modal>
      </div>
    );
  }
}
export default SystemTable;
