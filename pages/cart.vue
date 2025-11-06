<template>
    <section class="m-5 bg-slate-700 p-5 rounded-lg">
        <h2 class="text-3xl flex justify-center my-4 text-white">Shopping Cart</h2>
        <div class="flex w-full gap-6">
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-1/2">
                <li v-for="product in products" :key="product._id" class="bg-slate-400 p-3 rounded-md">
                    <div class="flex flex-col gap-1 mb-4">
                        <h3 class="text-xl">Product: {{ product.name }}</h3>
                        <p>Price: ${{ product.price }}</p>
                        <p>Stock: {{ product.stock }}</p>
                    </div>
                    <div class="flex gap-4">
                        <button @click="handleCreate(product)" class="bg-yellow-300 px-3 py-2 rounded-md">Add to
                            cart</button>
                        <!-- <button @click="handleDelete(product._id)" class="bg-red-500 px-3 py-2 rounded-md">Delete</button>  -->
                    </div>
                </li>
            </ul>
            <ul class="w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <li v-for="item in items" :key="item._id" class="bg-green-400 p-3 rounded-md">
                    <div class="flex flex-col gap-1 mb-4">
                        <h3 class="text-xl">Product Details</h3>
                        <p>Name: {{ item.productId.name }}</p>
                        <p>Price: {{ item.productId.price }}</p>
                        <p>Quantity: {{ item.quantity }}</p>
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
const { getCartItem, createCartItem } = useCarts();
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
    } else {
        toast.error({ title: 'Error!', message: 'Could not add item to cart.' })
    }
};

const handleUpdate = () => {};

const handleDelete = () => {};

</script>