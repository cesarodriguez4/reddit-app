import React from 'react';
import { Div } from './BPDiv';
import { Entry } from '../store/Store';
import { validURL } from '../util/regex';
import { GetTimeAgo } from '../util/timeago';

type Props = {
  entry: Entry;
  onSelectedEntry: (entry: Entry) => void;
  onRemovedEntry: (entry: Entry) => void;
}

export const EntryItem = (props: Props) => {

    const openImage = (url: string) => {
        window.open(url, '_blank')?.focus();
    }

    const {entry} = props;
    return (
        <Div onClick={() => props.onSelectedEntry(entry)} className="entry" bp="grid">
            <Div bp="3">
                {validURL(entry.thumbnail) ? <img onClick={() => openImage(entry.thumbnail)} alt={entry.title} src={entry.thumbnail} /> : null }
            </Div>
            <Div bp="9">
                <Div>
                    <span className="entry-title">{entry.title}</span>
                </Div>
                <Div bp="grid 6">
                    <Div>submitted: {GetTimeAgo(Number(entry?.entryDate))} </Div>
                    <span> by {entry.author}</span>
                </Div>
                <Div bp="grid 4">
                    <Div>
                        <span>comments: {entry.numComments}</span>
                    </Div>
                    <Div onClick={() => props.onRemovedEntry(entry)}>Hide</Div>
                </Div>
                <Div bp="grid 12">
                    <span>Status: {entry.readStatus? 'Readed': 'Unreaded'}</span>
                </Div>
            </Div>
        </Div>
    );
}


