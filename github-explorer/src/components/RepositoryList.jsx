import { RepositoryItem } from "./RepositoryItem";

const repository = {
    name: 'Repo',
    description: 'Repo of react',
    link: 'https://github.com/'
}

export function RepositoryList() {
  return (
    <section>
      <h1>Lista de Repositórios</h1>
      <ul>
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem />
      </ul>
    </section>
  );
}
