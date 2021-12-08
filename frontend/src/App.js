
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import { HomePAge } from './pages/HomePAge';
import { LoginPAge } from './pages/LoginPAge';
import {Header } from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <div className="App">
      
      <Router>
      <AuthProvider>
      <Header />
      {/*  check if there is a user or not 
         if there is user let show the children */}
         {/* it is checking from authProver if there is a user or not if not HomePAge is not rendering  */}
        <PrivateRoute component={HomePAge} path="/" exact/>
        <Route component={LoginPAge} path="/login" exact/>
        </AuthProvider>
      </Router>
      

    </div>
  );
}

export default App;
