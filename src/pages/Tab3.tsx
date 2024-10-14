import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Storage } from '@ionic/storage';

const Tab3: React.FC = () => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [storage, setStorage] = useState<Storage | null>(null);

  // Inicializa el almacenamiento
  useEffect(() => {
    const initStorage = async () => {
      const storageInstance = new Storage();
      await storageInstance.create();
      setStorage(storageInstance);
      loadTareas(storageInstance); // Cargar tareas al inicializar
    };
    initStorage();
  }, []);

  // Cargar tareas desde el almacenamiento
  const loadTareas = async (storage: Storage) => {
    const allTareas = (await storage.get('tareas')) || [];
    setTareas(allTareas);
  };

  // Eliminar tarea
  const deleteTarea = async (index: number) => {
    if (storage) {
      const allTareas = (await storage.get('tareas')) || [];
      allTareas.splice(index, 1); // Eliminar la tarea en la posición index
      await storage.set('tareas', allTareas);
      setTareas(allTareas);
    }
  };

  // Actualizar tarea
  const updateTarea = async (index: number) => {
    // Aquí puedes implementar la lógica para editar la tarea seleccionada
    const tareaAActualizar = tareas[index];
    // Lógica para actualizar la tarea, por ejemplo:
    console.log('Actualizar tarea:', tareaAActualizar);
    // Puedes redirigir a un formulario con los datos de la tarea para actualizarla.
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas Guardadas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tareas</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Mostrar las tareas guardadas */}
        <div className="max-w-md mx-auto p-6 mt-6 bg-card text-card-foreground rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tareas Guardadas</h2>
          <ul className="space-y-2">
            {tareas.length === 0 ? (
              <li className="p-4 text-center">No hay tareas guardadas.</li>
            ) : (
              tareas.map((tarea, index) => (
                <li key={index} className="p-4 border border-border rounded-md flex flex-col items-start">
                  <h3 className="font-semibold">{tarea.titulo}</h3>
                  <p>{tarea.descripcion}</p>
                  <p><strong>Materia:</strong> {tarea.materia}</p>
                  <p><strong>Maestro:</strong> {tarea.teacherName}</p>
                  <p><strong>Fecha de creación:</strong> {tarea.creationDate}</p>
                  <p><strong>Prioridad:</strong> {tarea.priority}</p>
                  <p><strong>Fecha límite:</strong> {tarea.dueDate}</p>
                  <div className="flex justify-between w-full mt-2">
                    <button 
                      onClick={() => updateTarea(index)} 
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                    >
                      Actualizar
                    </button>
                    <button 
                      onClick={() => deleteTarea(index)} 
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
