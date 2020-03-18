import { observable, action, runInAction, configure, computed } from 'mobx'
import { getEntries } from '../requests';

configure({ enforceActions: "observed" })

export type Entry = {
    id: string;
    title: string;
    author: string;
    entryDate: string;
    thumbnail: string;
    numComments: string;
    readStatus: string;
    url: string;
}

class Store {
    @observable entries: Array<Entry> = [];

    @observable isLoading: boolean = false;

    @observable selected: string = '';

    @observable errorFetching: boolean = false;

    @observable totalPages: number = 0;

    @observable selectedPage: number = 1;

    @computed get get_entries() {
        return this.entries.slice(this.selectedPage, this.selectedPage  + 5);
    }

    @action selectEntry(entry: Entry) {
        this.selected = entry.id;
    }

    @action removeAll() {
        this.entries = [];
        this.totalPages = 0;
    }

    @action removeEntry(entry: Entry) {
        const index = this.entries.indexOf(entry);
        this.entries.splice(index, 1);
    }

    @action setSelectedPage = (page: number) => {
        this.selectedPage = page;
    }

    @action async fetchEntries() {
        this.isLoading = true;
        try {
            const response = await getEntries();
            const res = await response.json();
            const data: Array<Entry> = res.map((element: any) => {
                const entry: Entry = {
                    id: element.data.id,
                    title: element.data.title,
                    author: element.data.author ? element.data.author : element.data.author_fullname,
                    entryDate: element.data.created,
                    thumbnail: element.data.thumbnail,
                    numComments: element.data.num_comments,
                    readStatus: element.data.visited,
                    url: element.data.permalink
                };
                return entry;
            });
            runInAction(() => {
                this.isLoading = false;
                this.entries = data;
                this.errorFetching = false;
                this.totalPages = Math.ceil(data.length / 5); 
            });
        } catch (error) {
            runInAction(() => {
                this.errorFetching = true;
            });
        }
    }
}

const storeInstance = new Store()
export default storeInstance;