import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainNavigation from './navigation/mainNavigation';
import history from './navigation/browserHistory';
import { Router } from 'react-router';

function App() {
  return (
    <Router history={history}>
      <MainNavigation />
    </Router>
  );
}

export default App;
