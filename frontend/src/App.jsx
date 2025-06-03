import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/home';

// Utilizadores
import Login from './components/auth/login';
import Registar from './components/utilizadores/create';
import ListarUtilizadores from './components/utilizadores/list';
import EditarUtilizador from './components/utilizadores/edit';

// Viagens
import ListarViagens from './components/viagens/list';
import CriarViagem from './components/viagens/create';
import EditarViagem from './components/viagens/edit';

// Paragens
import ListarParagens from './components/paragens/list';
import CriarParagens from './components/paragens/create';
import EditarParagens from './components/paragens/edit';

// Viagens - Paragens
import ListarDestinos from './components/destinos/list';
import CriarDestino from './components/destinos/create';

// Condutores
import ListarCondutores from './components/condutores/list';
import CriarCondutores from './components/condutores/create';
import EditarCondutores from './components/condutores/edit';

// Autocarros
import ListarAutocarros from './components/autocarros/list';
import CriarAutocarros from './components/autocarros/create';
import EditarAutocarros from './components/autocarros/edit';

// Reservas
import ListarReservas from './components/reservas/purchased';
import ListarViagensDisponiveis from './components/reservas/list';
import CriarReservas from './components/reservas/booking';
import ViagemComprada from './components/reservas/confirmation';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/registar" Component={Registar} />
          <Route path="/utilizadores" Component={ListarUtilizadores} />
          <Route path="/utilizadores/editar/:id" Component={EditarUtilizador} />

          <Route path="/viagens" Component={ListarViagens} />
          <Route path="/viagens/criar" Component={CriarViagem} />
          <Route path="/viagens/editar/:id" Component={EditarViagem} />

          <Route path="/paragens" Component={ListarParagens} />
          <Route path="/paragens/criar" Component={CriarParagens} />
          <Route path="/paragens/editar/:id" Component={EditarParagens} />

          <Route path="/destinos" Component={ListarDestinos} />
          <Route path="/destinos/criar" Component={CriarDestino} />

          <Route path="/condutores" Component={ListarCondutores} />
          <Route path="/condutores/criar" Component={CriarCondutores} />
          <Route path="/condutores/editar/:id" Component={EditarCondutores} />

          <Route path="/autocarros" Component={ListarAutocarros} />
          <Route path="/autocarros/criar" Component={CriarAutocarros} />
          <Route path="/autocarros/editar/:id" Component={EditarAutocarros} />

          <Route path="/reservas" Component={ListarReservas} />
          <Route path="/reservas/disponiveis" Component={ListarViagensDisponiveis} />
          <Route path="/booking" Component={CriarReservas} />
          <Route path="/confirm" Component={ViagemComprada} />

        </Routes>
      <Footer />
    </>
  )
}

export default App