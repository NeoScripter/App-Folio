export interface ProjectResource {
    data: ProjectType[];
}

export interface ProjectType {
    id: number;
    attributes: {
        title: {
            ru: string;
            en: string;
        };
        description: {
            ru: string;
            en: string;
        };
        category: {
            ru: string;
            en: string;
        };
        stacks: {
            ru: string[];
            en: string[];
        };
        link: string;
    };
    image: {
        path: string;
        tinyPath: string;
        alt: {
            ru: string;
            en: string;
        };
    };
    links: {
        self: string;
    }[];
}
