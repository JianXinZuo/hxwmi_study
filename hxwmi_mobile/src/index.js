import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { mainRouter } from './Routes';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <Switch>
                    {
                        mainRouter.map(route =>{
                            return <Route key={ route.pathname } path={ route.pathname } exact={ route.exact } component={ route.component } title={ route.title || "" }></Route>
                        })
                    }
                    <Redirect to="/index" from="/" exact/>
                    <Redirect to="/404"/>
                </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
