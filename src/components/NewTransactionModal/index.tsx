import { FormEvent, useState } from "react";
import Modal from "react-modal";

import * as S from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

Modal.setAppElement('#root')

export function NewTransactionModal({
    isOpen,
    onRequestClose
}: NewTransactionModalProps) {

    const { createTransaction } = useTransactions()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setcategory] = useState('')
    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        onRequestClose()

        setTitle('')
        setAmount(0)
        setcategory('')
        setType('deposit')
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="close modal" />
            </button>

            <S.Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(+event.target.value)}
                />

                <S.TransactionTypeContainer>

                    <S.RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="income" />
                        <span>Entrada</span>
                    </S.RadioBox>

                    <S.RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="outcome" />
                        <span>Saída</span>
                    </S.RadioBox>

                </S.TransactionTypeContainer>

                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setcategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </S.Container>
        </Modal>

    )
}
