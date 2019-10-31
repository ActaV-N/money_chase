import React from 'react'
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from 'react-router-dom'

import ManageProduct from './manageProduct'

const Admin = () => {
    let {path} = useRouteMatch()
    return (
        <Router>
            <Switch>
                <Route path={`${path}/manageProduct`}>
                    <ManageProduct/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Admin