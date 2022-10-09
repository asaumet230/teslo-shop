
export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: string;
    state?: boolean;
    createdAt?: string;
    updatedAt?: string;
}