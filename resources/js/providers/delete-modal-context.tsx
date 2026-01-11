import { FaqType } from '@/lib/types/faqs';
import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface DeleteModalContext {
    itemToDelete: Signal<FaqType | null>;
}

const DeleteModalContext = createContext<DeleteModalContext | null>(null);

export function useDeleteModal() {
    const ctx = useContext(DeleteModalContext);
    if (!ctx) throw new Error('useDeleteModal used without DeleteModalProvider');
    return ctx;
}

export function DeleteModalProvider({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const itemToDelete = signal<FaqType | null>(null);
    return (
        <DeleteModalContext.Provider value={{ itemToDelete }}>
            {children}
        </DeleteModalContext.Provider>
    );
}
