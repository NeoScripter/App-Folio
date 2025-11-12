import type { LucideIcon } from 'lucide-preact';
import {
    Code,
    Palette,
    Presentation,
    Search,
    Smartphone,
    Zap,
} from 'lucide-preact';

export interface Perk {
    id: string;
    icon: LucideIcon;
    descriptionRu: string;
    descriptionEn: string;
}

export const perks: Perk[] = [
    {
        id: crypto.randomUUID(),
        icon: Presentation,
        descriptionRu:
            'Профессиональные презентации, которые впечатляют клиентов и эффективно доносят ваши идеи',
        descriptionEn:
            'Professional presentations that impress clients and effectively communicate your ideas',
    },
    {
        id: crypto.randomUUID(),
        icon: Code,
        descriptionRu:
            'Чистый и поддерживаемый код с использованием современных технологий и лучших практик разработки',
        descriptionEn:
            'Clean, maintainable code using modern technologies and development best practices',
    },
    {
        id: crypto.randomUUID(),
        icon: Palette,
        descriptionRu:
            'Эстетичный дизайн, ориентированный на пользовательский опыт и визуальную привлекательность',
        descriptionEn:
            'Aesthetic design focused on user experience and visual appeal',
    },
    {
        id: crypto.randomUUID(),
        icon: Smartphone,
        descriptionRu:
            'Полная адаптивность для всех устройств — от смартфонов до десктопных компьютеров',
        descriptionEn: 'Fully responsive across all devices',
    },
    {
        id: crypto.randomUUID(),
        icon: Search,
        descriptionRu:
            'Оптимизация для поисковых систем, помогающая вашему сайту занимать высокие позиции в результатах поиска и привлекать целевую аудиторию',
        descriptionEn:
            'Search engine optimization to help your site rank higher and attract targeted traffic',
    },
    {
        id: crypto.randomUUID(),
        icon: Zap,
        descriptionRu: 'Молниеносная производительность',
        descriptionEn:
            'Lightning-fast performance with optimized loading times and smooth interactions',
    },
];
