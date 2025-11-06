export interface CartItem {
    _id: string,
    userId: string,
    productId: string,
    quantity: number
}

export type CreateCartPayload = Omit<CartItem, '_id'>;
export type UpdateCartPayload = Pick<CartItem, 'quantity'>;