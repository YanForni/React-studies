import React, {useState} from 'react';

import "./style.css";

import { Card } from "../../components/Card";

export function Home() {

  const [studentName, setStudentName] = useState()

  return (
    <div className="container">
      <h1>Lista de Presença {studentName}</h1>
      <input 
      type="text" 
      placeholder="Digite um nome"
      onChange={e => setStudentName(e.target.value)}/>
      <button type="button">Adicionar</button>

      <Card name="Rodrigo" time="10:10:10" idade={26} />
      <Card name="Josias" time="22:10:10" idade={27} />
      <Card name="Josefina" time="22:15:49" idade={27} />
    </div>
  );
}
