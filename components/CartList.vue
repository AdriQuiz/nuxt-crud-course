<template>
    <ul class="md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <li v-for="item in items" :key="item._id" class="bg-green-400 p-3 rounded-md">
            <div class="flex flex-col gap-1 mb-4 items-center">
                <h3 class="text-xl">Product Details</h3>
                <p>Name: {{ item.productId.name }}</p>
                <p>Price: {{ item.productId.price }}</p>
                <div class="flex items-center gap-3">
                    <button @click="$emit('updateQuantity', item._id, item.quantity - 1)" :disabled="item.quantity <= 1"
                        class="bg-slate-300 rounded px-4 py-1">
                        -
                    </button>
                    <input type="number" class="p-2 flex-1 min-w-10 max-w-24" v-model.number="item.quantity"
                        @change="$emit('updateQuantity', item._id, item.quantity)" min="1">
                    <button @click="$emit('updateQuantity', item._id, item.quantity + 1)" class="bg-slate-300 rounded px-4 py-1">
                        +
                    </button>
                </div>
            </div>
            <div class="flex justify-center">
                <button @click="$emit('deleteItem', item._id)" class="bg-red-500 px-3 py-2 rounded-md">Delete</button>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
// @ts-nocheck
import type { CartItem } from '~/types/cart';

defineProps<{
    items: CartItem[]
}>();

defineEmits<{
    (e: 'updateQuantity', id: string, newQuantity: number): void;
    (e: 'deleteItem', id: string): void;
}>();
</script>