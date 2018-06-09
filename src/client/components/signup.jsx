import React from "react";
import { connect } from "react-redux";
import * as toDo from "../actions";
import { Form, Icon, Input, Button, notification} from 'antd';
const FormItem = Form.Item;
import { bindActionCreators } from 'redux';
import  custom from "../styles/custom.css";
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        let { dispatch } = this.props;
        this.actions = bindActionCreators(toDo, dispatch);
        this.state = {
            email: null,
            password: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Login = this.Login.bind(this);
        this.showErrMsg = '';
    };


    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.signUp.isSignedUp) {
            this.props.history.push("/login");
        } else if(!nextProps.signUp.isSignedUp && nextProps.signUp.signUpErrorMsg !== ''){
           this.showErrMsg  =  nextProps.signUp.signUpErrorMsg.response.data.success;
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.actions.signUp(values);
            }
        });
    };
    Login() {
        this.props.history.push("/login");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
            <pre className={custom["te"]}>SIgnUp Form</pre>
            <Form  onSubmit={this.handleSubmit} className="login-form" className={custom["sign-up"]}>
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
                        <Input size="large" />
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
                        <Input type="password" size="large" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        SignUp
                    </Button>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.Login}>
                        Login
                    </Button>
                </FormItem>
            </Form>
                <div className={custom['content']}>{this.showErrMsg}</div>
            </div>
        );
    }
}

const SignUp = Form.create()(SignUpForm);

const mapStateToProps= (state) => {
    return{
        signUp: state.loginSignUp
    };
};




export default connect(mapStateToProps)(SignUp);