import React from 'react';
import '../styleSheet/style.scss';
import { Form, Input, Button, Table, Col, Row} from 'antd';
import {connect} from 'react-redux';
import * as Action from '../redux/action';
const FormItem = Form.Item;
let columns = [
	{
		key: 'person',
		dataIndex: 'person',
		title: '提交人',
	},
	{
		key: 'urgency',
		dataIndex: 'urgency',
		title: '紧急度',
	},
	{
		key: 'address',
		dataIndex: 'address',
		title: '位置信息',
	},
	{
		key: 'number',
		dataIndex: 'number',
		title: '单号',
	},
	{
		key: 'state',
		dataIndex: 'state',
		title: '审批状态',
	}
]

class App extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		const { dispatch, data } = this.props;
		dispatch(Action.setListFilter({filteredData: data}));
	}
	handleSearch(e){
		const { dispatch, data } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  console.log('Received values of form: ', values);
		  const { person, urgency, address, number, state } = values;
		  let filteredData = data.filter((item) => {
			if ((person && item.person !== person) || (urgency && item.urgency !== urgency) || (address && item.address !== address) 
		|| (number && item.number !== number) || (state && item.state !== state)) {
				return false;
			}
			return true;
		  });
		  dispatch(Action.setListFilter({filteredData}));
		});
	  }
	  handleReset(){
		const { dispatch, data } = this.props;
		this.props.form.resetFields();
		dispatch(Action.setListFilter({filteredData: data}));
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const { data, filteredData } = this.props;
		console.log('this.props', this.props);
		return(
			<div>
				{/*************表单**********************/}
				<Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)}>
					<Row>
					<Col span={8}>
					<FormItem>
						<span>提交人:</span>
						{getFieldDecorator('person')(<Input />)}
					</FormItem>
					</Col>
					<Col span={8}>
					<FormItem>
						<span>紧急度:</span>
						{getFieldDecorator('urgency')(<Input />)}
					</FormItem>
					</Col>
					<Col span={8}>
					<FormItem>
						<span>位置信息:</span>
						{getFieldDecorator('address')(<Input />)}
					</FormItem>
					</Col>
					</Row>
					<Row>
					<Col span={8}>
					<FormItem>
						<span>单号:</span>
						{getFieldDecorator('number')(<Input />)}
					</FormItem>
					</Col>
					<Col span={8}>
					<FormItem>
						<span style={{marginLeft: -17}}>审批状态:</span>
						{getFieldDecorator('state')(<Input />)}
					</FormItem>
					</Col>
					<Col span={8}>
					<div className='box'>
						<Button style={{ marginLeft: 26 }} type="primary" htmlType="submit">搜索</Button>
						<Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>清空</Button>
					</div>
					</Col>
					</Row>
				</Form>	
				{/*************表格**********************/}
				<div >
					<Table 
						columns={columns}
						dataSource={filteredData}
						pagination={false}
					/>
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		data: state.data,
		filteredData: state.filteredData
	}
}
export default connect(mapStateToProps)(Form.create()(App));

