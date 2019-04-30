import { Divider, Modal, Table, Tag } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import SystemDetailTable from "./SystemDetailTable";

class SystemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      record: {},
      columns: [
        {
          title: "系统名称",
          dataIndex: "name",
          key: "name",
          render: (text, record) => (
            <a
              href="javascript:;"
              onClick={() => this.setModalVisible(true, record)}
            >
              {text}
            </a>
          )
        },
        {
          title: "页面地址",
          dataIndex: "url",
          key: "url",
          render: (text, record) => (
            <span>
              <a href={record.url}>{record.url}</a>
            </span>
          )
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
                onClick={() => this.setModalVisible(true, record)}
              >
                查看
              </a>
              <Divider type="vertical" />
              <a href="javascript:;">修改</a>
              <Divider type="vertical" />
              <a href="javascript:;">删除</a>
            </span>
          )
        }
      ],
      systemList: this.props.systemList || []
    };
  }
  componentDidMount() {
    // const { getSystemList } = this.props;
    // getSystemList();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.systemList && !_.isEqual(nextProps, this.props)) {
      const { systemList } = nextProps;
      this.setState({ systemList });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  setModalVisible(modalVisible, record) {
    const option = record
      ? Object.assign({}, { modalVisible, record })
      : { modalVisible };
    this.setState(option);
  }
  render() {
    const { record, columns, systemList } = this.state;
    let data = systemList.map((val, index) => ({
      key: val.id,
      name: val.name,
      url: val.url,
      tags: ["web", "api", "engine", "solr"],
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
          title={record && record.name}
          width="auto"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <SystemDetailTable />
        </Modal>
      </div>
    );
  }
}
export default SystemTable;
