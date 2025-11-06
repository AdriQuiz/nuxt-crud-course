import type { CreateProductPayload, Product, UpdateProductPayload } from "~/types/product";

export const useProducts = () => {
    const apiUrl = useRuntimeConfig().public.API_URL;

    const getProducts = async () => {
        const { data, pending, error, refresh } = await useFetch<Product[]>(
            `${apiUrl}/products`,
            { method: 'GET' }
        );
        return { data, pending, error, refresh };
    };

    const createProduct = async (payload: CreateProductPayload) => {
        const { data, error } = await useFetch<Product>(`${apiUrl}/products`, {
            method: 'POST',
            body: payload
        });

        return { data, error };
    }

    const updateProduct = async (id: string, payload: UpdateProductPayload) => {
        const { data, error } = await useFetch<Product>(`${apiUrl}/products/${id}`, {
            method: 'PUT',
            body: payload
        });

        return { data, error };
    }

    const deleteProduct = async (id: string) => {
        const { data, error } = await useFetch(`${apiUrl}/products/${id}`, {
            method: 'DELETE'
        });

        return { data, error };
    }

    return { getProducts, createProduct, updateProduct, deleteProduct };
};