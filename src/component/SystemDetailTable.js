import React, { Component } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';

const ResizeableTitle = (props) => {
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
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            columns: [{
                title: '组件',
                dataIndex: 'component',
                width: 60,
              }, {
                title: '服务器IP',
                dataIndex: 'ip',
                width: 100,
              }, {
                title: '端口',
                dataIndex: 'port',
                width: 100,
              }, {
                title: '业务类型',
                dataIndex: 'type',
                width: 200,
              }, {
                title: '备注',
                dataIndex: 'note',
                width: 100,
              }, {
                title: '操作',
                key: 'action',
                render: () => (
                  <a href="javascript:;">删除</a>
                ),
              }],
            data: [{
                key: 0,
                ip: '68.71.85.185',
                port: '8083',
                component: 'API',
                type: '提供web增删改查服务',
                note: 'transfer',
              }, {
                key: 1,
                ip: '68.71.85.185',
                port: '8083',
                component: 'WEB',
                type: '可视化交互平台',
                note: 'transfer',
              }, {
                key: 2,
                ip: '68.71.85.185',
                port: '8083',
                component: 'SOLR',
                type: '人脸搜索服务',
                note: 'transfer',
              }, {
                key: 3,
                ip: '68.71.85.185',
                port: '8083',
                component: 'SOLR',
                type: '人脸搜索服务',
                note: 'transfer',
              }, {
                key: 4,
                ip: '68.71.85.185',
                port: '8083',
                component: 'SOLR',
                type: '人脸搜索服务',
                note: 'transfer',
              }, {
                key: 5,
                ip: '68.71.85.185',
                port: '8083',
                component: 'SOLR',
                type: '人脸搜索服务',
                note: 'transfer',
              }, {
                key: 6,
                ip: '68.71.85.185',
                port: '8083',
                component: 'SOLR',
                type: '人脸搜索服务',
                note: 'transfer',
              }]
        }
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
          const nextColumns = [...columns];
          nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
          };
          return { columns: nextColumns };
        });
      };

    render() {

        const components = {
            header: {
              cell: ResizeableTitle,
            },
          };
        
         const { data, columns } = this.state;
        

        const column = columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
              width: column.width,
              onResize: this.handleResize(index),
            }),
        }));

        return (
            <div>
                <Table
                    components={components}
                    columns={column}
                    dataSource={data}
                />
            </div>
        );
    }
}
export default SystemTable;
