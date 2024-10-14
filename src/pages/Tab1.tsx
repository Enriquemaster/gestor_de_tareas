import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Aquí empieza tu contenido personalizado */}
        <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground p-4">
          <h1 className="text-4xl font-bold mb-6">Bienvenido a Gestor de Tareas</h1>
          <p className="text-lg mb-8 text-muted-foreground">Gestiona tus tareas de manera eficiente y sencilla con nuestra aplicación.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card p-6 rounded-lg shadow-md text-center">
              <img src="https://placehold.co/100x100?text=📋" alt="view-tasks" className="mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Visualizar Tareas</h2>
              <p className="text-muted-foreground">Consulta rápidamente tus tareas pendientes.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md text-center">
              <img src="https://placehold.co/100x100?text=✅" alt="complete-tasks" className="mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Marcar como Completadas</h2>
              <p className="text-muted-foreground">Marca tareas como completadas y sepáralas en otra sección.</p>
            </div>
          </div>
        </div>
        {/* Aquí termina tu contenido personalizado */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
