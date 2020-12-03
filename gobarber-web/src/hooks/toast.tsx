import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

//Sempre pensar em isolar o código, vale o mesmo para components
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    //o Omit, ele herda todas as propriedades da interface, e como segundo parametro é a exclusão de uma propriedade especifica
    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        //instalar a dependencia de uuidv4 para criar id para os elementos
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description
        }

        setMessages((oldMessages) => [...oldMessages, toast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages((oldMessages) => oldMessages.filter((message) => message.id !== id));
    }, 
    []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}

            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    )
}

const useToast = (): ToastContextData => {
    const context = useContext(ToastContext);

    if(!context){
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast };