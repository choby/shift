import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { request, config } from 'utils';

const Option = Select.Option;

class RemoteSelect extends React.Component {
  constructor (props) {
    super(props);
    const { value, defaultValue } = this.props;
    this.state = {
      value,
      defaultValue,
    };
  }

  componentDidMount () {
    if (this.props.dataSource.transport) {
      this.fetch();
    } else if (this.props.dataSource instanceof Array) { }
    this.setState({ dataSource: this.props.dataSource });
  }

  handleChange (value) {
    this.setState({ value });
    this.props.onChange(value);
  }


  fetch () {
    const { dataSource: { transport: { read } } } = this.props;
    const { apiPrefix } = config;

    // this.setState({ loading: true, editingIndex, creating });

    this.promise = request({
      url: `${apiPrefix}${read}`,
      // data: {
      //   ...transportData,
      // },
    }).then((result) => {
      const dataSource = result.data;
      this.setState({
        // loading: false,
        dataSource,
      });
    });
  }

  render () {
    const { value, defaultValue, dataSource } = this.state;
    const { dataValueField, dataTextField, complex } = this.props;
    const children = [];
    if (dataSource && dataSource instanceof Array) {
      dataSource.map((data, i) => children.push(<Option key={i.toString()} value={complex ? JSON.stringify(data) : data[dataValueField]}>
        {data[dataTextField]}</Option>
      ));
    }

    return (<Select
      defaultValue={defaultValue}
      value={value}
      style={{width:'100%'}}
      onChange={value => this.handleChange(value)}
    >
      {children}
    </Select>);
  }
}

RemoteSelect.propTypes = {
  dataSource: PropTypes.object,
  onChange: PropTypes.func,
  complex: PropTypes.object,
  // buttonStyle: PropTypes.object,
  // dropdownProps: PropTypes.object,
};

export default RemoteSelect;
