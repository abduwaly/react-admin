/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';

import ManagerAdd from '../components/manager/add/ManagerAdd';
import Managers from '../components/manager/list/Managers';
// import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置
// import Bundle from '../components/widget/Bundle';

// const WysiwygBundle = (props) => (
//     <Bundle load={Wysiwyg}>
//         {(Component) => <Component {...props} />}
//     </Bundle>
// );

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                {/* App相关 */}
                <Route exact path="/app/dashboard/index" component={Dashboard} />
                <Route exact path="/app/manager/add" component={ManagerAdd} />
                <Route exact path="/app/manager/list" component={Managers} />
                <Route exact path="/app/product/add" component={() => <p>添加商品</p>} />
                <Route exact path="/app/product/list" component={() => <p>商品列表</p>} />
                <Route exact path="/app/order/list" component={() => <p>订单列表</p>} />

                {/* 权限管理相关 */}
                <Route exact path="/app/auth/basic" component={AuthBasic} />
                <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}