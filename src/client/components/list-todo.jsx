import React from "react";
import { connect } from "react-redux";
import * as toDo from "../actions";
import { Table, Button, Input } from 'antd';
const Search = Input.Search;

const { Column, ColumnGroup } = Table;
import { bindActionCreators } from 'redux';
import custom from "../styles/custom.css";



class ListToDo extends React.Component {
    constructor(props) {
        super(props);
        let { dispatch } = this.props;
        this.actions = bindActionCreators(toDo, dispatch);
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            data: [],
            id:''
        };
    };

    componentDidMount() {
        this.actions.listToDo();
    }
    componentWillReceiveProps(nextProps) {
            this.setState({data: nextProps.todoList.data});
    }
    deleteToDo(record) {
        if(record && this.state && this.state.data) {
            for(let i=0; i<this.state.data.length; i++) {
                if(record._id === this.state.data[i]._id){
                    this.state.data.splice(i, 1);
                }
            }
            this.setState({data: this.state.data});
            this.actions.deleteToDo(record, record._id);
        }
    }
    onEdit(record) {
        this.actions.editToDo(record._id);
        this.props.history.push('/home/' + record._id)
    }
    addToDo() {
        this.props.history.push('/home');
    }

    onSearch(value) {
           this.actions.search(value);
    }
    render() {
        return (
            <div>
                <Button onClick={() => this.addToDo()} type="primary" style={{ marginBottom: 16 }}>
                    Add Todo
                </Button>
                <br /><br />
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => this.onSearch(value)}
                />
                <br /><br />
            <Table dataSource={this.state.data}>
                <Column
                    title="Text"
                    dataIndex="text"
                    key="text"
                />
                <Column
                    title="Description"
                    dataIndex="description"
                    key="description"
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <span>
          <Button onClick={() => this.onEdit(record)} type="primary" style={{ marginBottom: 16 }}>
          Edit
          </Button>
          <Button onClick={() => this.deleteToDo(record)} type="primary" style={{ marginBottom: 16 }}>
          Delete
          </Button>
        </span>
                    )}
                />
            </Table>

            </div>
        );
    }
}



const mapStateToProps= (state) => {
    return{
        todoList: state.toDo
    };
};




export default connect(mapStateToProps)(ListToDo);