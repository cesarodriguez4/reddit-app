import { observable, action } from 'mobx'

export type Entry = {
    title?: string;
}

class Store {
    @observable entries: Array<Entry> = [];

    @observable isLoading: boolean = false;

    @action addEntry(element: Entry) {
        this.entries.push(element);
    }
}

const storeInstance = new Store()
export default storeInstance;