import React, { Component } from "react";
import { Form, Select, Input, Button, message } from "antd";
import moment from "moment";
import _ from "lodash";

const { Option } = Select;

class ServiceAddForm extends React.Component {
  state = {
    disabled: false
  };
  handleSubmit = async e => {
    e.preventDefault();
    const {
      addOrUpdateServiceList,
      closeModal,
      getServiceList,
      record
    } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.create_time = moment().format("YYYY-MM-DD HH:mm:ss");
        if (record) values.id = record.key;
        this.setState({
          disabled: true
        });
        let res = await addOrUpdateServiceList(values);
        if (res && res.errCode == 0) {
          message.success(record ? "修改成功" : "新增成功");
          getServiceList();
          closeModal(false);
        } else {
          this.setState({
            disabled: false
          });
        }
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    // this.props.form.setFieldsValue({
    //     servername: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { componentList, deviceList, record } = this.props;
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="服务名称">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入服务名称!" }],
            initialValue: record ? record.name : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="服务器">
          {getFieldDecorator("device_id", {
            rules: [
              { required: true, message: "请选择服务器!", type: "number" }
            ],
            initialValue: record
              ? deviceList[
                  _.findIndex(deviceList, item => item.id == record.device_id)
                ].id
              : null
          })(
            // <Select mode="multiple" placeholder="请选择服务器" onChange={this.handleSelectChange}>
            //     {deviceList ? deviceList.map( val => <Option key={val.id} value={val.id}>{val.ip}</Option> ) : []}
            //   {/* <Option value="68.71.85.185">68.71.85.185</Option>
            //   <Option value="68.71.85.174">68.71.85.174</Option>
            //   <Option value="68.71.85.166">68.71.85.166</Option> */}
            // </Select>
            <Select
              showSearch
              placeholder="请选择服务器"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {deviceList
                ? deviceList.map(val => (
                    <Option key={val.id} value={val.id}>
                      {val.ip}
                    </Option>
                  ))
                : []}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="端口">
          {getFieldDecorator("port", {
            rules: [{ required: true, message: "请输入端口!" }],
            initialValue: record ? record.port : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="版本">
          {getFieldDecorator("version", {
            rules: [{ required: true, message: "请输入版本!" }],
            initialValue: record ? record.version : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="业务组件">
          {getFieldDecorator("comp_id", {
            rules: [{ required: true, message: "请选择组件类型!" }],
            initialValue: record ? record.comp_id : ""
          })(
            <Select
              placeholder="请选择组件类型"
              //   onChange={this.handleSelectChange}
            >
              {componentList
                ? componentList.map(val => (
                    <Option key={val.id} value={val.id}>
                      {val.name}
                    </Option>
                  ))
                : []}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator("describe", {
            rules: [{ required: false, message: "请输入相关备注!" }],
            initialValue: record ? record.descr : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.state.disabled}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedServiceAdd = Form.create({ name: "service" })(ServiceAddForm);

export default WrappedServiceAdd;
