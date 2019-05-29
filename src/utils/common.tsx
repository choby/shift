import { DatePicker, Input, InputNumber, Select, TreeSelect } from 'antd';
import { routerRedux } from 'dva/router';
import { ReactNode } from 'react';
import store from "../index";

export function getDataTableScrollWidth(columns: any[], hasOperation = false) {
  let xScrollWidth = hasOperation ? 120 : 0;
  columns.map(c => {
    if (c.children) {
      c.children.map(cc => {
        xScrollWidth += cc.width;
      });
    } else {
      xScrollWidth += c.width;
    }
  });
  return xScrollWidth;
}

export function getFormItemComponent(type: string, textType: string, reserve: any[] = []): any {
  switch (type) {
    case 'LIST':
      return (
        <Select>
          {reserve.map(r => {
            return (
              <Select.Option value={`${r.id}`} key={`${r.id}`}>
                {' '}
                {r.text}
              </Select.Option>
            );
          })}
        </Select>
      );
    case 'TREE':
      const TreeNode = TreeSelect.TreeNode;
      const getTreeNodes = (data): ReactNode => {
        return data.map(d => {
          return (
            <TreeNode value={`${d.id}`} title={d.text} key={d.id}>
              {d.children && d.children.length && getTreeNodes(d.children)}
            </TreeNode>
          );
        });
      };
      return <TreeSelect treeDefaultExpandAll={true}>{getTreeNodes(reserve)}</TreeSelect>;
    default:
      switch (textType) {
        case 'TEXT':
          return <Input />;
        case 'DIGITAL':
          return <InputNumber />;

        case 'DATE':
          return <DatePicker />;
        case 'PERCENT':
          return (
            <InputNumber
              defaultValue={0}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            />
          );
        default:
          return <Input />;
      }
  }
}

export function ouputRemoteHTML(htmlText) {
  return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
}

export function isDigitOrLetter(text) {
  var Regx = /^[A-Za-z0-9]*$/;
  if (Regx.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function getAliyunImage(originalUrl, width, height) {
  return `${originalUrl}?x-oss-process=image/resize,m_pad,w_${width},h_${height}`;
}

export function removeSpaceAndSpecialChars(text) {
  return text.replace(/[\t\n\v\f\r\s\"]/gi, '');
}


export function linkTo(page: string) {
  window.g_app._store.dispatch(routerRedux.push(page))
}
