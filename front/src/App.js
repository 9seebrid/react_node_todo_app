import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import Home from './components/Home';
import Completed from './components/Completed';
import Important from './components/Important';
import Proceeding from './components/Proceeding';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/proceeding" element={<Proceeding />} />
          <Route path="/important" element={<Important />} />
        </Routes>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
