import React from 'react';
import { ColumnProps } from 'antd/lib/table';

export interface ColumnProps<T> extends ColumnProps<T> {
  type: any
}

export interface DataTableProps {
  onChange?: React.FormEventHandler<any>;
  onSave?: React.FormEventHandler<any>;
  onCreateOrEdit?: React.FormEventHandler<any>;
  bordered?: boolean;
  deletable?: boolean;
  editable?: boolean;
  transport?: any;
  rowKey: string;
  pagination?: any;
  columns: any[];
  dataSource?: any[];
  linkButton?: any; // 操作列添加链接按钮  { icon:'', title:'',url:''}
  createPermissionCode?: string; //添加权限码
  editPermissionCode?: string; //编辑权限码
  deletePermissionCode?: string; //删除权限码
  viewPermissionCode?: string;//查看权限码
  ref?: any;
  fixed?: boolean;
  scroll?: object;
}
export default class DataTable extends React.Component<DataTableProps,any>{
  constructor(props: any);
  refetch: (pagination: any, filters: any, sorter: any) => void;
  fetch: () => void;
  transport: any;
  rowKey: string;
  pagination: any | boolean;
  columns: any[];
  dataSource: any[];
  onChange: () => void;
  onSave: () => void;
  onCreateOrEdit: () => void;
  bordered: boolean;
}
