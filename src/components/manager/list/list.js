import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Table, Button, Modal } from 'antd';
import { fetchData, receiveData, showMDetails } from '@/action';
const confirm = Modal.confirm;


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User',
    }),
};


class List extends React.Component {
    state = {
        dataSource: [],
        loading: false
    }
    componentWillMount() {
        this.handleRefresh();
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps) {
        const { resData: next = {} } = nextProps;
        console.log(next);
        if(next.isFetching){
            this.setState({
                loading: true
            })
        } else {
            this.setState({
                dataSource: next.data.data,
                loading: false
            })
        }
    }

    handleRefresh = () => {
        const { receiveData, fetchData } = this.props;
        receiveData(null, 'resData');
        fetchData({
            funcName: 'managerList',
            stateName: 'resData'
        });
    }

    handleDetail = (record) => {
        const { showMDetails } = this.props;
        showMDetails(record.id);
    }

    handleDelete = (record) => {
        const { handleRefresh } = this;
        confirm({
            title: '确定要删除该用户吗?',
            content: '用户名: '+ record.username + ', 手机: '+ record.phone,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                handleRefresh();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    

    render() {
        const columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },{
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone,record) => ('+'+ record.prefix + phone)
        }, {
            title: '地址',
            dataIndex: 'residence',
            key: 'residence',
        }, {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <span>
                  <Button onClick={this.handleDetail.bind(this,record)} >Detail</Button>
                  <Button onClick={ this.handleDelete.bind(this,record) } >Delete</Button>
                </span>
            )
        }];

        return (
            <div className="list-manager">
                <Spin spinning={this.state.loading}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource} />
                </Spin>
                <style>{`
                    .list-manager{
                        // width: 100%;
                    }
                `}</style>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { resData } = state.httpData;
    return { resData };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
    showMDetails: bindActionCreators(showMDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
