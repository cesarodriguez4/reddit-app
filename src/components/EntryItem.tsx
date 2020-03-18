import React from 'react';
import { Div } from './BPDiv';
import { Entry } from '../store/Store';
import { validURL } from '../util/regex';


type Props = {
  entry: Entry;
  onSelectedEntry: (entry: Entry) => void;
}

export const EntryItem = (props: Props) => {
    const {entry} = props;
    return (
        <Div onClick={() => props.onSelectedEntry(entry)} className="entry" bp="grid">
            <Div bp="3">
                {validURL(entry.thumbnail) ? <img alt={entry.title} src={entry.thumbnail} /> : null }
            </Div>
            <Div bp="9">
                <Div>
                    <span>{entry.title}</span>
                </Div>
                <Div bp="grid">
                    <Div>submitted: {entry.entryDate} </Div>
                    <span> by {entry.author}</span>
                </Div>
                <Div bp="grid">
                    <Div>
                        <span>comments: {entry.numComments}</span>
                    </Div>
                    <Div>Save</Div>
                    <Div>Hide</Div>
                </Div>
            </Div>
        </Div>
    );
}


