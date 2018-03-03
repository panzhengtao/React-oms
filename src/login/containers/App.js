import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/css.css';
import {getUrlParams, setLoginInfo} from '../../util/baseTool';
import {
    Form, Icon, Input, Button, Checkbox
} from 'antd';
import axios from "../../util/axios";
import * as config from "../../util/connectConfig";
import {objTodata,setCookie} from '../../util/baseTool';

const FormItem = Form.Item;

class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const data = objTodata(values)
                axios.post(`${config.api_url}/api/oms/user/login`, data)
                    .then(response => {
                        console.log(response.data.name)
                        const status = response.status
                        if(status==200){
                            setCookie('username',response.data.name)
                            location.href=location.href
                        }
                    }).catch(e => {
                    console.log(e);
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="yks-login">

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {/*{getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}*/}
                        <a className="login-form-forgot" href="">忘记密码</a><a className="login-form-forgot" href="">注册</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>

                    </FormItem>
                </Form>

            </div>
        );
    }
}

export default Form.create()(LoginForm)
