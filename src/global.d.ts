interface String {
  // 连字符转驼峰
  hyphenToHump(): string;
  // 驼峰转连字符
  humpToHyphen(): string;
}

interface Date {
  // 日期格式化
  format(format: string):string
}

interface Array<T> {
  //数组元素去重
  distinct(): Array<T>
}
