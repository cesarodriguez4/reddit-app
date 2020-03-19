# reddit-app
Front end App powered by React, Typescript, Mobx and Blueprint CSS

This app is complemented with a very simple Ruby on Rails api implementation who serves the [Top Entries in Reddit](https://www.reddit.com/r/all/top/)

## Requirements
- npm. [Install](https://docs.npmjs.com/cli/install)

- Typescript. [Install](https://www.typescriptlang.org/index.html#download-links)

## Required API
You must download the ruby on rails app in order to get working with this app, as you'll be making a request to  `http://localhost:3000/top/entries` 

Download the api here:
[https://github.com/cesarodriguez4/reddit-api](https://github.com/cesarodriguez4/reddit-api)

## Installation
- Download:
`git clone https://github.com/cesarodriguez4/reddit-app`

- Install modules:

With npm:
`npm install`

With yarn:
`yarn`

- Run:

With npm:
`npm start`

With yarn:
`yarn start`

## Highlights
- You can view reddit's top entries in real time, select them to have more details and even open the original post in the reddit website.
- All state is managed by Mobx:
    - It's using derivations of state for handling pagination, seen-unseen, etc.
    - Async actions are using async/await ES7 syntax.
    - App shows `Loading...` while fetching data
- CSS Grid System is managed mostly by [Blueprint CSS](https://blueprintcss.dev/); colors, borders or backgrounds are setted using traditional CSS instead.
    - Responsive design implemented with Blueprint CSS
    - Due to incompatibilities between Blueprint CSS and Typescript was necessary extend the native `div` component with a Hight Order Component who extends the `div` component and add the `bp` prop required by Blueprint in order to work 
- App was written thinking in reusability and good practices of coding, so you can see some components used across the app: `Div`, `EntryDetails`, `EntryItem`, `Header`, `Paginator`
- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) were enabled for a better implementation of Mobx
    
Extended Div component:

```
import React from 'react';

interface BlueprintProps {
  bp?: string;
}

export class Div extends React.Component<BlueprintProps & React.HTMLProps<any>, {}> {
  render() {
      return <div {...this.props}/>;
  }
}
```

## What's next?
Many things can be developed upon this stage. Due to time considerations, I didn't developed more time-consumig features like `do-undo`, or css-transitions. However this can be improved in the near future for didactical purposes.

Last, we can implement `unit testing` using Jest or Enzyme for brings some robustness to our app.

Cheers!
Cesar Jr Rodriguez.
