import React from 'react';
import { Button } from 'antd';

class HelpCentre extends React.Component{

    back = () => {
        console.log('*******',this.props,"*********",this.state);
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
            </div>
        )
    }
}

export default HelpCentre;