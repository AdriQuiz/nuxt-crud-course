export interface Product {
    _id: string,
    name: string,
    price: number,
    stock: number
}

export type CreateProductPayload = Omit<Product, '_id'>;
export type UpdateProductPayload = Partial<Omit<Product, '_id'>>;