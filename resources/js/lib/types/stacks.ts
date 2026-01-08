export interface StackResource {
    data: StackType[];
}

export interface StackType {
    id: number;
    attributes: {
        html: {
            ru: string;
            en: string;
        };
        image: string;
    };
};
