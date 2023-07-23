import React from "react";
import "./App.css";
import ListClans from "./components/ListClans";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="title">Bienvenido a Clans Of Clans</div>
        <div className="description">
          Aquí puedes buscar el clan que desees filtrando por nombre, mínimo de
          miembros o mínimo de puntos del clan.
        </div>
      </header>

      <ListClans />
    </div>
  );
}

export default App;
