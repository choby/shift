import * as React from 'react'
import { IPageProps } from './interface'

export class Page extends React.Component<IPageProps, {}>{
  constructor(props: IPageProps) {
    super(props);
  }
  props: IPageProps;
}
