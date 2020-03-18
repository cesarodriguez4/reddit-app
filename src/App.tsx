import React, { Component } from 'react';
import './App.css';
import 'blueprint-css/dist/blueprint.css';
import { Div } from './components/BPDiv';
import { observer, inject } from 'mobx-react';
import {Entry} from './store/Store';
import { observable } from 'mobx';

type Props = {
  store?: Array<Entry>
}
@inject('store')
@observer
export class App extends Component<Props> {
  @observable private counter: number = 0
  render() {
    return (
      <Div className="App">
        {this.counter}
      </Div>
    );
  }
}


export default App;
