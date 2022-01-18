export interface User {
    emailVerifiedAt: string;
    email: string;
    id: number;
    name: string;
}

export interface ToDo {
    completedAt: string | null;
    id: string;
    name: string;
}