export interface ReviewResource {
    data: ReviewType[];
}

export interface ReviewType {
    id: number;
    attributes: {
        author: {
            ru: string;
            en: string;
        };
        description: {
            ru: string;
            en: string;
        };
    };
    image: {
        path: string;
        tinyPath: string;
        alt: {
            ru: string;
            en: string;
        };
    };
}
