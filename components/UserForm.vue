<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-black px-8 py-6 rounded-lg max-w-3xl w-full">
            <form @submit.prevent="submitForm" class="flex flex-col gap-2 mb-4 w-full">
                <h3 class="text-white text-2xl mb-3">
                    {{ isEdit ? 'Edit User' : 'Create User' }}
                </h3>
                <input v-model="formData.name" placeholder="Name" class="border p-2 mb-3 rounded" />
                <input v-model="formData.email" placeholder="Email" class="border p-2 mb-3 rounded" />
                <input v-model="formData.password" placeholder="Password" type="password"
                    class="border p-2 mb-3 rounded" />
                <div class="flex gap-3">
                    <button type="submit" class="bg-blue-400 text-white px-4 p-3 rounded">
                        {{ isEdit ? 'Update' : 'Create' }}
                    </button>
                    <button type="button" @click="$emit('cancel')" class="bg-gray-500 p-3 rounded">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import type { CreateUserPayload, UpdateUserPayload } from '~/types/user';

const props = defineProps<{
    isEdit: boolean,
    formData: CreateUserPayload | UpdateUserPayload
}>();

const emit = defineEmits<{
    (e: 'submit'): void,
    (e: 'cancel'): void
}>();

const submitForm = () => {
    emit('submit');
}
</script>