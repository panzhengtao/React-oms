import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Input,
    Button,
    Select,
    Tag,
    Row,
    Col,
    DatePicker,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;
import {levelOptions} from '../../../util/options';
import {objTodata} from '../../../util/baseTool';

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        platformVisible: false
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }

    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        const url = this.props.searchValues.url;
        or && e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'keywords') {
                            newobj[i] = values[i]
                        }
                    }
                }

                const data = objTodata(newobj)

                this.props.fetchsearchValues({url, key: 'data', value: data})

            }
        });
        return newobj
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    platformSelect = () => {
        this.props.platformsearchaction({visible: true})
    }

    closehaddle = (i) => {
        const data = this.props.platformsearch.data;
        data[i].checked = false;
        this.props.platformsearchaction({data})
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const taglist = this.props.searchValues.data ? this.props.searchValues.data.map((v, i) => {
            return v.checked ? <Tag key={i} closable onClose={() => {
                this.closehaddle(i)
            }}>{v.name}</Tag> : ''
        }) : []

        return (

            <Form layout="inline">

                <Row style={{'padding': '8px 0px'}}>
                    <Col span={24}>
                        <FormItem  {...this.formItemLayout}
                                   label="" style={{"width": "100%", paddingRight: '5px'}}
                        >

                            {getFieldDecorator('keywords', {
                                rules: [{
                                    required: false,
                                    message: `搜索条件`
                                }],
                            })(
                                <Search onSearch={this.handleSubmit} disabled={this.hasErrors(getFieldsError())}
                                        placeholder="查询条件" enterButton="查询" maxLength="100"/>
                            )}

                        </FormItem>
                    </Col>


                </Row>

                <Row style={{'padding': '0px 0px 8px'}}>

                    <Col span={24}>
                        {taglist}
                    </Col>

                </Row>
            </Form>
        );
    }
}

export default Condition