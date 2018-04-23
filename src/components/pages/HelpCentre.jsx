import React from 'react';
import { Button } from 'antd';
import * as x from '../../axios/index';
import { counter } from '../../reducer/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/action';

class HelpCentre extends React.Component{

    state = counter(undefined,{});

    componentWillMount() {
        console.log("will...",this.state,this.props);
    }
    componentDidMount() {
        console.log('did...',this.state,this.props);
    }
    componentWillReceiveProps(nextProp) {
        console.log("receive props...",this.state,this.props,nextProp);
    }

    dispatch(action) {
        this.setState(prevState => counter(prevState, action));
    }

    increment = () => {
        this.dispatch({ type: 'INCREMENT' });
    };

    decrement = () => {
        this.dispatch({ type: 'DECREMENT' });
    };

    back = (e) => {
        x.npmDependencies().then((v) => { console.log("^^^^^^^^^", v, e) });
        // x.admin().then((v) => { console.log("^^^^ admin ^^^^^", v) });
        // x.guest().then((v) => { console.log("^^^^ guest ^^^^^", v) });
        // console.log(x);
        // console.log('*******',this.props,"*********",this.state);
        this.props.history.goBack();
    };

    render(){
        return (
            <div>
                <h1>Welcome to Help Center!</h1>
                <Button
                    type="primary"
                    onClick={this.back}
                >
                    Back
                </Button>
                <hr />
                <Button onClick={this.decrement}>-</Button>
                {this.state.value}
                <Button onClick={this.increment}>+</Button>
                <hr />
                <Button onClick={this.props.toLower}>lower-case</Button>
                {this.props.name}
                <Button onClick={this.props.toUpper}>upper-case</Button>
            </div>
        )
    }
}
// 将store的state 转化为本地props
const mapStateToProps = state => {
    const { name } = state.globalName;
    return { name };
};
// 将actions转换到本地props
const mapDispatchToProps = dispatch => ({
    toLower: bindActionCreators(Actions.toLower, dispatch),
    toUpper: bindActionCreators(Actions.toUpper, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(HelpCentre);