<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-black px-8 py-6 rounded-lg max-w-3xl w-full">
            <form @submit.prevent="submitForm" class="flex flex-col gap-2 mb-4 w-full">
                <h3 class="text-white text-2xl mb-3">
                    {{ isEdit ? 'Edit Product' : 'Create Product' }}
                </h3>
                <input v-model="formData.name" placeholder="Name" class="border p-2 mb-3 rounded" />
                <input v-model="formData.price" placeholder="Price" class="border p-2 mb-3 rounded" type="number" />
                <input v-model="formData.stock" placeholder="Stock" class="border p-2 mb-3 rounded" type="number" />
                <div class="flex gap-3">
                    <button type="submit" :disabled="props.loading" class="bg-blue-400 text-white px-4 p-3 rounded">
                        {{ isEdit ? 'Update' : 'Create' }}
                    </button>
                    <button type="button" :disabled="props.loading" @click="$emit('cancel')" class="bg-gray-500 p-3 rounded">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import type { CreateProductPayload, UpdateProductPayload } from '~/types/product';

const props = defineProps<{
    isEdit: boolean,
    formData: CreateProductPayload | UpdateProductPayload,
    loading?: boolean
}>();

const emit = defineEmits<{
    (e: 'submit'): void,
    (e: 'cancel'): void
}>();

const submitForm = () => {
    emit('submit');
}
</script>