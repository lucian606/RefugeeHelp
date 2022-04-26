import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MapPage from './components/MapPage';
import ForumPage from './components/ForumPage';
import SubmitPost from './components/SubmitPost';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/' element={
            <PrivateRoute>  
              <HomePage/>
            </PrivateRoute>
            } />
          <Route path='/map' element={
            <PrivateRoute>
              <MapPage/>
            </PrivateRoute>
            } />
          <Route path='/forum' element={<PrivateRoute>
            <ForumPage/>
          </PrivateRoute>} />
          <Route path='/submit' element={<PrivateRoute>
            <SubmitPost/>
          </PrivateRoute>} />            
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;