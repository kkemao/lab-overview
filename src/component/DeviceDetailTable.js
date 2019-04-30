import { Table, message, Modal } from "antd";
import React, { Component } from "react";
import { Resizable } from "react-resizable";
const confirm = Modal.confirm;

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class SystemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "组件",
          dataIndex: "name",
          width: 60
        },
        {
          title: "类型",
          dataIndex: "component",
          width: 60
        },
        {
          title: "服务器IP",
          dataIndex: "ip",
          width: 100
        },
        {
          title: "端口",
          dataIndex: "port",
          width: 100
        },
        {
          title: "组件版本",
          dataIndex: "version",
          width: 100
        },
        {
          title: "备注",
          dataIndex: "describe",
          width: 200
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
            <a href="javascript:;" onClick={() => this.deleteList(record)}>
              删除
            </a>
          )
        }
      ]
    };
  }

  deleteList = data => {
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

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const components = {
      header: {
        cell: ResizeableTitle
      }
    };
    const { columns } = this.state;
    const { serviceList, record } = this.props;
    let data = serviceList
      .filter(item => item.device_id === record.key)
      .map(val => ({
        key: val.id,
        name: val.name,
        ip: val.ip,
        port: val.port,
        component: val.comp_name,
        version: val.version,
        describe: val.describe
      }));

    const column = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    return (
      <div>
        <Table components={components} columns={column} dataSource={data} />
      </div>
    );
  }
}
export default SystemTable;
