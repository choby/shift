import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Modal, Button } from 'antd';
import { dataType, editorType } from 'common';
import DataTable from '../../DataTable/DataTable';


// 流程日志弹出层
class FlowLogButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  // componentWillReceiveProps (nextProps) {
  //   const staticNextProps = lodash.cloneDeep(nextProps);
  //   if (!lodash.isEqual(staticNextProps, this.props)) {
  //     const visible = nextProps;
  //     this.setState({ modalVisible: visible });
  //   }
  // }

  getModalProps = () => {
    const { modalVisible } = this.state;

    return {
      visible: modalVisible,
      maskClosable: false,
      width: 700,
      // confirmLoading: loading.effects['user/update'],
      title: '流程日志',
      wrapClassName: 'vertical-center-modal',
      footer: <div>
        <Button type="primary" onClick={() => { _this.toggleModal(); }}>关闭</Button>
      </div>,
      onCancel () {
        _this.toggleModal();
      },
    };
  };

  getLogTableProps = () => {
    const { logUrl } = this.props;

    return {
      // operateMode: 'inline',
      creatable: false,
      transport: {
        read: logUrl,
        dataKey: 'results',
      },
      columns: [
        {
          title: '操作时间',
          dataIndex: 'logTime',
          key: 'logTime',
          width: '12%',
        },
        {
          title: '操作人',
          dataIndex: 'createdBy',
          key: 'createdBy',
          width: '12%',
        },
        {
          title: '操作结果',
          dataIndex: 'result',
          key: 'result',
          width: '12%',
        },
        {
          title: '操作描述',
          dataIndex: 'description',
          key: 'description',
          width: '12%',
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          width: '12%',
        },
      ],
      pagination: { pageSize: 5 },
      rowKey: 'id',

    };
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render () {
    const { modalVisible } = this.state;
    return (
      <Button icon="file" size="small" title="流程日志" onClick={this.toggleModal.bind(this)}>流程日志
        {
          modalVisible &&
            <Modal {...this.getModalProps()}>
              <DataTable {...this.getLogTableProps()} />
            </Modal>
        }
      </Button>
    );
  }
}

FlowLogButton.propTypes = {
  logUrl: PropTypes.string,
};

export default FlowLogButton;
