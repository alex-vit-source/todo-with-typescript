import React from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cards } from './container/Cards';
import { NotFound } from './components/NotFound';
import { About } from './components/About';
import { privateRoutes, publicRoutes } from './routes/routes';
import { observer } from 'mobx-react-lite';
import todostore from './store/todostore';
import { CARDS_ROUTE, LOGIN_ROUTE } from './utils/consts';




const App: React.FC = observer(() => {
  const availableRoute = todostore.access ? privateRoutes : publicRoutes;
  const redirRoute = todostore.access ? CARDS_ROUTE : LOGIN_ROUTE;


  return (

    <>
      <Router>
        <Navbar />

        <div className='container'>
          <Routes>
            {availableRoute.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="/" element={<Navigate to={redirRoute} />} />
            <Route />
          </Routes>
        </div>

      </Router>
    </>

  );
})

export default App;
