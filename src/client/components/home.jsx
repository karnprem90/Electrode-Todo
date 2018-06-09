
import React from "react";
import { connect } from "react-redux";
import "../styles/normalize.css";
import "../styles/raleway.css";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import electrodePng from "../images/electrode.png";
import * as toDo from "../actions";
import { Input,Button} from 'antd';
const { TextArea } = Input;
import { bindActionCreators } from 'redux';


class ToDoComponent extends React.Component{

    constructor(props) {
        super(props);
        let { dispatch } = this.props;
        this.actions = bindActionCreators(toDo, dispatch);
        this.state = {
            text: null,
            description: null,
            button:'Submit'
        };
        this.showErrMsg = '';
        this.handleChange = this.handleChange.bind(this);
    };

    componentWillMount() {
    }

    componentDidMount() {
         const url = this.props.location.pathname;
         const id = url.substring(url.lastIndexOf('/') + 1);
        if (id) {
             this.actions.editToDo(id);
        }
    }


    handleChange(event, item){
        let value = event.target.value;
        this.setState({[item]: value})
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.addToDo && nextProps.addToDo.editData) {
            const editData = nextProps.addToDo.editData;
            this.setState({text: editData.text, description: editData.description, button: 'Edit'});
        }
    }

    submitCredential(e) {
        if(e === 'Submit') {
            this.actions.addToDo(this.state);
        } else {
            const url = this.props.location.pathname;
            const id = url.substring(url.lastIndexOf('/') + 1);
            this.actions.updateToDo(this.state, id);
        }
        this.props.history.push("/list")

    };

    render(){
        return (
            <div className={custom.container}>
                <section className={custom.header}>
                    <h2 className={skeleton.title}>
                        Hello from {" "}
                        <a href="https://github.com/electrode-io">{"Electrode"} <img src={electrodePng} /></a>
                    </h2>
                </section>
                <div className={custom["docs-section"]}>
                    <span className={custom['labelText']}>Text</span>
                <Input placeholder="Basic usage" value= {this.state.text }
                       onChange={(e) => {this.handleChange(e, 'text')}}  />
                    <span className={custom['labelText']}>Description</span>
                <TextArea className={custom['homeTe']} rows={3} value={this.state.description}
                          onChange={(e) => {this.handleChange(e, 'description')}} />
                <Button type="primary" onClick={() => this.submitCredential(this.state.button)}>{this.state.button}</Button>
                </div>
                <div className={custom['content']}>{this.showErrMsg}</div>
            </div>
        )
    }
}


const mapStateToProps= (state) => {
    return{
        addToDo: state.toDo
    };
};

export default connect(mapStateToProps)(ToDoComponent);
