import { Search,OrgTree } from 'components';
import { Row, Checkbox, Button, Transfer, Modal } from 'antd';
import { request, cloneDeep} from 'utils'
import styles from './SelectPerson.less';
import * as React from 'react';


/*
* 选择负责人
* 搜索框输入关键字并点击搜索时，穿梭框左框进行人员筛选，部门-人员
* 勾选时，可向左或向右穿梭
* 提交时，只提交右边数据项
* 默认不加穿梭框数据
*/

class SelectPerson extends React.Component<SelectPersonProps>{
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      targetData: [], //选定数据
      targetKeys: [],
      selectedKeys: [],      
      selectedOrgId : 0,  
    }
  }

    //加载事件
  componentDidMount () {
  }

  //根据参数确定是否是搜索
  getPersonData = ( orgId, keyword ) => {

    const { searchUrl } = this.props;
    let url =  searchUrl;
    if(!orgId && !keyword) return;
    if (keyword){
      url = `${url}?keyword=${keyword}`;
    }

    if (orgId) {
      if (!keyword)
        url = `${url}?organizationId=${orgId}`;
      else
        url = `${url}&organizationId=${orgId}`;
    }

    this.promise = request({
      url: `${url}`,          
      data: {},
    }).then((result) => {      
      if(result && result.success){//加载到treeData     
        let datas = [];
        result.data.results.map((item,index)=>{
          let data = {
            key : item.id,
            title : `${item.orgName}-${item.name}`,
            description : `${item.code}-${item.name}`,
            disabled : false
          }
          datas.push(data);
        });

        // 增加已选定人
        if (this.state.targetData.length > 0 ){
          let tempDatas = [];
          //检查datas 中是否有 targetData 
          this.state.targetData.map(((item) => {
            let temp = datas.filter((data) => {
              return data.key == item.key;
            });
            if (!temp || temp.length == 0)
              tempDatas.push(item);
          }));
          //console.log('tempDatas:',tempDatas);
          if(tempDatas.length > 0)
            datas = datas.concat(tempDatas);
        }

        this.setState({dataSource: datas});
      }          
    });
  }

  modalProps = () => {
    const {visible}  = this.props;
    return {
      visible: visible,
      title:'添加负责人',
      cancelText: '取消',
      okText: '确定提交',
      width: 900,
      onCancel: this.onCancel,
      onOk: this.onSubmit,
    }
  }

    //树结点选择事件
    onSelect = (selectedKeys,data) => {
      if (selectedKeys && selectedKeys.length > 0){
        let orgId = selectedKeys[0];
        this.setState({selectedOrgId: orgId});
        this.getPersonData(orgId);
      }
    }

    //搜索事件，不向外提供
    onSearch = (data) => {
      if (data && data.keyword){
        let keyword = data.keyword;
        this.getPersonData(this.state.selectedOrgId, keyword);
      }
    }
 
    //提交
    onSubmit = (e) => {
      const {onSubmit} = this.props;
      if (onSubmit && typeof onSubmit == 'function'){
        let targetData = [];
        this.state.targetKeys.map((key)=>{
        let data = this.state.dataSource.filter((item)=> {
          return item.key == key;
        });
        targetData.push(...data);
        });
        onSubmit(targetData); //回传target keys
      }
      this.setState({visible:false});
    }

    //取消
    onCancel = (e) => {
      const { onCancel } = this.props;
      if (onCancel && typeof onCancel == 'function'){
        onCancel();
      }
    }

    //选择变化, 上层调用
    handleChange = (nextTargetKeys, direction, moveKeys) => {
      const { singleSelect } = this.props;
      if(singleSelect && nextTargetKeys.length > 1){
        message.warning("当前仅支持选择一位员工。");
        return;
      }
      let targetData = [];
      nextTargetKeys.map((key)=>{
        let data = this.state.dataSource.filter((item)=> {
          return item.key == key;
        });
        targetData.push(...data);
      });
      this.setState({targetData : targetData, targetKeys: nextTargetKeys});
    }
    
    render(){
      const { treeDataUrl, searchUrl } = this.props;
      return (
        <Modal {...this.modalProps()}>
          <Row className={styles.panel}>
            <Row className={styles.slider}>
              <Search onSearch={this.onSearch} style={{width:'240px'}}/>
              <OrgTree onSelect={this.onSelect} treeDataUrl={treeDataUrl}/>
            </Row> 
            <Row className={styles.rightslider}>
              <Transfer
                className={styles.transferbox}
                dataSource={ this.state.dataSource }
                titles={['待选', '已选']}
                listStyle={{width: 220, height: 333}}
                targetKeys={this.state.targetKeys}         //默认选中           
                onChange={this.handleChange}                        
                render= {item => item.title} 
                notFoundContent = {'列表为空'}        //没有数据时显示                                        
              />
            </Row>                
          </Row>
        </Modal>
      );
    }
  }


//定义属性
export interface SelectPersonProps {
  treeDataUrl?: String, //树结构url
  searchUrl?: String, //搜索员工url
  onCancel?: () => void, // 取消事件
  onSubmit?: (targetData: Array<Object>) => void, // 提交事件
  visiable: Boolean,
  singleSelect: Boolean, // 仅能单选
}

export default SelectPerson;
