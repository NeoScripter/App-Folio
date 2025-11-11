export interface VideoResource {
    data: VideoType[];
}

export interface VideoType {
    type: 'video';
    id: number;
    attributes: {
        url: string;
    };
    image?: {
        path: string;
        tinyPath: string;
        altRu: string;
        altEn: string;
    };
};
