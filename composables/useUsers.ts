import type { CreateUserPayload, UpdateUserPayload, User } from "~/types/user";

export const useUsers = () => {
    const apiUrl = useRuntimeConfig().public.API_URL;
    
    const getUsers = async () => {
        const { data, pending, error } = await useFetch<User[]>(`${apiUrl}/users`);
        return { data, pending, error };
    };

    const createUser = async (payload: CreateUserPayload) => {
        const { data, error } = await useFetch<User>(`${apiUrl}/users`, {
            method: 'POST',
            body: payload
        });

        return { data, error };
    }

    const updateUser = async (id: string, payload: UpdateUserPayload) => {
        const { data, error } = await useFetch<User>(`${apiUrl}/users/${id}`, {
            method: 'PUT',
            body: payload
        });

        return { data, error };
    }

    const deleteUser = async (id: string) => {
        const { data, error } = await useFetch(`${apiUrl}/users/${id}`, {
            method: 'DELETE'
        });

        return { data, error };
    }

    return { getUsers, createUser, updateUser, deleteUser };
};