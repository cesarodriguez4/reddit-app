import React from 'react';
import { Div } from './BPDiv';
import { Entry } from '../store/Store';
import { GetTimeAgo } from '../util/timeago';


type Props = {
  entry: Entry | undefined;
}

export const EntryDetails = (props: Props) => {
    const {entry} = props;
    if (!entry) {
        return <Div>Please select an entry in the list</Div>
    }
    return (
        <Div>
            <div>title: {entry?.title}</div>
            <div>Author: {entry?.author}</div>
            <div>Created: {entry?.entryDate}</div>
            <div>Number of comments: {entry?.numComments}</div>
            <div>Created: {GetTimeAgo(Number(entry?.entryDate))}</div>
            <div>Url: {entry?.url}</div>
        </Div>
    );
}


