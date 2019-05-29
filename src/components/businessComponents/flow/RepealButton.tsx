import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Message, Radio, Input, Icon } from 'antd';
import { dataType, editorType } from 'common';
import styles from './styles.less';

// 撤销
const RepealButton = ({ enable, onConfirm }) => {
  if (!enable) { return (<span />); }


  return (
    <div>
      <Button icon="close"
        size="large"
        type="primary"
        onClick={() => {
          Modal.confirm({
            title: '是否确认撤回?',
            content: '是否确认撤回',
            confirmLoading: true,
            onOk () {
              if (onConfirm) { onConfirm(); } else { console.log('未指定确认审核事件，点击确定审核后，什么也不会做。'); }
            },
            onCancel () {
            },
          });
        }}
      >撤销</Button>
    </div>
  );
};


RepealButton.propTypes = {
  enable: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default RepealButton;
