import React from 'react';
import { PrivateAppRoute } from './components/router/PrivateRoute/PrivateAppRoute';
import 'antd/dist/antd.css';
import './app.scss';

function App() {
  return (
    <div className="App">
      <PrivateAppRoute />
    </div>
  );
}

export default App;