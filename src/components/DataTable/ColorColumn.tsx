import { hexToRgb } from 'utils';
import styles from './DataTable.less';

const getBackgroundColor = color => {
  const rgb = hexToRgb(color);// 把十六进制颜色转换成rgba能识别的值
  const alphaBackground = `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`;// 设置背景色，并半透明
  return alphaBackground;
}

const getColorColumn = (title: string,
  dataIndex: string,
  width: string | number,
  color: string,
  children:any[]|null) => {


  const titleStyle = {
    border: `${color} 1px solid`,
    width: '100%',
    height: '39px',
    lineHeight:'39px',
    backgroundColor: getBackgroundColor(color),
  };

  const column = {
    dataIndex,
    key:dataIndex,
    title: <div style={titleStyle}>{title}</div>,
    width,
    className: styles.colorCell,
    children,
    render: (text, record, index) => renderCell(text, record, index, color, true)
  };

  return column;
}

const getColorChildColumn = (title: string,
  dataIndex: string,
  width: string | number,
  color: string,
  isLeftmost: boolean) => {
  const column = {};

  const style = {
    border: `${color} 1px solid`,
    borderTop: 'none',
    width: '100%',
    height: '39px',
    lineHeight: '39px',
    backgroundColor: getBackgroundColor(color),
  };

  if (isLeftmost !== true) {
    style.borderLeft = 'none';
  }


  column.dataIndex = dataIndex;
  column.title = <div style={style}>{title}</div>;
  column.width = width;
  column.className = styles.colorCell;
  column.render = (text, record, index) => renderCell(text, record, index, color, isLeftmost);
  return column;
}


const renderCell = (text: any, record: any, index:number, color:string, isLeftmost:boolean) => {
  if (isLeftmost === true)
    return renderLeftmostCell(text, record, index, color);
  const oddStyle = {
    border: `${color} 0.5px solid`,
    borderTop: 'none',
    borderLeft: 'none',
    width: '100%',
    height: '31px',
    lineHeight: '31px',
    backgroundColor: getBackgroundColor(color),
  };
  const evenStyle = {
    border: `${color} 1px solid`,
    borderTop: 'none',
    borderLeft: 'none',
    width: '100%',
    height: '31px',
    lineHeight: '31px',
  };
  return index % 2 == 0 ? <div style={evenStyle}>{text}</div> : <div style={oddStyle}>{text}</div>;
}
const renderLeftmostCell = (text: any, record: any, index: number, color: string) => {
  const oddLeftStyle = {
    border: `${color} 0.5px solid`,
    borderTop: 'none',
    //borderLeft: 'none',
    width: '100%',
    height: '31px',
    lineHeight: '31px',
    backgroundColor: getBackgroundColor(color),
  };


  const evenLeftStyle = {
    border: `${color} 1px solid`,
    borderTop: 'none',
    //borderLeft: 'none',
    width: '100%',
    height: '31px',
    lineHeight: '31px',
  };

  return index % 2 == 0 ? <div style={evenLeftStyle}>{text}</div> : <div style={oddLeftStyle}>{text}</div>;
}

export { getColorColumn, getColorChildColumn };
