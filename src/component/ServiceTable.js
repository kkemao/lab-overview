import { Divider, message, Modal, Table, Tag } from "antd";
import _ from "lodash";
import React, { Component } from "react";
const confirm = Modal.confirm;

class ServiceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      record: {},
      columns: [
        {
          title: "服务组件",
          dataIndex: "name",
          key: "name",
          render: (text, record) => <a href="javascript:;">{text}</a>
        },
        {
          title: "服务ip",
          dataIndex: "ip",
          key: "ip",
          render: (text, record) => (
            <span>
              <a href="javascript:;">{record.ip}</a>
            </span>
          )
        },
        {
          title: "端口",
          dataIndex: "port",
          key: "port"
        },
        {
          title: "版本",
          dataIndex: "version",
          key: "version"
        },
        {
          title: "业务组件",
          key: "tags",
          dataIndex: "tags",
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          )
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
      serviceList: this.props.serviceList || []
    };
  }

  deleteList = data => {
    console.log("zkf", data);
    const { deleteServiceList, getServiceList } = this.props;
    confirm({
      title: `删除服务 <${data.name}>?`,
      content: "删除后该记录不可恢复，请谨慎操作。",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        let res = await deleteServiceList({ id: data.key });
        if (res && res.errCode == 0) {
          message.success("删除成功");
          getServiceList();
        } else {
          message.error("删除失败");
        }
      },
      onCancel() {}
    });
  };

  componentDidMount() {
    // const { getServiceList } = this.props;
    // getServiceList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // if(nextProps.serviceList && !_.isEqual(nextProps.serviceList, this.props.serviceList)){
    //     return true;
    // }else{
    //     return false;
    // }
  }

  componentWillUnmount() {
    // const { getServiceList } = this.props;
    // getServiceList(false);
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log("zkf", nextProps, this.props);
    if (nextProps.serviceList && !_.isEqual(nextProps, this.props)) {
      const { serviceList } = nextProps;
      this.setState({ serviceList });
    }
  }

  render() {
    const { record, columns, serviceList } = this.state;
    let data = serviceList.map((val, index) => ({
      key: val.id,
      name: val.name,
      ip: val.ip,
      port: val.port,
      version: val.version,
      tags: [val.comp_name],
      comp_id: val.comp_id,
      device_id: val.device_id,
      descr: val.describe
    }));

    return (
      <div id="table_id">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}
export default ServiceTable;
