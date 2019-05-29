import React from 'react';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

const EditButtonBar = ({ enable, editing, onOpenEdit, onConfirmEdit, onCancelEdit, size }) => {
  if (!enable) { return <span />; }

  if (editing) {
    return (<span>
      <Button type="primary" icon="check" onClick={onCancelEdit} size={size} />
      <Popconfirm title="确定要取消编辑吗?" onConfirm={onConfirmEdit}>
        <Button type="danger" icon="close" size={size} />
      </Popconfirm>
    </span>);
  }

  return (<span>
    <Button icon="edit" onClick={onOpenEdit} type="primary" size={size} />
  </span>);
};


EditButtonBar.propTypes = {
  enable: PropTypes.bool,
  editing: PropTypes.bool,
  onOpenEdit: PropTypes.func,
  onConfirmEdit: PropTypes.func,
  onCancelEdit: PropTypes.func,
};

export default EditButtonBar;
