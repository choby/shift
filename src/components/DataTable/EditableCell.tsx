import React from 'react';
import { Input, DatePicker, InputNumber, Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { dataType, editorType } from 'common';
import RemoteSelect from '../RemoteSelect';
import Formatter from '../Formatter';


// 根据ant的Input控件编辑状态、列类型渲染输入控件
class EditableCell extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable || false,

    };
  }

  syncChange (value) {
    const { complex, onChange } = this.props;
    if (onChange) {
      const { eventTracking, dataIndex } = this.props;
      if (complex) {
        eventTracking.values.dataIndex = complex.key;
        eventTracking.values[complex.key] = JSON.parse(value);
        eventTracking.sender = this;
        if (this.props.onChange({ ...eventTracking })) { this.props.cellChange(JSON.parse(value)); }
      } else {
        eventTracking.values.dataIndex = dataIndex;
        eventTracking.values[dataIndex] = value;
        eventTracking.sender = this;
        if (this.props.onChange({ ...eventTracking })) { this.props.cellChange(value); }
      }
    } else if (complex) {
      this.props.cellChange(JSON.parse(value));
    } else {
      this.props.cellChange(value);
    }
    this.setState({ value });
  }

  handleChange (value) {
    this.syncChange(value);
    // this.setState({ value });
  }

  handleDatePickerChange (v, dateString) {
    this.syncChange(dateString);
  }

  handleNumberChange (value) {
    this.syncChange(value);
  }

  switchComponent () {
    // const {  } = this.state;
    const { type, editor, size, value, editable } = this.props;
    if (editor) {
      return this.switchEditor();
    }
    switch (type) {
      case dataType.currency:
        return (<InputNumber
          value={value}
          formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\￥\s?|(,*)/g, '')}
          onChange={value => this.handleNumberChange(value)}
          size={size}
        />);
      case dataType.integer:
        return (<InputNumber
          value={value}
          step="1"
          parser={value => parseInt(value)}
          onChange={value => this.handleNumberChange(value)}
          size={size}
        />);
      case dataType.decimal:
        return (<InputNumber
          value={value}
          step={0.1}
          parser={value => parseFloat(value)}
          onChange={value => this.handleNumberChange(value)}
          size={size}
        />);
      case dataType.percentage:
        return (<InputNumber
          value={value}
          min={0}
          max={100}
          formatter={value => `${parseFloat(value) * 100}%`}
          parser={value => parseFloat(value.replace('%', '')) / 100}
          onChange={value => this.handleNumberChange(value)}
          size={size}
        />);
      case dataType.date:
        const dateFormat = 'YYYY-MM-DD';
        moment.locale('zh-cn');
        return (
          <DatePicker
            value={moment(value, dateFormat)}
            format={dateFormat}
            placeholder="Select Time"
            onChange={(value, dateString) => this.handleDatePickerChange(value, dateString)}
            size={size}
          />);
      case dataType.datetime:
        const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
        moment.locale('zh-cn');
        return (
          <DatePicker
            showTime
            value={moment(value, datetimeFormat)}
            format={datetimeFormat}
            placeholder="Select Time"
            onChange={(value, dateString) => this.handleDatePickerChange(value, dateString)}
            size={size}
          />);
      case dataType.text:
      default:
        return (<Input
          value={value}
          onChange={e => this.handleChange(e.target.value)}
          size={size}
        />);
    }
  }

  switchEditor () {
    // const { value, editable } = this.state;
    const { type, editor, value, editable, complex } = this.props;
    switch (editor.type) {
      case editorType.select:
      default:
        return (<RemoteSelect value={value}
          dataTextField={editor.dataTextField}
          dataValueField={editor.dataValueField}
          dataSource={editor.dataSource}
          complex={complex}
          onChange={value => this.handleChange(value)}
        />);
    }
  }


  render () {
    // const { value } = this.state;
    const { render, format, type, editable, value } = this.props;

    return (
      <div>
        {
          editable ?
            (<div>{this.switchComponent()}</div>)
            :
            (this.props.render ? this.props.render() : <Formatter value={value} type={type} format={format} />)

        }
      </div>
    );
  }
}

export default EditableCell;
