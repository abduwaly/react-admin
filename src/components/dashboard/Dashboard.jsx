/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom />
                <p>I'm Dashboard</p>
            </div>
        )
    }
}

export default Dashboard;