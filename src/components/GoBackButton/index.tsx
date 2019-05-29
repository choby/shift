import React from 'react';
import { Button } from 'antd';


// 返回上一页
const GoBackButton = ({ showIcon = true }) => {
  return <Button icon={showIcon ? "rollback":''} onClick={() => { history.back(); }}>返回</Button>;
};

export default GoBackButton;
