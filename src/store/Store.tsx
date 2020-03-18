import { observable, action, runInAction, configure } from 'mobx'
import { getEntries } from '../requests';

configure({ enforceActions: "observed" })

export type Entry = {
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

    @observable errorFetching: boolean = false;

    @action addEntry(element: Entry) {
        this.entries.push(element);
    }
    @action async fetchEntries() {
        this.isLoading = true;
        try {
            const response = await getEntries();
            const res = await response.json();
            const data: Array<Entry> = res.map((element: any) => {
                console.log(element);
                const entry: Entry = {
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