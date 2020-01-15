import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { mainRouter } from './Routes';
import { Provider } from 'react-redux';
import store from './store';

Array.prototype.UpdateModelById = function(modelId, key, value) {
    var model = null;
    for (var i = 0; i < this.length; i++) {
        if (this[i].id == modelId) {
            this[i][key] = value;
            model = this[i];
        }
    }
    return model;
}


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
