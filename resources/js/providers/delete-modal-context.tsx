import { FaqType } from '@/lib/types/faqs';
import { ReviewType } from '@/lib/types/reviews';
import { StackType } from '@/lib/types/stacks';
import { VideoType } from '@/lib/types/videos';
import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface DeleteModalContext {
    itemToDelete: Signal<FaqType | ReviewType | VideoType | StackType | null>;
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
