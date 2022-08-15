import React, { useState, useEffect } from "react";
import "./style.css";

import { Card, CardProps } from "../../components/Card";

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState("");
  //tipando elementos do array students, é necessário especificar que é um array usando <Tipo[]>
  const [students, setStudents] = useState<CardProps[]>([]);
  //tipando dados obtidos pela API do Github
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    //Usando async é necessário colocar uma função dentro de useEffect
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/YanForni");
      const data = await response.json() as ProfileResponse;
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fetchData();

    //Usando apenas promises
    // fetch("https://api.github.com/users/YanForni")
    // .then(response => response.json())
    // .then(data => {
    //   setUser({
    //     name: data.name,
    //     avatar: data.avatar_url,
    //   })
    // })
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite um nome"
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
