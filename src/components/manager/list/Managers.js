import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class Managers extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="用户管理" second="用户列表" />
                <p>This is manager list.</p>
            </div>
        )
    }
}

export default Managers;