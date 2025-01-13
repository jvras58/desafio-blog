export interface Post {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    createdAt: string;
    author?: {
        id: string;
        name: string;
    };
}

// TODO: a fazer o postConteudo
export interface CreatePostDTO {
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
}