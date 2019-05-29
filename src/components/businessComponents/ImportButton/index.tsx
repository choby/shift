import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Icon, Upload, Message } from 'antd';

// 导入
class ImportButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileList: [],
      modalVisible: false,
    };
  }


  getModalProps = () => {
    const { modalVisible } = this.state;


    return {
      visible: modalVisible,
      maskClosable: false,
      title: <span><Icon type="file-excel" />表格导入</span>,
      footer: <div>
        <Button type="primary" onClick={() => { _this.toggleModal(); }}>关闭</Button>
      </div>,
      onCancel () {
        _this.toggleModal();
      },
    };
  };


  // 上传组件属性
  getUploadProps = () => {
    // const match = pathToRegexp('/productplan/priceband/:id').exec(location.pathname);
    // const uploadUrl = `${apiPrefix}/seasonPrice/uploadExcel/${match[1]}`;
    const { uploadUrl, uploadData, onCompleted } = this.props;

    return {
      multiple: false,
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
      action: uploadUrl,
      data: { ...uploadData, userId: 111 },
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type !== 'application/vnd.ms-excel') {
          Message.error('文件格式不正确');
          return false;
        }
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return true;
      },
      onChange: ({ file }) => {
        if (file.status === 'done') {
          if (file.response.success) {
            const successMsg = file.response.message ? file.response.message : '上传成功';
            Message.success(successMsg);
            _this.toggleModal();
            if (onCompleted) {
              onCompleted();
            }
          } else { Message.error(file.response.message); }
        } else if (file.status === 'error') {
          Message.error(file.response);
        }
      },
      fileList: this.state.fileList,
    };
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  render () {
    const { enable, templateUrl } = this.props;
    if (!enable) { return (<span />); }

    const { modalVisible } = this.state;
    return (
      <div>
        {
          modalVisible &&
          <Modal {...this.getModalProps()} >
            <Row>
              下载模板：
              <span>
                <a href={templateUrl} target="_blank"> <Icon type="download" />下载模板</a>
              </span>
            </Row>
            <Row>
              导入EXCEL：
              <span>
                <Upload {...this.getUploadProps()}>
                  <Button>
                    <Icon type="upload" /> 选择文件上传
                  </Button>
                </Upload>
              </span>
            </Row>
          </Modal>
        }
        <Button icon="upload" onClick={this.toggleModal} type="primary" >导入</Button>
      </div>
    );
  }
}

ImportButton.propTypes = {
  enable: PropTypes.bool,
  onCompleted: PropTypes.func,
  uploadData: PropTypes.object,
  templateUrl: PropTypes.string,
  uploadUrl: PropTypes.string,
};

export default ImportButton;
