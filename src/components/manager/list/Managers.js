import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchData, receiveData } from '@/action';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import List from './List';
import DetailsModal from './DetailsModal';


class Managers extends React.Component {

    render() {
        return (
            <div>
                <BreadcrumbCustom first="用户管理" second="用户列表" />
                <List />
                <DetailsModal />
            </div>
        )
    }
}

export default Managers;
