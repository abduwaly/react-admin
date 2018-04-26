import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData, hideMDetails } from '@/action';
import { Modal, Spin } from 'antd';

class DetailsModal extends React.Component {

    state = {
        loading: false,
        dataSource: {}
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { detailsId: nextId, visible: nextV, response: nextRes = {} } = nextProps;
        if( nextV && nextId !== this.props.detailsId){
            const { fetchData } = this.props;
            fetchData({funcName: 'getManagerById', params: nextId, stateName: 'response'});
        }
        if(nextRes.isFetching){
            this.setState({
                loading: true
            });
        } else if(nextRes.data && nextRes.data.code === 0) {
            this.setState({
                dataSource: nextRes.data.data,
                loading: false
            });
        }

    }

    handleOk = (e) => {
        this.props.hideMDetails();
        this.props.receiveData(null, 'response');
    }

    handleCancel = (e) => {
        this.props.hideMDetails();
    }

    render () {
        return (
            <Modal
                title="Basic Modal"
                className="manager-details-modal"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Spin spinning={this.state.loading}>
                    <p>{ this.state.dataSource.username }</p>
                </Spin>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    const { response } = state.httpData;
    const { visible, detailsId } = state.detailsInfo;
    return { response, visible, detailsId };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
    hideMDetails: bindActionCreators(hideMDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);
