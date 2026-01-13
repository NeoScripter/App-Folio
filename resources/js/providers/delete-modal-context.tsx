import { FaqType } from '@/lib/types/faqs';
import { ProjectModuleType } from '@/lib/types/project-module';
import { ProjectType } from '@/lib/types/projects';
import { ReviewType } from '@/lib/types/reviews';
import { StackType } from '@/lib/types/stacks';
import { VideoType } from '@/lib/types/videos';
import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface DeleteModalContext {
    itemToDelete: Signal<
        | FaqType
        | ReviewType
        | VideoType
        | StackType
        | ProjectType
        | ProjectModuleType
        | null
    >;
}

const DeleteModalContext = createContext<DeleteModalContext | null>(null);

export function useDeleteModal() {
    const ctx = useContext(DeleteModalContext);
    if (!ctx)
        throw new Error('useDeleteModal used without DeleteModalProvider');
    return ctx;
}

export function DeleteModalProvider({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const itemToDelete = signal<
        | FaqType
        | ReviewType
        | VideoType
        | StackType
        | ProjectType
        | ProjectModuleType
        | null
    >(null);
    return (
        <DeleteModalContext.Provider value={{ itemToDelete }}>
            {children}
        </DeleteModalContext.Provider>
    );
}
