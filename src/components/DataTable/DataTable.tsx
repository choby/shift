import { Button, Input, Message, Popconfirm, Table } from "antd";
import { dataType } from "common";
import { DropOption } from 'components'
import lodash from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { cloneDeep, config, request } from "utils";
import { permission } from "utils";
import Formatter from "../Formatter";
import { DataTableProps } from "./DataTable.d"
import styles from "./DataTable.less";
import DeleteButtonBar from "./DeleteButtonBar";
import DetailButtonBar from "./DetailButtonBar";
import EditableCell from "./EditableCell";
import EditButtonBar from "./EditButtonBar";

// 基于ant的Table控件封装数据网格控件，带权限验证、根据列类型渲染不同的输入控件
class DataTable extends React.Component<DataTableProps, {}> {
  constructor(props) {
    super(props);
    const { operateMode, dataSource, pagination, creatable } = props;
    if (typeof (pagination) === "object") {
      pagination.showSizeChanger = true;
      pagination.showQuickJumper = true;
      pagination.showTotal = (total:number, range:number[]) => `共 ${total} 条`;
      pagination.current = 1;
    }

    let columns = props.columns;
    this.packageColumns(columns);
    this.state = {
      loading: false,
      dataSource,
      transportData: {},
      pagination,
      columns, // 调用方传入的列定义
      cacheEditingRows: [],
      editedRowIndex: [], // 已编辑过的行索引，远程api调用标识。//todo：支持批量编辑
      creatable,
      creating: false,
      size: this.props.size ? this.props.size : "small"
    };
  }

  packageColumns(columns) {
    const { operateMode, dataSource, editable, deletable, creatable} = this.props;
    for (const column of columns) {
      if (column.children) {
        column.children.forEach(child => {
          const render = child.render;
          child.render = (text, record, index) => this.renderColumn(this.state.cacheEditingRows, this.state.dataSource, index, child, text, render);
        });
        continue;
      }
      const render = column.render;
      column.render = (text, record, index) => this.renderColumn(this.state.cacheEditingRows, this.state.dataSource, index, column, text, render);
    }

    if (columns.find(((col) => { return col.dataIndex == "operation"; }))) {
      return;
    }
    if ((editable || deletable || creatable) && !operateMode || operateMode === "inline") { // 编辑模式：行编辑、弹出框编辑  //toto:需要实现弹出编辑
      //const { fixable } = this.props;
      // 插入“操作”列
      columns.push({
        title: "操作",
        dataIndex: "operation",
        width: 120,
        className: "operation",
        //fixed: fixable === true ? "right" : false,
        render: (text, record, index) => this.renderOperationColumn(text, record, index),
      });
    }
    return columns;
  }

