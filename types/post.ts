export type FormDataPost = {
    basicInfo: {
        title: string;
        description: string;
    };
    content: {
        body: string;
    };
    categorization: {
        categories: string[];
    };
}

export type StepProps = {
    data: FormDataPost;
    onUpdate: (data: Partial<FormDataPost>) => void;
    onNext: () => void;
    onBack?: () => void;
}


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

export interface CreatePostDTO {
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
}

