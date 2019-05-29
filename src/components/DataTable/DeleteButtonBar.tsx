import React from 'react';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

const DeleteButtonBar = ({ enable, editing, onConfirmDelete, size }) => {
  if (!enable) { return <span />; }

  return (<span> <Popconfirm title="确定要删除该行吗?" onConfirm={onConfirmDelete}>
    <Button type="danger" icon="delete" size={size} />
  </Popconfirm></span>);
};


DeleteButtonBar.propTypes = {
  enable: PropTypes.bool,
  onConfirmDelete: PropTypes.func,
};

export default DeleteButtonBar;
