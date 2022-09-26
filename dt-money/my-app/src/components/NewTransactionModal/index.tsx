import { transitions } from "polished";
import { FormEvent, useState, useContext } from "react";
import Modal from "react-modal";
import { TransactionsContext } from "../../TransactionsContext";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { Container, TransitionTypeContainer, RadioBox } from "./styles";
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const transactions = useContext(TransactionsContext);

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const [type, setType] = useState('deposit');

  function handleCreateNewTransaction(event:FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    api.post(`/transactions`, data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={"react-modal-content"}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <h2>Cadastrar transação</h2>
        <input 
          placeholder="Título" 
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number" 
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}/>

        <TransitionTypeContainer>
          <RadioBox
          type="button"
          activeColor='green'
          onClick={() => setType('deposit')}
          isActive={type === 'deposit'}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
          type="button"
          onClick={() => setType('withdraw')}
          isActive={type === 'withdraw'}
          activeColor='red'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransitionTypeContainer>

        <input placeholder="Categoria" 
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button 
        type="submit"
        onClick={handleCreateNewTransaction}
        >
          Cadastrar</button>
      </Container>
    </Modal>
  );
}
