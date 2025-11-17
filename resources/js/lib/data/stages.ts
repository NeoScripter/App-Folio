import type { LucideIcon } from 'lucide-preact';
import { ChartLine, Laptop, NotepadText, Pencil } from 'lucide-preact';

export interface StageType {
    id: string;
    icon: LucideIcon;
    titleRu: string;
    titleEn: string;
    descriptionRu: string;
    descriptionEn: string;
}

export const stages: StageType[] = [
    {
        id: crypto.randomUUID(),
        icon: NotepadText,
        titleRu: 'Обсуждение задачи',
        titleEn: 'Discussion',
        descriptionRu:
            'Профессиональные презентации, которые впечатляют клиентов и эффективно доносят ваши идеи',
        descriptionEn:
            'Professional presentations that impress clients and effectively communicate your ideas',
    },
    {
        id: crypto.randomUUID(),
        icon: ChartLine,
        titleRu: 'Анализ',
        titleEn: 'Analisys',
        descriptionRu:
            'Чистый и поддерживаемый код с использованием современных технологий и лучших практик разработки',
        descriptionEn:
            'Clean, maintainable code using modern technologies and development best practices',
    },
    {
        id: crypto.randomUUID(),
        icon: Pencil,
        titleRu: 'Дизайн-макет',
        titleEn: 'Design mockup',
        descriptionRu:
            'Эстетичный дизайн, ориентированный на пользовательский опыт и визуальную привлекательность',
        descriptionEn:
            'Aesthetic design focused on user experience and visual appeal',
    },
    {
        id: crypto.randomUUID(),
        icon: Laptop,
        titleRu: 'Верстка',
        titleEn: 'Development',
        descriptionRu:
            'Полная адаптивность для всех устройств — от смартфонов до десктопных компьютеров',
        descriptionEn: 'Fully responsive across all devices',
    },
];
