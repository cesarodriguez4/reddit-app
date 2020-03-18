import React from 'react';

interface BlueprintProps {
  bp?: string;
}

// Due that Blueprint Css works passing a custom bp prop in HTML Components we
// must extend props within a custom HOC
export class Div extends React.Component<BlueprintProps & React.HTMLProps<any>, {}> {
  render() {
      return <div {...this.props}/>;
  }
}
