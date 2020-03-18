import React from 'react';
import { Div } from './BPDiv';
import { Entry } from '../store/Store';


type Props = {
  entry: Entry | undefined;
}

export const EntryDetails = (props: Props) => {
    const {entry} = props;
    return (
        <Div bp="grid">
            {entry?.title}
        </Div>
    );
}


