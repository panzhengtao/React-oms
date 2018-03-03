import React, {Component} from 'react'
import {render} from 'react-dom'

import '../css/css.css'
import '../../../common/css/css.css'

import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import Modalmodel from '../../modalmodel/searchmodel';


class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    ModalhandleCancel = (value) => () => {
        this.props.searchVluesaction({[value]: false,})
    }

    ModalhandleOk = ()=>{

        const name = this.props.searchValues.name;
        const id = this.props.searchValues.id;
        console.log(name,id)
        const data = this.props.searchValues.data.filter(v=>v.checked)
        const namevalue= data.map(v=>v.name).join(',')
        const idvalue= data.map(v=>v.id).join(',')
        this.props.searchVluesaction({visible:false,})
        this.props.form.setFieldsValue({[name]: namevalue,[id]: idvalue,'keywords':''});
    }

    render() {
        const content = <div className="searchwk">
            <div className="content">
                <Condition {...this.props} />
                <Tablelist {...this.props} />
            </div>
        </div>
        return (

            <Modalmodel  {...{
                ...this.props.searchValues,
                visible: this.props.searchValues.visible,
                title: `请选择${this.props.searchValues.title}`,
                ModalContent: content,
            }}
                         onOk={this.ModalhandleOk}
                         confirmLoading={this.props.searchValues.confirmLoading}
                         onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;