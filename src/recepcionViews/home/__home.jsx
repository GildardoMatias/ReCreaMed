import React from 'react';
import './Profile.css'; // Importa un archivo CSS para los estilos

const Home = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-welcome">
          <img src="avatar-placeholder.png" alt="Avatar" className="profile-avatar"/>
          <h1>Bienvenido Melissa Anton</h1>
        </div>
        <nav className="profile-nav">
          <ul>
            <li>Inicio</li>
            <li>Pacientes</li>
            <li>Médicos</li>
            <li>Recepcionistas</li>
            <li>Enfermeros</li>
            <li>Citas</li>
            <li>Escalas</li>
            <li>Balances</li>
            <li>Cortes</li>
            <li>Perfil</li>
          </ul>
        </nav>
        <button className="logout-button">Cerrar Sesión</button>
      </header>
      <main className="profile-main">
        <section className="profile-details">
          <div className="profile-card">
            <div className="profile-info">
              <img src="avatar-placeholder.png" alt="Avatar" className="profile-avatar-large"/>
              <h2>Melissa Anton</h2>
              <p>Administrador</p>
              <p>Correo: melissaanton59@gmail.com</p>
              <p>Teléfono: 4351063115</p>
            </div>
            <div className="profile-schedule">
              <h3>Horarios</h3>
              <div className="schedule-item">
                <img src="cideralt-logo.png" alt="Cideralt" className="schedule-logo"/>
                <p>CIDERALT</p>
                <p>3:00 pm - 8:00 pm</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
