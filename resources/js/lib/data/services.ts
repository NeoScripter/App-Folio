import type { LucideIcon } from 'lucide-preact';
import {
    Code,
    Palette,
    Presentation,
    Search,
    Shield,
    Smartphone,
    Users,
    Zap,
} from 'lucide-preact';

export interface Service {
    id: string;
    icon: LucideIcon;
    titleRu: string;
    titleEn: string;
    descriptionRu: string;
    descriptionEn: string;
}

export const services: Service[] = [
    {
        id: crypto.randomUUID(),
        icon: Presentation,
        titleRu: 'Лендинг',
        titleEn: 'Landing Page',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Code,
        titleRu: 'Веб-разработка',
        titleEn: 'Web Development',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Palette,
        titleRu: 'UI/UX Дизайн',
        titleEn: 'UI/UX Design',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Smartphone,
        titleRu: 'Мобильные приложения',
        titleEn: 'Mobile Applications',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Search,
        titleRu: 'SEO Оптимизация',
        titleEn: 'SEO Optimization',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Zap,
        titleRu: 'Технический аудит',
        titleEn: 'Technical Audit',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Shield,
        titleRu: 'Кибербезопасность',
        titleEn: 'Cybersecurity',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
    {
        id: crypto.randomUUID(),
        icon: Users,
        titleRu: 'Техническая поддержка',
        titleEn: 'Technical Support',
        descriptionRu:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        descriptionEn:
            'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
    },
];
