import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Message, Radio, Input, Icon } from 'antd';
import { dataType, editorType } from 'common';
import styles from './styles.less';

// 撤销
const EmptyButton = ({ enable, onConfirm }) => {
  if (!enable) { return (<span />); }
  return (
    <div>
      <Button icon="delete"
        type="danger"
        onClick={() => {
          Modal.confirm({
            title: '是否确认清空?',
            content: '是否确认清空数据',
            confirmLoading: true,
            okType: 'danger',
            onOk () {
              if (onConfirm) { onConfirm(); } else { console.log('未指定确认审核事件，点击确定审核后，什么也不会做。'); }
            },
            onCancel () {
            },
          });
        }}
      >清空</Button>
    </div>
  );
};


EmptyButton.propTypes = {
  enable: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default EmptyButton;
