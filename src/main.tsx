import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tailwind.css';
import { Storage } from '@ionic/storage'; // Cambia aquí

// Función para inicializar el almacenamiento
const initStorage = async () => {
  const storage = new Storage();
  await storage.create();
  return storage; // Devuelve el objeto storage si lo necesitas más tarde
};

const container = document.getElementById('root');
const root = createRoot(container!);

// Inicializa el almacenamiento y luego renderiza la aplicación
initStorage().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Error al inicializar el almacenamiento:', error);
});