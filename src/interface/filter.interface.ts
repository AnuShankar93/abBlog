export interface TagState {
    tags?: Tags | null;
    categories? : Tags | null;
    loading: boolean;
}

export interface Self {
    href: string;
}

export interface Collection {
    href: string;
}

export interface About {
    href: string;
}

export interface WpPostType {
    href: string;
}

export interface Cury {
    name: string;
    href: string;
    templated: boolean;
}
export interface Links {
    self: Self[];
    collection: Collection[];
    about: About[];
    curies: Cury[];
}



export interface Tags {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    meta: any[];
    _links: Links;
}
