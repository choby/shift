import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import { request } from 'utils'
import styles from './OrgTree.less'

/*
* 组织树
*/
export interface OrgTreeProps {
  
  /* 是否显示连线 */
  showLine?: boolean;

  /* class name */
  className?: string;

  /** 是否支持多选 */
  multiple?: boolean;

  /** 是否支持选中 */
  checkable?: boolean;

  /** 点击复选框触发 */
  onCheck?: (checkedKeys: Array<string>, e: AntTreeNodeEvent) => void;

  /** 点击树节点触发 */
  //onSelect?: (selectedKeys: Array<string>) => void;
  
  onSelect?: (selectedKeys: Array<string>, node: Object, rootKey : any, ) => void;

  /** 异步加载数据 */
  loadData?: (node: AntTreeNode) => PromiseLike<any>;

  /** 展开/收起节点时触发 */
  onExpand?: (expandedKeys: Array<string>, info: {
      node: AntTreeNode;
      expanded: boolean;
  }) => void | PromiseLike<any>;

  /** 响应右键点击 */
  onRightClick?: (options: AntTreeNodeMouseEvent) => void;

  /* 样式 */
  style?: React.CSSProperties;
  
  /* 树结点数据 url, 带账套 */
  treeDataUrl: string;
}

class OrgTree extends React.Component<OrgTreeProps> {
  constructor (props) { //属性
    super(props);
    this.state = {
      selectedKeys:[],//选择keys 
      checktedKeys:[],//勾选keys
      expandedKeys: [], //展开结点
      treeData: [], //树数据
      tempData: [], //临时数据 
      rootKey: 0, //根结点
    };
  }

  //默认加载
  componentDidMount () {
    this.getTreeData();    
  }

  // 获取数据url
  getTreeData = () => {
    const { treeDataUrl } = this.props;
    let nodeDatas = [];
    
    if(treeDataUrl){
      this.promise = request({        
        url: `${treeDataUrl}`,          
        data: {},
      }).then((result) => {
        if(result && result.success){//加载到treeData
          if (result.data){
            let rootKey =0; //'root' + result.data.id; //增加root 判断是否能够查询
            result.data.id = rootKey;
            let nodes = this.mapTreeData(result.data);
            this.setState({ treeData: [nodes],rootKey});
            let expandedKeys = this.state.expandedKeys;
            expandedKeys.push(rootKey.toString());
            this.setState({ expandedKeys});
          }
        }        
      });
    }     
  }

  // 选择事件
  onSelect = (selectedKeys,e) => {
    this.setState({selectedKeys: selectedKeys});
    if(this.props.onSelect && typeof this.props.onSelect === 'function'){
      this.props.onSelect(selectedKeys,e.node.props,this.state.rootKey,);//状态提升
    }    
  }  

  // 勾选事件
  onCheck = (checkedKeys,e) => {
    this.setState({checkedKeys: checkedKeys});
  }

  // 展开事件
  onExpand = (expandedKeys,expandedNode) => {
    this.setState({ expandedKeys });
  }

  mapTreeData = (data) => {
    let node;
    if (data) {
      node = {key: data.id , title: data.name};
      if (data.children && data.children.length){
        node.children = data.children.map((item) => {
          return this.mapTreeData(item);
        });
      }
      return node;
    }
  }

  //递归渲染树结点
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }
  
  render() {

    const { checkable,multiple,className } = this.props; 

    return (
      <Tree   
        className = {`${styles.tree} ${className}`}     
        onSelect={this.onSelect}        
        expandedKeys = {this.state.expandedKeys}
        showLine
        onExpand = {this.onExpand}
        checkable={checkable}
        multiple={multiple}
        // loadData = {this.onLoadData}
        selectedKeys = {this.state.selectedKeys}
      >
         {this.renderTreeNodes(this.state.treeData)} 
      </Tree>
    );
  }


}

export default OrgTree;


