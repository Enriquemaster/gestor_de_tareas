import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Storage } from '@ionic/storage';

const Tab2: React.FC = () => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState(''); // Estado para la materia
  const [descripcion, setDescripcion] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [priority, setPriority] = useState('alta');
  const [dueDate, setDueDate] = useState('');
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

  // Guardar una nueva tarea
  const addTarea = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (storage) {
      const nuevaTarea = { titulo, materia, descripcion, teacherName, creationDate, priority, dueDate }; // Incluir materia
      const allTareas = (await storage.get('tareas')) || [];
      allTareas.push(nuevaTarea);
      await storage.set('tareas', allTareas);
      setTareas(allTareas); // Actualizar el estado de las tareas
      clearForm(); // Limpiar el formulario después de agregar la tarea
    }
  };

  // Limpiar el formulario
  const clearForm = () => {
    setTitulo('');
    setMateria(''); // Limpiar el campo de materia
    setDescripcion('');
    setTeacherName('');
    setCreationDate('');
    setPriority('alta');
    setDueDate('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="max-w-md mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Crear Tarea</h2>
          <form className="space-y-4" onSubmit={addTarea}>
            {/* Formulario de creación de tareas */}
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-muted-foreground">Título de la tarea</label>
              <input
                type="text"
                id="task-title"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                placeholder="Escribe el título de la tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="task-subject" className="block text-sm font-medium text-muted-foreground">Materia</label> {/* Campo de Materia */}
              <input
                type="text"
                id="task-subject"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                placeholder="Escribe la materia"
                value={materia} // Usar el estado de materia
                onChange={(e) => setMateria(e.target.value)} // Actualizar el estado de materia
                required
              />
            </div>
            <div>
              <label htmlFor="task-desc" className="block text-sm font-medium text-muted-foreground">Descripción de la tarea</label>
              <textarea
                id="task-desc"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                rows={3}
                placeholder="Escribe la descripción de la tarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="teacher-name" className="block text-sm font-medium text-muted-foreground">Nombre del maestro</label>
              <input
                type="text"
                id="teacher-name"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                placeholder="Escribe el nombre del maestro"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="creation-date" className="block text-sm font-medium text-muted-foreground">Fecha de creación</label>
              <input
                type="date"
                id="creation-date"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-muted-foreground">Prioridad de la tarea</label>
              <select
                id="priority"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            <div>
              <label htmlFor="due-date" className="block text-sm font-medium text-muted-foreground">Fecha límite o recordatorio</label>
              <input
                type="datetime-local"
                id="due-date"
                className="mt-1 block w-full bg-input border border-border rounded-md p-2 text-foreground"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/80">Crear Tarea</button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