  componentDidMount() {
    if (this.props.transport) {
      this.fetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    const staticNextProps = lodash.cloneDeep(nextProps);

    delete staticNextProps.columns;
    delete staticNextProps.onSave;
    delete staticNextProps.aggregates;

    const { columns, onSave, aggregates, ...otherProps } = this.props;
    this.packageColumns(nextProps.columns);
    this.setState({ columns: nextProps.columns });

    // 本地编辑时，刷新数据源 //如果改数据源条数为0，也强制刷新
    if (nextProps.dataSource){
        let dataSource = [...nextProps.dataSource];
        let pagination = {...nextProps.pagination};
        this.pushAggregateRow(dataSource);
        this.setState({ dataSource,pagination });
        return;
    }
    // lodash.isEqual 对function 的判等是无效的
    if (!lodash.isEqual(staticNextProps, otherProps)) {
      this.props = nextProps
      this.fetch();
    }
  }

  refetch = (pagination,filters, sorter) => {
    const pager = this.state.pagination;
    pager.current = !pagination ? 1 : pagination.current;
    
    let transportData = this.state.transportData;
    
    // 查询时, 重置条件
    // 分页时，保留条件
    if(!pagination || filters && Object.keys(filters).length != 0){
      transportData = { ...filters };   // new       
    } 
    
    transportData.results = pagination ? pagination.pageSize : pager.pageSize;
    transportData.page = pager.current;
    transportData.sortField =  sorter ? sorter.field : null;
    transportData.sortOrder = sorter ? sorter.order : null;

    this.setState({
      pagination: pagination ? pagination : pager,
      transportData,
    }, () => {
      this.fetch();
    });
  }

  // 载入、刷新数据
  fetch = () => {

    if (!this.props.transport) {
      const { dataSource} = this.props;
      if (dataSource) {
        this.pushAggregateRow(dataSource);
      }
      return;
    }
    const { transport: { read, dataKey } } = this.props;
    let { transportData, cacheEditingRows, creating } = this.state;

    const { apiPrefix } = config;

    cacheEditingRows = [];// 复位编辑状态
    creating = false;// 复位新增状态
    this.setState({ loading: true, cacheEditingRows, creating });

    if (!read) {// url 为空时，不执行
      this.setState({loading: false});
      return;
    }

    this.promise = request({
      url: `${apiPrefix}${read}`,
      data: {
        ...transportData,
      },
    }).then((result) => {
      if (!this.refs.DataTable) {
        return;
      }
      const { pagination } = this.state;

      if (!result.data && dataKey){
        result.data = {count: 0 , dataKey: []};
      }
      const dataSource = dataKey ? result.data[dataKey] : result.data;

      this.pushCreateRowBar(dataSource);
      this.pushAggregateRow(dataSource);

      if (typeof (pagination) == "object") {
        pagination.total = result.data.count || pagination.total;
      }

      this.setState({
        loading: false,
        dataSource,
        pagination,
      });
    });
  }

  // 添加新增按钮行
  pushCreateRowBar(dataSource) {
    if (!this.props.creatable) { return; }
    const { columns } = this.state;
    const createBar = {};

    // 新增行设置默认值
    columns.map((column) => {
      createBar[column.dataIndex] = "";
    });

    const { rowKey } = this.props;
    createBar[rowKey] = -1;
    dataSource.push(createBar);// 数据源中插入新增行
  }

  // 添加统计行
  pushAggregateRow(dataSource) {
    const { aggregates } = this.props;
    if (!aggregates) return;

    const { columns } = this.state;
    if (!dataSource || !dataSource.length) return;

    // 检测row key 是否为空
    const { rowKey } = this.props;
    if (rowKey && rowKey.length){
      let fIndex = dataSource.findIndex(x => {
        return x[rowKey] == -2;
      });
      if (fIndex > -1) {
        this.updateAggregateRow(dataSource);
        return;
      }
    }

    const aggregateBar = {};
    function recursion(columns) {
      // 新增行设置默认值
      columns.map((column) => {
        if (column.children) {
          recursion(column.children);
          return;
        }
        const aggregate = aggregates[column.dataIndex];
        if (aggregate) {
          if (typeof aggregate === "string")
            aggregateBar[column.dataIndex] = aggregate;
          if (typeof aggregate === "function")
            aggregateBar[column.dataIndex] = aggregate(column.dataIndex, dataSource); // 计算统计列
        }
      });
    }
    recursion(columns);
    aggregateBar[rowKey] = -2; // 统计行标识
    dataSource.push(aggregateBar);// 数据源中插入新增行
  }

  // 添加统计行
  updateAggregateRow(dataSource) {
    const { aggregates } = this.props;
    if (!aggregates) return;

    const { columns } = this.state;
    if (!dataSource || !dataSource.length) return;

    // 检测row key 是否为空
    const { rowKey } = this.props;
    let fIndex = -1 ;
    if (rowKey && rowKey.length){
      fIndex = dataSource.findIndex(x => {
        return x[rowKey] == -2;
      });
      if (fIndex == -1) return;
    }
    const aggregateBar = {};
    function recursion(columns) {

      // 新增行设置默认值
      columns.map((column) => {
        if (column.children) {
          recursion(column.children);
          return;
        }
        const aggregate = aggregates[column.dataIndex];
        if (aggregate) {

          if (typeof aggregate === "string")
            aggregateBar[column.dataIndex] = aggregate;
          if (typeof aggregate === "function")
            aggregateBar[column.dataIndex] = aggregate(column.dataIndex, dataSource); // 计算统计列
        }
      });
    }
    recursion(columns);
    aggregateBar[rowKey] = -2; // 统计行标识


    dataSource[fIndex] = aggregateBar;// 更新
  }

  // 渲染操作列
  renderOperationColumn(text, record, index) {
    const rowData = this.state.dataSource[index];
    const { createPermissionCode, editPermissionCode, deletePermissionCode, viewPermissionCode } = this.props;
    let editable = this.props.editable && (!editPermissionCode || permission.verify(editPermissionCode)) // todo:根据权限验证当前用户是否能编辑该行。需要实现接口
      && rowData.key != 0;
    let deletable = this.props.deletable && (!deletePermissionCode || permission.verify(deletePermissionCode));// todo:根据权限验证当前用户是否能删除该行。需要实现接口
    let creatable = this.props.creatable && (!createPermissionCode || permission.verify(createPermissionCode));// todo:根据权限验证当前用户是否能新增行。需要实现接口
    const rowEditing = this.state.cacheEditingRows.findIndex(r => r.index === index) > -1;// 当前行是否处于编辑模式
    const { rowKey } = this.props;
    if (rowData[rowKey] == -2) {
      return null;
    }
    if (creatable && rowData[rowKey] == -1) {
      return <Button size={this.state.size} icon="plus" type="primary" onClick={() => this.openAdd()} >新增</Button>;
    }
    if (creatable && rowData[rowKey] == 0) {
      return (<div className={styles.addrow}>
        <Button size={this.state.size} icon="check" type="primary" onClick={() => this.saveAdd()} />
        <Button size={this.state.size} icon="close" type="danger" onClick={() => this.cancelAdd()} />
      </div>);
    }

    // 是否显示详情按钮
    // showDetail 整个表格是否显示详情
    // detailUrl 详情链接url, 结合record.id 生成新url,
    // showDetailEachRecord 具体行是否显示详情按钮, 函数类型，结合record判断
    let { showOperationsEachRecord, showDetail,detailUrl,showDetailEachRecord,dropDownOperations } = this.props;
    let showOperations = true;
    if (showOperationsEachRecord && typeof showOperationsEachRecord == 'function'){
      showOperations = showOperationsEachRecord(record); // 行操作控制开关
      if (!showOperations) {
        editable = deletable = showDetail = showOperations;
        dropDownOperations = null;
      }
    }
    if (showOperations){
      if (detailUrl && !detailUrl.endsWith('/')) detailUrl += '/';
      if (showDetail && showDetailEachRecord && typeof showDetailEachRecord == 'function')
        showDetail = showDetailEachRecord(record);// 明细控制开关
    }

    return (
      <div>
        <EditButtonBar
          size={this.state.size}
          enable={editable}
          editing={rowEditing}
          onOpenEdit={() => this.openEdit(index)}
          onConfirmEdit={() => this.cancelEdit(index)}
          onCancelEdit={() => this.completeEdit(index)}
        />
        <DeleteButtonBar
          size={ this.state.size }
          enable={ deletable && !rowEditing }
          onConfirmDelete={() => this.delete(index)}
        />
        <DetailButtonBar
         size={ this.state.size }
          enable={(!viewPermissionCode || permission.verify(viewPermissionCode)) && showDetail && !rowEditing }
         detailUrl = { `${detailUrl + record.id}` }
        />
        {
          dropDownOperations &&
          <DropOption onMenuClick= {e => dropDownOperations.onMenuClick(record,e)}
            menuOptions={dropDownOperations.menuOptions}/>
        }
      </div>
    );
  }

  // 渲染数据列方法，根据“列编辑权限”、“行编辑状态”、“列编辑状态”做渲染。
  // “行编辑权限”已在调用处处理，如果不具有“行编辑权限”，该方法不会执行，因此该方法只负责渲染
  renderColumn(cacheEditingRows, data, index, column, text, render) {
    if (!data || !data[index] || data[index][this.props.rowKey] == -1) {
      return;
    }

    if (data[index][this.props.rowKey] == -2)// 统计列
      return <span className="collect"><Formatter value={text} type={column.type} format={column.format} /></span>;

      const { editable, type, editor, complex } = column;
    if (!editable) {
      if (render) { return render(text, data[index], index); }// render优先，如果设置了render则忽略format
      return <Formatter value={text} type={column.type} format={column.format} />;
    }

    const customRender = render ? () => render(text, data[index], index) : null;
    const rowEditing = cacheEditingRows.find(r => r.index === index);// .includes(index);
    const eventTracking = {
      model: data[index],
      values: {},
      dataSource: data,
      sender: undefined,
    };

    return (<EditableCell
      editable={editable && rowEditing}
      render={customRender}
      format={column.format}
      value={text}
      type={type}
      editor={editor}
      dataIndex={column.dataIndex}
      eventTracking={eventTracking}
      complex={complex}
      cellChange={value => this.cellChange(column.dataIndex, complex, index, value)}
      onChange={this.props.onChange}
      size={this.state.size}
    />);
  }

  cellChange(key, complex, index, value) {
    const { dataSource, editedRowIndex } = this.state;
    if (complex) {
      let complexObj = dataSource[index][complex.key];
      if(!complexObj) complexObj = {};
      Object.keys(complex).map((k) => {
        if (k !== "key") {
          complexObj[k] = value[complex[k]];
        }
      });
    } else {
      dataSource[index][key] = value;
    }
    if (!editedRowIndex.includes(index)) {
      editedRowIndex.push(index);
    }
    this.setState({ dataSource, editedRowIndex });
  }

  // 客户端新增行
  openAdd() {
    let { dataSource, columns, cacheEditingRows } = this.state;

    cacheEditingRows.map((r) => {
      if (r.data[this.props.rowKey] > 0)
        dataSource.splice(r.index, 1, r.data);// 还原行数据,主要是用来取消已在编辑状态下的行
    });
    cacheEditingRows = [];// 删除已缓存的行
    if (dataSource.find(data => data[this.props.rowKey] === 0)) {
      Message.error("已存在尚未保存的新增行。");
      return;
    }
    const newRow = {};
    function getDefaultValue(type) {
      switch (type) {
        case undefined:
        case null:
        case dataType.text:
          return "";
        case dataType.currency:
        case dataType.integer:
        case dataType.decimal:
        case dataType.percentage:
          return 0;
        case dataType.date:
          return new Date().format("yyyy-MM-dd");
        case dataType.datetime:
          return new Date().format("yyyy-MM-dd hh:mm:ss");
        default:
          return "";
      }
    }

    // 新增行设置默认值
    columns.map((column) => {
      if (column.complex) {
        newRow[column.complex.key] = {};
      }
      else {
        newRow[column.dataIndex] = getDefaultValue(column.type);
      }
    });
    const { rowKey, aggregates } = this.props;
    newRow[rowKey] = 0;
    const newRowIndex = aggregates ? dataSource.length - 2 : dataSource.length - 1;
    dataSource.splice(newRowIndex, 0, newRow);// 数据源中插入新增行

    if (this.props.onCreateOrEdit) {
      this.props.onCreateOrEdit({ model: newRow, dataSource });
    }

    cacheEditingRows.push({
      index: newRowIndex,
      data: newRow,
    }); // 新增行设置为编辑状态
    this.setState({ dataSource, columns, cacheEditingRows, creating: true });
  }

  // 和服务器同步新增行
  saveAdd() {
    const { dataSource } = this.state;
    const newData = dataSource.find(data => data[this.props.rowKey] == 0);

    if (this.props.onSave) {
      if (!this.props.onSave({ model: newData, dataSource })) {
        return;
      }
    }

    const loadingmsg = Message.loading("正在尝试与服务器同步以保存数据...", 0);
    const { transport: { create } } = this.props;
    const { apiPrefix } = config;

    request({
      url: `${apiPrefix}${create}`,
      data: {
        ...newData,
        userId: 111, // todo:用户id
      },
      method: "post",
    }).then((result) => {
      setTimeout(loadingmsg, 0);
      if (result.success) {
        Message.success("保存成功。");
        this.fetch();

      } else {
        Message.error(`保存失败，失败原因：${result.message}`);
      }
    });
  }

  // 取消新增，不需要和服务器同步
  cancelAdd() {
    const { dataSource, cacheEditingRows } = this.state;
    const newRowIndex = dataSource.findIndex(data => data[this.props.rowKey] == 0);
    dataSource.splice(newRowIndex, 1);// 删除数据源中的新增行
    cacheEditingRows.splice(0, 1);// 删除新增行的编辑状态
    this.setState({ dataSource, cacheEditingRows, creating: false }); // 取消新增状态
  }

  // 删除行
  delete(index) {
    let { dataSource, creating, cacheEditingRows } = this.state;

    const { onDelete } = this.props;
    if (onDelete){
      // 前端校验或前端操作
      if (!onDelete(index,dataSource)) return;
    }

    const loadingmsg = Message.loading("正在尝试与服务器同步以删除数据...", 0);
    // let { dataSource, creating, cacheEditingRows } = this.state;
    let data;
    if (creating) {
      dataSource.splice(0, 1);// 删除数据源中的新增行
      cacheEditingRows.splice(0, 1);// 删除新增行的编辑状态
      data = dataSource[index - 1];
      this.setState({ dataSource, cacheEditingRows, creating: false });// 取消新增状态
    } else { data = dataSource[index]; }

    const { transport: { destory }, rowKey } = this.props;
    const { apiPrefix } = config;

    request({
      url: `${apiPrefix}${destory}`,
      data: {
        ...data,
        userId: 111, // todo:用户id
      },
      method: "delete",
    }).then((result) => {
      setTimeout(loadingmsg, 0);
      if (result.success) {
        Message.success("删除成功。");
        this.fetch();

      } else {
        Message.error(`删除失败，失败原因：${result.message}`);
      }
    });
  }

  // 控制数据行、列进入编辑状态
  openEdit(index) {
    let { dataSource, editedRowIndex, cacheEditingRows, columns, creating } = this.state;
    // 把即将编辑的行数据缓存，以便后面撤销修改时还原
    const cacheRow = { index, data: cloneDeep(dataSource[index]) };

    if (cacheEditingRows.length) {
      cacheEditingRows.forEach(element => {
        dataSource.splice(element.index, 1, element.data);// 还原行数据
      });
      // cacheEditingRows.splice(element.index, 1);// 删除已缓存的行
      cacheEditingRows = [];// cacheEditingRows.splice(0, 1);// 清除上次编辑状态，如果不清楚，则可以支持批量编辑
    }

    if (creating) { // 如果已处于新增状态
      // 删除掉未保存的新增行
      const newRowIndex = dataSource.findIndex(data => data[this.props.rowKey] == 0);
      dataSource.splice(newRowIndex, 1);
      cacheEditingRows.push(cacheRow);// 标识该行处于编辑状态
      creating = false;
    } else {
      cacheEditingRows.push(cacheRow);// 标识该行处于编辑状态
    }
    // 触发编辑前的事件，如果事件中对数据进行了修改，则缓存改行索引
    if (this.props.onCreateOrEdit) {
      const e = { model: dataSource[index], dataSource };
      this.props.onCreateOrEdit(e);
      Object.keys(e.model).map((key) => {
        if (cacheRow[key] != e.model[key]) {
          if (!editedRowIndex.includes(index)) {
            editedRowIndex.push(index);
          }
        }
      });
    }
    this.setState({ dataSource, editedRowIndex, cacheEditingRows, columns, creating });
  }

  // 完成编辑，编辑完成后和服务器同步的工作放在shouldComponentUpdate中完成
  completeEdit(index) {
    let { editedRowIndex, creating, cacheEditingRows } = this.state;

    if (!creating && editedRowIndex && editedRowIndex.findIndex(i => i === index) > -1) {
      const { dataSource, columns } = this.state;
      const data = dataSource[editedRowIndex[0]];// 后续可以遍历支持多行

      // 用于检验数据或数据适配
      if (this.props.onSave) {
        if (!this.props.onSave({ model: data, dataSource })) {
          return;
        }
      }

      // 前端暂存数据, 与dataSource 配合使用
      if (this.props.dataSource && this.props.dataSource.length){
        cacheEditingRows.splice(cacheEditingRows.findIndex(r => r.index === index), 1);// 取消行编辑状态
        editedRowIndex = [];
        this.updateAggregateRow(dataSource);
        this.setState({ dataSource, cacheEditingRows, editedRowIndex, columns });
        return;
      }

      const loadingmsg = Message.loading("正在尝试与服务器同步以更新数据...", 0);
      const { transport: { update } } = this.props;
      const { apiPrefix } = config;

      request({
        url: `${apiPrefix}${update}`,
        data: {
          ...data,
          userId: 111, // todo:用户id
        },
        method: "put",
      }).then((result) => {
        setTimeout(loadingmsg, 0);
        if (result.success) {
          cacheEditingRows.splice(cacheEditingRows.findIndex(r => r.index === index), 1);// 取消行编辑状态
          editedRowIndex = [];
          this.setState({ dataSource, cacheEditingRows, editedRowIndex, columns, loading: false });
          Message.success("更新成功。");
          this.fetch();
        } else {
          Message.error(`更新失败，失败原因：${result.message}`);
        }
      });
    } else {
      cacheEditingRows.splice(cacheEditingRows.findIndex(r => r.index === cacheEditingRows), 1);
      this.setState({ cacheEditingRows });
      Message.info("没有需要保存的修改。");
    }
  }

  cancelEdit(index) {
    const { cacheEditingRows, dataSource } = this.state;
    dataSource.splice(index, 1, cacheEditingRows.find(r => r.index === index).data);// 还原行数据
    cacheEditingRows.splice(cacheEditingRows.findIndex(r => r.index === index), 1);// 删除已缓存的行
    this.setState({ dataSource, cacheEditingRows });
  }

  render() {
    const { loading, dataSource, pagination, columns, size } = this.state;

    return (
      <div>
        <Table
          ref="DataTable"
          size={size}
          {...this.props}
          bordered={this.props.bordered != false}
          loading={loading}
          onChange={this.refetch}
          // {...tableProps}
          pagination={pagination}
          dataSource={dataSource}
          columns={columns}
          rowClassName={(record,index)=>index % 2===0?"":"oddRow"}
        />
      </div>
    );
  }
}


DataTable.propTypes = {
  transport: PropTypes.object,
  rowKey: PropTypes.string,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  saveOnLocal : PropTypes.bool, // 本地保存与DataSource 配合使用， 适用于整个表格修改，最后全部提交场景
  onChange: PropTypes.func,// 单元格值发生变化时的事件
  onSave: PropTypes.func,// 保存行时的事件
  onCreateOrEdit: PropTypes.func, // 打开新增行或进入编辑状态的事件
  bordered: PropTypes.bool,
  onDelete : PropTypes.func, // 删除方法
  //fixable:PropTypes.bool
};

export default DataTable;
