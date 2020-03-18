import React from 'react';
import { Div } from './BPDiv';

type Props = {
    placeholder: string;
}

export const Header = (props: Props) => {
    return (
        <Div className="header">
            {props.placeholder}
        </Div>
    );
}


