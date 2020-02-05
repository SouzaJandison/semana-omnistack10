import React, { useState ,useEffect } from 'react';
import './css/global.css'
import './css/app.css'
import './css/Sidebar.css'
import './css/main.css'
import DevItem from './components/DevIten/index'
import DevForm from './components/DevForm/index'
import api from './services/api'

function App() {
  const [ devs, setDevs ] = useState([]);
  
  useEffect( () => {
    async function loadDev(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDev();
  }, []);
  async function handleAddDev(data){
    const response = await api.post('/devs', data);
    
    setDevs( [...devs, response.data] )
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
