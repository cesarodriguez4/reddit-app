import React, { Component } from 'react';
import './App.css';
import 'blueprint-css/dist/blueprint.css';
import { Div } from './components/BPDiv';
import { observer, inject } from 'mobx-react';
import {Entry} from './store/Store';
import { observable, computed } from 'mobx';
import { EntryItem } from './components/EntryItem';
import { Header } from './components/Header';
import { EntryDetails } from './components/EntryDetails';
import { Paginator } from './components/Paginator';

type StoreType = {
  get_entries: Array<Entry>;
  fetchEntries: () => void;
  selectEntry: (entry: Entry) => void;
  isLoading: boolean;
  selected: string;
  totalPages: number;
  selectedPage: number;
  setSelectedPage: () => void; 
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

  @computed get details() {
    return this.props.store?.get_entries.find(e => e.id === this.props.store?.selected)
  }

  handleSelectedEntry = (e: Entry) => {
    this.props.store?.selectEntry(e);
  }

  render() {
    if (this.props.store?.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Div>
        <Header placeholder="Reddit's top entries"/>
        <Div bp="grid 6" className="App">
          <Div>
            {this.props.store?.get_entries.map(e => <EntryItem key={e.id}  onSelectedEntry={this.handleSelectedEntry} entry={e}/>)}
          </Div>
          <Div>
            <Header placeholder="Entry Details"/>
            <EntryDetails entry={this.details} />
          </Div>
        </Div>
        <Paginator
          onSelectedPage={this.props.store?.setSelectedPage}
          currentPage={this.props.store?.selectedPage}
          totalPages={this.props.store?.totalPages}
        />
      </Div>
    );
  }
}


export default App;
