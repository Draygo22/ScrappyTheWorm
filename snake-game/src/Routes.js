import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Start from './Start';

export default () => (
    <BrowserRouter>
        <Switch>

            <Route path = "/start" exact component={Start} />
            
        </Switch>
    </BrowserRouter>
)