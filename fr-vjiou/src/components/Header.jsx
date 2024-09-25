import React, { useState } from 'react';
import { Button, Menu, Modal } from 'antd';
import { LoginOutlined, FormOutlined } from '@ant-design/icons';
import Login from './Login';
import Register from './Register';

const Header = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');

    const showModal = (modalType) => {
        modalType === "login" ? setLoginModalOpen(true) : setRegisterModalOpen(true);
        setSelectedKey(modalType)
        console.log(selectedKey)
    };

    const handleOk = () => {
        // api call voor login / register
        setConfirmLoading(true)
        setConfirmLoading(false)
        handleCancel()
        setSelectedKey('')
    };

    const handleCancel = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(false);
        setSelectedKey('')
    };

    const items = [
        {
            label: (
                <Button
                    type="text"
                    onClick={() => showModal("login")}>
                    <LoginOutlined />
                    Login
                </Button>
            ),
            key: "login"
        },
        {
            label: (
                <Button
                    type="text"
                    onClick={() => showModal("register")}>
                    <FormOutlined />
                    Register
                </Button>
            ),
            key: "register"
        }
    ];

    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        <>
            <Menu
                onClick={onClick}
                style={{ display: 'flex', justifyContent: 'flex-end'}}
                mode="horizontal"
                items={items}
                activeKey={selectedKey}
                selectedKeys={null}
            />
            <Modal
                title="Login"
                open={loginModalOpen}
                //onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
                style={{}}
            >
                <Login />
            </Modal>
            <Modal
                title="Register"
                open={registerModalOpen}
                //onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Register />
            </Modal>
        </>
    );
};

export default Header;
