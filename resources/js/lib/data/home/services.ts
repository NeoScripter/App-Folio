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
    title: {
        ru: string;
        en: string;
    };
    description: {
        ru: string;
        en: string;
    };
}

export const services: Service[] = [
    {
        id: crypto.randomUUID(),
        icon: Presentation,
        title: {
            ru: 'Лендинг',
            en: 'Landing Page',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Code,
        title: {
            ru: 'Веб-разработка',
            en: 'Web Development',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Palette,
        title: {
            ru: 'UI/UX Дизайн',
            en: 'UI/UX Design',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Smartphone,
        title: {
            ru: 'Мобильные приложения',
            en: 'Mobile Applications',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Search,
        title: {
            ru: 'SEO Оптимизация',
            en: 'SEO Optimization',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Zap,
        title: {
            ru: 'Технический аудит',
            en: 'Technical Audit',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Shield,
        title: {
            ru: 'Кибербезопасность',
            en: 'Cybersecurity',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Users,
        title: {
            ru: 'Техническая поддержка',
            en: 'Technical Support',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
];
