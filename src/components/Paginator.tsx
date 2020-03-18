import React from 'react';
import { Div } from './BPDiv';

type Props = {
   totalPages?: number;
   currentPage?: number;
   onSelectedPage: ((number: number) => void) | undefined
}

export const Paginator = (props: Props) => {
    const {totalPages, currentPage} = props;
    const iterator = Array.from(Array(totalPages));
    return (
        <Div className="paginator" bp="grid 2">
            {iterator.map((val, index) => {
            return (
                <span
                    key={`pag-${index}`}
                    style={{fontWeight: currentPage === index+1? 'bold' : 'inherit'}}
                    onClick={() => props.onSelectedPage? props.onSelectedPage(index+1) : null}
                >
                    {index + 1}
                </span>
                ); 
                }
            )}
        </Div>
    );
}


