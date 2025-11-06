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
            <ul class="md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <li v-for="item in items" :key="item._id" class="bg-green-400 p-3 rounded-md">
                    <div class="flex flex-col gap-1 mb-4 items-center">
                        <h3 class="text-xl">Product Details</h3>
                        <p>Name: {{ item.productId.name }}</p>
                        <p>Price: {{ item.productId.price }}</p>
                        <div class="flex items-center gap-3">
                            <button @click="handleUpdate(item._id, item.quantity - 1)" :disabled="item.quantity <= 1"
                                class="bg-slate-300 rounded px-4 py-1">
                                -
                            </button>
                            <input type="number" class="p-2 flex-1 min-w-10 max-w-24" v-model.number="item.quantity"
                                @change="handleUpdate(item._id, item.quantity)" min="1">
                            <button @click="handleUpdate(item._id, item.quantity + 1)"
                                class="bg-slate-300 rounded px-4 py-1">
                                +
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button @click="handleDelete(item._id)" class="bg-red-500 px-3 py-2 rounded-md">Delete</button>
                    </div>
                </li>
            </ul>
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