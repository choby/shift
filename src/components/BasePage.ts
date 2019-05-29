import * as React from 'react'
import { IPageProps } from 'types'

export class BasePage extends React.Component<IPageProps, {}>{
  constructor(props: IPageProps) {
    super(props);
  }
  props: IPageProps;
}
