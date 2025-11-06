<template>
    <section class="m-5 bg-slate-700 p-5 rounded-lg">
        <h2 class="text-3xl flex justify-center my-4 text-white">Shopping Cart</h2>
        <div class="flex md:flex-row flex-col w-full gap-6">
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:w-1/2 w-full">
                <li v-for="product in products" :key="product._id" class="bg-slate-400 p-3 rounded-md">
                    <div class="flex flex-col items-center gap-1 mb-4">
                        <h3 class="text-xl">{{ product.name }}</h3>
                        <p>Price: ${{ product.price }}</p>
                        <p>Stock: {{ product.stock }}</p>
                    </div>
                    <div class="flex gap-4 justify-center">
                        <button @click="handleCreate(product)" class="bg-yellow-300 px-3 py-2 rounded-md">Add to
                            cart</button>
                    </div>
                </li>
            </ul>
            <CartList 
                :items="items"
                @updateQuantity="handleUpdate"
                @deleteItem="handleDelete"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';

const route = useRoute();
const userId = ref<string>('');
const { getCartItem, createCartItem, updateQuantity, deleteCartItem } = useCarts();
const { getProducts } = useProducts();
const toast = useToast() as any;

userId.value = route.query.userId as string;

const { data: items, refresh: refreshItems } = await getCartItem(route.query.userId as string);
const { data: products, refresh: refreshProducts } = await getProducts();

const handleCreate = async (product: Product) => {
    if (!userId.value) {
        toast.error({ title: 'Error!', message: 'No userId provided.' });
        return;
    }

    const { error } = await createCartItem({
        userId: userId.value,
        productId: product._id,
        quantity: 1
    });

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'Item added to cart successfully.' });
        await refreshItems();
        await refreshProducts();
    } else {
        toast.error({ title: 'Error!', message: 'Could not add item to cart.' })
    }
};

const handleUpdate = async (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    const { error } = await updateQuantity(id, { quantity: newQuantity });

    if (!error.value) {
        toast.success({ title: 'Updated', message: 'Quantity updated successfully.' });
        await refreshItems();
        await refreshProducts();
    } else {
        toast.error({ title: 'Error!', message: 'Could not update quantity.' });
    }
};

const handleDelete = async (id: string) => {
    const { error } = await deleteCartItem(id);
    if (!error.value) {
        toast.success({ title: 'Success!', message: 'Item deleted from cart successfully.' });
        await refreshItems();
        await refreshProducts();
    } else {
        toast.error({ title: 'Error!', message: 'Could not delete item.' });
    }
};

</script>