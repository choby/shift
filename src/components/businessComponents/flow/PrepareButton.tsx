import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Message, Radio, Input, Icon } from 'antd';
import { dataType, editorType } from 'common';
import styles from './styles.less';

const RadioGroup = Radio.Group;
// 提交审核
const PrepareButton = ({ enable, onConfirm }) => {
  if (!enable) { return (<span />); }

  return (<div>
    <Button icon="check"
      size="large"
      type="primary"
      onClick={() => {
        Modal.confirm({
          title: '是否确认提交，进入审核流程?',
          content: (
            <div className={styles.warning}>
                              进入审核后将不能进行编辑修改！
            </div>
          ),
          onOk () {
            if (onConfirm) { onConfirm(); } else { console.log('未指定确认审核事件，点击确定审核后，什么也不会做。'); }
          },
          onCancel () { },
        });
      }}
    >
            提交审核
    </Button>
  </div>);
};

PrepareButton.propTypes = {
  enable: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default PrepareButton;
