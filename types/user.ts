export interface User {
    _id: string,
    name: string,
    email: string,
    password: string
}

export type CreateUserPayload = Omit<User, '_id'>;
export type UpdateUserPayload = Partial<Omit<User, '_id'>>;