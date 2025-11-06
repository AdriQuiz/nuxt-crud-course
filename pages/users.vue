<template>
    <section class="m-5 bg-slate-700 p-5 rounded-lg">
        <h2 class="text-3xl flex justify-center my-4 text-white">Users</h2>

        <div class="mb-4">
            <button @click="openCreateModal" class="p-2 bg-cyan-400 rounded-lg">+ Create User</button>
        </div>

        <UserForm v-if="showModal" 
            :is-edit="isEdit" 
            :form-data="isEdit ? editUser : newUser"
            @submit="isEdit ? handleUpdate() : handleCreate()" 
            @cancel="closeModal" 
            :loading="loading"
        />

        <!-- <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-black px-8 py-6 rounded-lg max-w-3xl w-full">
                <form @submit.prevent="handleUpdate" class="flex flex-col gap-2 mb-4 w-full">
                    <h3 class="text-white text-2xl mb-3">Edit User</h3>
                    <input v-model="editUser.name" placeholder="Name" class="border p-2 mb-3 rounded" />
                    <input v-model="editUser.email" placeholder="Email" class="border p-2 mb-3 rounded" />
                    <input v-model="editUser.password" placeholder="Password" type="password"
                        class="border p-2 mb-3 rounded" />
                    <div class="flex gap-3">
                        <button type="submit" class="bg-blue-400 text-white px-4 p-3 rounded">Update</button>
                        <button type="button" @click="closeModal" class="bg-gray-500 p-3 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div> -->

        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <li v-for="user in users" :key="user._id" class="bg-slate-400 p-3 rounded-md">
                <div class="flex flex-col gap-1 mb-4">
                    <h3 class="text-xl">{{ user.name }}</h3>
                    <p>{{ user.email }}</p>
                </div>
                <div class="flex gap-4">
                    <button @click="openEditModal(user)" class="bg-yellow-300 px-3 py-2 rounded-md">Edit</button>
                    <button @click="handleDelete(user._id)" class="bg-red-500 px-3 py-2 rounded-md">Delete</button>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { useUsers } from '#imports';
import type { CreateUserPayload, UpdateUserPayload, User } from '~/types/user';

const { getUsers, createUser, updateUser, deleteUser } = useUsers();
const toast = useToast() as any;

// Modal y edicion
const showModal = ref(false);
const isEdit = ref(false);
const editUserId = ref<string>('');
const loading = ref(false);

// Form data
const editUser = reactive<UpdateUserPayload>({ name: '', email: '', password: '' });
const newUser = reactive<CreateUserPayload>({ name: '', email: '', password: '' });

// Users
const { data: users, refresh: refreshUsers } = await getUsers();

const openCreateModal = () => {
    isEdit.value = false;
    showModal.value = true;
};

const openEditModal = (user: User) => {
    isEdit.value = true;
    editUserId.value = user._id;
    Object.assign(editUser, user);
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    Object.assign(newUser, { name: '', email: '', password: '' });
    Object.assign(editUser, { name: '', email: '', password: '' });
    editUserId.value = '';
};

const validateUser = (user: CreateUserPayload | UpdateUserPayload): boolean => {
    if (!user.name || user.name.trim() === '') {
        toast.error({ title: 'Invalid data', message: 'User name is required.' });
        return false;
    }

    if (!user.email) {
        toast.error({ title: 'Invalid data', message: 'Email is required' });
        return false;
    }

    if (!user.password) {
        toast.error({ title: 'Invalid data', message: 'Password is required' });
        return false;
    }

    return true;
};

const handleCreate = async () => {
    if (!validateUser(newUser)) return;

    loading.value = true;
    const { error } = await createUser({ ...newUser });
    loading.value = false;

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'User created successfully.' });
        closeModal();
        await refreshUsers();
    } else {
        toast.error({ title: 'Error!', message: 'Could not create user.' })
    }
}

const handleUpdate = async () => {
    if (!validateUser(editUser)) return;

    loading.value = true;
    const { error } = await updateUser(editUserId.value, { ...editUser });
    loading.value = false;

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'User updated successfully.' });
        closeModal();
        await refreshUsers();
    } else {
        toast.error({ title: 'Error!', message: 'Could not update user.' });
    }
};

const handleDelete = async (id: string) => {
    loading.value = true;
    const { error } = await deleteUser(id);
    loading.value = false;
    
    if (!error.value) {
        toast.success({ title: 'Success!', message: 'User deleted successfully.' });
        await refreshUsers();
    } else {
        toast.error({ title: 'Error!', message: 'Could not delete user.' });
    }
};
</script>