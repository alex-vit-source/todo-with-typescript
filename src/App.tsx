import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cards } from './container/Cards';
import { NotFound } from './components/NotFound';
import { About } from './components/About';
import { observer } from 'mobx-react-lite';




const App: React.FC = observer(() => {

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Router>
          <Navbar />
          {/* <Todo /> */}

          <div className='container'>
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route />
            </Routes>
          </div>

        </Router>
      </>
    </DndProvider>
  );
})

export default App;
