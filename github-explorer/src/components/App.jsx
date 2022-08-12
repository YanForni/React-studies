import '../style/global.scss';
import { Counter } from './Counter';
import { RepositoryList } from './RepositoryList';

export function App() {
    return (
        <div>
            <RepositoryList />
            <Counter />
        </div>
    )
}