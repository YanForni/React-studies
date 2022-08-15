import { RepositoryItem } from "./RepositoryItem";

import '../style/repositories.scss'
import { useEffect, useState } from "react";

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

//https://api.github.com/users/YanForni/repos

const repository = {
    name: 'Repo',
    description: 'Repo of react', 
    link: 'https://github.com/'
}
export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([])  

  useEffect(() => {
    fetch("https://api.github.com/users/YanForni/repos")
    .then(response => response.json())
    .then(data => setRepositories(data))
  
  }, [])
  

  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>
      <ul>
        {repositories.map(repository => {
          return <RepositoryItem key={repository.name} repository={repository} />
        })}
        
        
      </ul>
    </section>
  );
}
