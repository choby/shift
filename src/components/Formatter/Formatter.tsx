import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber, FormattedDate, FormattedMessage } from 'react-intl';
import { dataType } from 'common';
import { Input, DatePicker, InputNumber, Select } from 'antd';


const Formatter = ({ value, type, format }) => {

  if (value == undefined || value == null)
    return <span></span>;
  switch (type) {
    case dataType.currency:
      return (<FormattedNumber value={value} style="currency" currency="CNY" />);
    case dataType.integer:
      return (<FormattedNumber value={value} />);
    case dataType.decimal:
      return (<FormattedNumber value={value} />);
    case dataType.percentage:
      return (<FormattedNumber value={value} style="percent" minimumFractionDigits={2}/>);
    case dataType.date:
      if (!format)
        format = 'yyyy-MM-dd';
      return (<span>{new Date(value).format(format)}</span>);
    case dataType.datetime:
      if (!format)
        format = 'yyyy-MM-dd HH:mm:ss';
      return (<span>{new Date(value).format(format)}</span>);
    case dataType.text:
    default:
      return (<span>{value}</span>);
  }
};

// Formatter.propTypes = {
//   value: PropTypes.any,
//   type: PropTypes.string,
//   format: PropTypes.string,
// };

export default Formatter;
