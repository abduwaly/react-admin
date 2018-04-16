/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';

class Basic extends Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="权限管理" second="基础演示" />
                <AuthWidget
                    children={auth => (
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} bodyStyle={{minHeight: 600}}>
                                    {!auth.uid && <h2 style={{height: 500}} className="center">你还没登录的样子。。。</h2>}
                                    {
                                        auth.permissions && auth.permissions.includes('auth/authPage/visit') &&
                                        <div style={{textAlign: 'center'}}>
                                            你有visit权限。。。
                                            {(auth.permissions.includes('auth/authPage/edit') &&
                                            <div>
                                                <p>你有edit权限（最高管理员登录了。。。）</p>
                                            </div>)
                                            }
                                        </div>

                                    }
                                </Card>
                            </Col>
                        </Row>
                    )}
                />
            </div>

        )
    }
}

export default Basic;