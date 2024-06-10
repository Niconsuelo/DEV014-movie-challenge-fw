// src/App.tsx
//define peliculas y pasa a componentes.

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/page/Home';


//app es un componente de tipo funcion de reactx
const App: React.FC = () => {
  return (
    <>
    <Home></Home>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
