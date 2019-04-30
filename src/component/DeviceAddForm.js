import React, { Component } from "react";
import { Form, Select, Input, Button, message } from "antd";
import moment from "moment";
import _ from "lodash";

const { Option } = Select;

class DeviceAddForm extends React.Component {
  state = {
    disabled: false
  };
  handleSubmit = async e => {
    e.preventDefault();
    const {
      addOrUpdateDeviceList,
      closeModal,
      getDeviceList,
      record
    } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.create_time = moment().format("YYYY-MM-DD HH:mm:ss");
        if (record) values.id = record.key;
        this.setState({
          disabled: true
        });
        let res = await addOrUpdateDeviceList(values);
        if (res && res.errCode == 0) {
          message.success(record ? "修改成功" : "新增成功");
          getDeviceList();
          closeModal(false);
        } else {
          message.error(res.data);
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
    console.log("record", record);
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="服务器IP">
          {getFieldDecorator("ip", {
            rules: [{ required: true, message: "请输入服务器IP!" }],
            initialValue: record ? record.ip : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="服务器型号">
          {getFieldDecorator("type", {
            rules: [
              { required: true, message: "请输入服务器型号!", type: "string" }
            ],
            initialValue: record ? record.type : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="归属">
          {getFieldDecorator("owner", {
            rules: [{ required: true, message: "请输入归属!" }],
            initialValue: record ? record.owner : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="操作系统版本">
          {getFieldDecorator("version", {
            rules: [{ required: true, message: "请输入操作系统版本!" }],
            initialValue: record ? record.version : ""
          })(<Input />)}
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

const WrappedDeviceAdd = Form.create({ name: "device" })(DeviceAddForm);

export default WrappedDeviceAdd;
