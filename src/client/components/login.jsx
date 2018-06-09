import React from "react";
import { connect } from "react-redux";
import * as toDo from "../actions";
import { Form, Icon, Input, Button, } from 'antd';
const FormItem = Form.Item;
import { bindActionCreators } from 'redux';
import custom from "../styles/custom.css";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        let { dispatch } = this.props;
        this.actions = bindActionCreators(toDo, dispatch);
        this.state = {
            email: null,
            password: null,
            isLoggedIn: false
        };
        this.showErrMsg = '';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.SignUp = this.SignUp.bind(this);
    };


    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    componentWillReceiveProps(nextProps) {
            if(this.props !== nextProps) {
                if(nextProps.login.isLoggedIn) {
                    this.props.history.push("/list")
                }
            }
            if(nextProps.signUp && !nextProps.signUp.isLoggedIn && nextProps.signUp.signInErrorMsg !== ''){
                console.log('---err---', nextProps.isLoggedIn);
                this.showErrMsg  =  nextProps.signUp.signInErrorMsg.response.data.success;
            }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.actions.login(values);
            }
        });
    };

    SignUp(){
        this.props.history.push("/");
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
            <pre className={custom["te"]}>Login Form</pre>
            <Form onSubmit={this.handleSubmit} className="login-form" className={custom["sign-up"]}>
                <FormItem
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button" className={custom["signin-btn"]}>
                        Login
                    </Button>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.SignUp}>
                        SignUp
                    </Button>
                </FormItem>
            </Form>
            <div className={custom['content']}>{this.showErrMsg}</div>
            </div>
        );
    }
}

const Login = Form.create()(LoginForm);

const mapStateToProps= (state) => {
    return{
        login: state.loginSignUp
    };
};




export default connect(mapStateToProps)(Login);