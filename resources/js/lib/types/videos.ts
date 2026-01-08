export interface VideoResource {
    data: VideoType[];
}

export interface VideoType {
    id: number;
    attributes: {
        url: string;
        title: {
            ru: string;
            en: string;
        };
    };
    image?: {
        path: string;
        tinyPath: string;
        alt: {
            ru: string;
            en: string;
        };
    };
}
