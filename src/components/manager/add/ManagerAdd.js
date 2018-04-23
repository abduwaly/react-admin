import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';

import { Form, Input, Tooltip, Icon, Cascader, Select, Button, AutoComplete, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: '陕西省',
    label: '陕西省',
    children: [{
        value: '西安市',
        label: '西安市',
        children: [{
            value: '长安区',
            label: '长安区',
        },{
            value: '雁塔区',
            label: '雁塔区',
        },{
            value: '浐灞区',
            label: '浐灞区',
        }],
    }],
}, {
    value: '上海市',
    label: '上海市',
    children: [{
        value: '青浦区',
        label: '青浦区',
    },{
        value: '徐汇区',
        label: '徐汇区',
    },{
        value: '金山区',
        label: '金山区',
    }]
}
];

class ManagerAdd extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'creationRes');
    }
    componentWillReceiveProps(nextProps) {
        const { creationRes: nextRes = {} } = nextProps;
        const { receiveData, history } = this.props;
        console.log(nextRes,this.props);
        if(nextRes.isFetching){
            message.loading('正在加载...',0);
        } else {
            message.destroy();
            if(nextRes.data && nextRes.data.code === 200){
                message.success('添加成功!',1,function () {
                    receiveData(null, 'creationRes');
                    history.push('/app/manager/list');
                });
            }
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { fetchData } = this.props;
                console.log('Received values of form: ', values);
                fetchData({funcName: 'getPros', stateName: 'creationRes'});
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    checkPhone = (rule, value, callback) => {
        // const form = this.props.form;
        if(value && !(/^1[34578]\d{9}$/.test(value)) ){
            callback('手机号码有误!');
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleChange = (v) => {
        console.log(v);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 80 }}>
                <Option value="86">+86</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div>
                <BreadcrumbCustom first="用户管理" second="添加用户" />
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              用户名&nbsp;
                              <Tooltip title="What do you want other to call you?">
                                <Icon type="question-circle-o" />
                              </Tooltip>
                            </span>
                          )}
                        hasFeedback
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('residence', {
                            rules: [{ type: 'array', required: true, message: '请选择地址!' }],
                        })(
                            <Cascader options={residences} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号码"
                        hasFeedback
                    >
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true, message: '请输入手机号码!' },
                            {
                                validator: this.checkPhone,
                            }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Website"
                    >
                        {getFieldDecorator('website', {
                            rules: [{ required: true, message: 'Please input website!' }],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="website"
                            >
                                <Input />
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="角色"
                    >
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: 'Please select a role!' }],
                        })(
                            <Select placeholder="select a role" onChange={this.handleChange}>
                                <Option value="admin">管理员</Option>
                                <Option value="shop">店家</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">创建</Button>
                        <Button onClick={this.handleReset}>清空</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { creationRes } = state.httpData;
    return { creationRes };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ManagerAdd));