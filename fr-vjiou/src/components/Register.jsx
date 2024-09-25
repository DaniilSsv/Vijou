
import React from 'react';
import { Button, Form, Input } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Register = () => (
  <Form
    name="basic"
    // labelCol={{
    //   span: 8,
    // }}
    // wrapperCol={{
    //   span: 16,
    // }}
    // style={{
    //   maxWidth: 600,
    // }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please enter your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please enter your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Confirm password"
      name="confirmPassword"
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      // wrapperCol={{
      //   offset: 8,
      //   span: 16,
      // }}
    >
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
  </Form>
);
export default Register;