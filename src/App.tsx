import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Todo } from './container/Todo';
import { Cards } from './container/Cards';
import { NotFound } from './components/NotFound';
import { About } from './components/About';




const App: React.FC = () => {

  return (
    <>
      <Router>
        <Navbar />
        {/* <Todo /> */}
        <div className='container'>
          <Routes>
            {/* <Route index element={<Todo />} /> */}
            {/* <Route path="/" element={<Todo />} /> */}
            <Route path="/" element={<Cards />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
