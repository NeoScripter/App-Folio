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
    description: {
        ru: string;
        en: string;
    };
}

export const perks: Perk[] = [
    {
        id: crypto.randomUUID(),
        icon: Presentation,
        description: {
            ru: 'Профессиональные презентации, которые впечатляют клиентов и эффективно доносят ваши идеи',
            en: 'Professional presentations that impress clients and effectively communicate your ideas',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Code,
        description: {
            ru: 'Чистый и поддерживаемый код с использованием современных технологий и лучших практик разработки',
            en: 'Clean, maintainable code using modern technologies and development best practices',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Palette,
        description: {
            ru: 'Эстетичный дизайн, ориентированный на пользовательский опыт и визуальную привлекательность',
            en: 'Aesthetic design focused on user experience and visual appeal',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Smartphone,
        description: {
            ru: 'Полная адаптивность для всех устройств — от смартфонов до десктопных компьютеров',
            en: 'Fully responsive across all devices',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Search,
        description: {
            ru: 'Оптимизация для поисковых систем, помогающая вашему сайту занимать высокие позиции в результатах поиска и привлекать целевую аудиторию',
            en: 'Search engine optimization to help your site rank higher and attract targeted traffic',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Zap,
        description: {
            ru: 'Молниеносная производительность',
            en: 'Lightning-fast performance with optimized loading times and smooth interactions',
        },
    },
];
