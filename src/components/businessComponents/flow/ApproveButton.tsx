import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Message, Radio, Input } from 'antd';
import { dataType, editorType } from 'common';
import styles from './styles.less';

const RadioGroup = Radio.Group;
// 审批按钮
class ApproveButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };


  getModalProps = () => {
    const { modalVisible } = this.state;
    const { onConfirm } = this.props;

    return {
      visible: modalVisible,
      maskClosable: false,
      title: '审核',

      onOk (data) {
        const option = _this.rgOption.state.value;
        const reason = _this.taReason.textAreaRef.value;
        if (!reason) {
          Message.error('理由不能为空');
          _this.taReason.focus();
          return;
        }

        if (onConfirm) { onConfirm({ option, reason }); } else { console.log('未指定确认审核事件，点击确定审核后，什么也不会做。'); }

        _this.toggleModal();
      },
      onCancel () {
        _this.toggleModal();
      },
    };
  };

  render () {
    const { enable } = this.props;
    if (!enable) { return (<span />); }

    const { modalVisible } = this.state;
    return (
      <div>
        {
          modalVisible &&
          <Modal {...this.getModalProps()} className={styles.modal} >
            <Row>
              <Col span={4}>*选项</Col>
              <Col span={8}>
                <RadioGroup defaultValue ref={(radiogroup) => { this.rgOption = radiogroup; }}>
                  <Radio value >通过</Radio>
                  <Radio value={false} >退回</Radio>
                </RadioGroup>
              </Col>
            </Row>

            <Row >
              <Col span={4}>
                *理由
              </Col>
              <Col span={16}>
                <Input.TextArea rows={4} ref={(textarea) => { this.taReason = textarea; }} />
              </Col>
            </Row>

          </Modal>
        }
        <Button icon="check" size="large" type="primary" onClick={this.toggleModal}>
          {this.props.children}
        </Button>
      </div>
    );
  }
}

ApproveButton.propTypes = {
  enable: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default ApproveButton;
