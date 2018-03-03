import React, {Component} from 'react'
import {Modal, Button} from 'antd';

class Modalmodel extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props}>
                    <div style={{textAlign:'left'}}>{this.props.ModalContent}</div>
                </Modal>
            </div>
        );
    }
}
export default Modalmodel
