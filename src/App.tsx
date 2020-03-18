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
  removeEntry: (entry: Entry) => void;
  removeAll: () => void;
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

  handleRemovedItem = (e: Entry) => {
    this.props.store?.removeEntry(e);
  }

  restoreState = () => {
    this.props.store?.fetchEntries();
  }

  render() {
    if (this.props.store?.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Div>
        <Header placeholder="Reddit's top entries"/>
        <Div bp="grid 1@lg 1@md 2@sm 2">
          <Div><button onClick={() => this.props.store?.removeAll()}>Remove all</button></Div>
          <Div><button onClick={() => this.restoreState()}>Restore</button></Div>
        </Div>
        <Div bp="grid 6@lg 6@md 12@sm 12" className="App">
          <Div>
            <Paginator
              onSelectedPage={this.props.store?.setSelectedPage}
              currentPage={this.props.store?.selectedPage}
              totalPages={this.props.store?.totalPages}
            />
            <Div>
              {this.props.store?.get_entries
              .map(e => {return (
                <EntryItem
                  key={e.id}
                  onSelectedEntry={this.handleSelectedEntry}
                  entry={e}
                  onRemovedEntry={this.handleRemovedItem}
                />
              )})}
            </Div>
          </Div>
          <Div className="rightside">
            <Header placeholder="Entry Details"/>
            <Div bp="grid 12">
              <EntryDetails entry={this.details} />
            </Div>
          </Div>
        </Div>
      </Div>
    );
  }
}


export default App;
