// "hot(App)" shall only be used as export.
// Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).
import React from 'react';
import { hot } from 'react-hot-loader/root'
import MapRoutes from './routes/mapRoutes';
import { HashRouter as Router } from 'react-router-dom';

const App = () => {
    return (
        <Router >
            <MapRoutes />
        </Router>
    )
}
export default App
hot(App);
