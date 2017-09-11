// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';

const element = <p>Hello, world</p>;



const element2 = (
  <div>
    <h1>Good Evening</h1>
    <h2>It’s cold tonight! Take care of yourself</h2>
  </div>
);

const element3 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);


// const element = React.createElement(
//   'h1',
//   {className: 'greeting'},
//   'Hello, world!'
// );

// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

ReactDOM.render(
  element3,
  document.getElementById('root')
);