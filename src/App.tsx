import React, { Component } from 'react';
import './App.css';
import 'blueprint-css/dist/blueprint.css';
import { Div } from './components/BPDiv';
import { observer, inject } from 'mobx-react';
import {Entry} from './store/Store';
import { observable, computed } from 'mobx';
import { EntryItem } from './components/EntryItem';
import { Header } from './components/Header';

type StoreType = {
  entries: Array<Entry>;
  fetchEntries: () => void;
}

type Props = {
  store?: StoreType;
}
@inject('store')
@observer
class App extends Component<Props> {
  @observable private counter: number = 0

  componentDidMount() {
    this.props.store?.fetchEntries();
  }

  @computed get entries() {
    return this.props.store?.entries;
  }

  render() {
    return (
      <Div>
        <Header placeholder="Reddit's top entries"/>
        <Div bp="grid 6" className="App">
          <Div>
            {this.entries?.map(e => <EntryItem entry={e}/>)}
          </Div>
          <Div>
            <Header placeholder="Entry Details"/>
          </Div>
        </Div>
      </Div>
    );
  }
}


export default App;
