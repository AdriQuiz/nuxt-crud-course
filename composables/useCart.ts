import type { CartItem, CreateCartPayload, UpdateCartPayload } from "~/types/cart";

export const useCarts = () => {

    const apiUrl = useRuntimeConfig().public.API_URL;

    const getCartItem = async (id: string) => {
        const { data, pending, error, refresh } = await useFetch<CartItem[]>(
            `${apiUrl}/cart/${id}`,
            { method: 'GET' }
        );
        return { data, pending, error, refresh };
    };

    const createCartItem = async (payload: CreateCartPayload) => {
        const { data, error } = await useFetch<CartItem>(`${apiUrl}/cart`, {
            method: 'POST',
            body: payload
        });

        return { data, error };
    };

    const updateQuantity = async (id: string, payload: UpdateCartPayload) => {
        const { data, error } = await useFetch<CartItem>(`${apiUrl}/cart/${id}`, {
            method: 'PUT',
            body: payload
        });

        return { data, error };
    };

    const deleteCartItem = async (id: string) => {
        const { data, error } = await useFetch(`${apiUrl}/cart/${id}`, {
            method: 'DELETE'
        });

        return { data, error };
    };

    return { getCartItem, createCartItem, updateQuantity, deleteCartItem };
};