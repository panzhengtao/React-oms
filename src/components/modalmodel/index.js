import React, {Component} from 'react'
import {Modal, Button} from 'antd';

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div style={{textAlign: 'center'}}>{this.props.ModalText}</div>
                </Modal>
            </div>
        );
    }
}

export default Modalmodel
