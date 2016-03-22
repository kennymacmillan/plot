import express from 'express';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match } from 'react-router';
import routes from '../shared/routes';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../shared/reducers';

const app = express();

app.use(express.static('dist'));

app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer = combineReducers(reducers);
  const store = createStore(reducer);
  const initialState = store.getState();

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    const InitialComponent = (
      <Provider store={store}>
        <RouterContext { ...renderProps } />
      </Provider>
    );

    const componentHTML = renderToString(InitialComponent);

    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `;

    return res.end(HTML);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server listening on', PORT);
});
