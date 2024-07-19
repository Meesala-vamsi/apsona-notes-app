
import './App.css';
import { ContextProvider } from './ReactContext/Context';
import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home/Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Signup from './components/SignUp/SignUp';
import Notes from './components/Notes/Notes';
import Archieve from './components/Archieve/Archieve';
import Bin from './components/Bin/Bin';

function App() {
  return (
    <div className='App'>
    <ContextProvider>
      <ToastContainer/>
      <Routes>
        <Route element={<ProtectedRoute isAuthRoute={true} />}>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        </Route>
        <Route element={<ProtectedRoute isAuthRoute={false} />} >
        <Route path="/" element={<Home><Notes/></Home>}/>
        <Route path='/archive' element={<Home><Archieve/></Home>}/>
        <Route path='/bin' element={<Home><Bin/></Home>}/>
        </Route>
      </Routes>
    </ContextProvider>
    </div>
  );
}

export default App;
