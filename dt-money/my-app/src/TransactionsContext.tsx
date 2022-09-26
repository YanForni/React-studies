import { type } from "os";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     type: string;
//     category: string;
//     amount: number;
// }

//Omite alguns campos de Transaction
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

//Seleciona alguns campos de Transaction
//type TransactionInput = Pick<Transaction, 'title' | 'type' | 'amount' | 'category'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post(`/transactions`, {
        ...transactionInput,
        createdAt: new Date(),
    });
    
    const { transaction } =  response.data;

    setTransactions([
        ...transactions,
        transaction,
    ])
    
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
