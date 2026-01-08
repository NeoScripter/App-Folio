import type { LucideIcon } from 'lucide-preact';
import { ChartLine, Laptop, NotepadText, Pencil } from 'lucide-preact';

export interface StageType {
    id: string;
    icon: LucideIcon;
    title: {
        ru: string;
        en: string;
    };
    description: {
        ru: string;
        en: string;
    };
}

export const stages: StageType[] = [
    {
        id: crypto.randomUUID(),
        icon: NotepadText,
        title: {
            ru: 'Обсуждение задачи',
            en: 'Discussion',
        },
        description: {
            ru: 'Профессиональные презентации, которые впечатляют клиентов и эффективно доносят ваши идеи',
            en: 'Professional presentations that impress clients and effectively communicate your ideas',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: ChartLine,
        title: {
            ru: 'Анализ',
            en: 'Analisys',
        },
        description: {
            ru: 'Чистый и поддерживаемый код с использованием современных технологий и лучших практик разработки',
            en: 'Clean, maintainable code using modern technologies and development best practices',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Pencil,
        title: {
            ru: 'Дизайн-макет',
            en: 'Design mockup',
        },
        description: {
            ru: 'Эстетичный дизайн, ориентированный на пользовательский опыт и визуальную привлекательность',
            en: 'Aesthetic design focused on user experience and visual appeal',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Laptop,
        title: {
            ru: 'Верстка',
            en: 'Development',
        },
        description: {
            ru: 'Полная адаптивность для всех устройств — от смартфонов до десктопных компьютеров',
            en: 'Fully responsive across all devices',
        },
    },
];
