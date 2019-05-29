import React from 'react';
import { Button, Popconfirm } from 'antd';
import { Link } from "dva/router";
import PropTypes from 'prop-types';

const DetailButtonBar = ({ enable, detailUrl, size }) => {
  if (!enable) { return <span />; }
  return (<span>
    <Link to={detailUrl} target="_blank">
      <Button type="primary" icon="setting" size={size} title='详情' />
    </Link></span>
  );
};

DetailButtonBar.propTypes = {
  enable: PropTypes.bool,
  detailUrl: PropTypes.string,
};

export default DetailButtonBar;
