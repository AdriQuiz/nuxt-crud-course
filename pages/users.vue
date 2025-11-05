<template>
    <section class="m-5 bg-slate-700 p-5 rounded-lg">
        <h2 class="text-3xl flex justify-center my-4 text-white">Users</h2>

        <div class="mb-4">
            <button @click="showModal = true" class="p-2 bg-cyan-400 rounded-lg">+ Create User</button>
        </div>
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-black px-8 py-6 rounded-lg max-w-3xl w-full">
                <form @submit.prevent="handleCreate" class="flex flex-col gap-2 mb-4 w-full">
                    <h3 class="text-white text-2xl mb-3">Create user</h3>
                    <input v-model="newUser.name" placeholder="Name" class="border p-2 mb-3 rounded" />
                    <input v-model="newUser.email" placeholder="Email" class="border p-2 mb-3 rounded" />
                    <input v-model="newUser.password" placeholder="Password" type="password"
                        class="border p-2 mb-3 rounded" />
                    <div class="flex gap-3">
                        <button type="submit" class="bg-blue-400 text-white px-4 p-3 rounded">Create</button>
                        <button type="button" @click="closeModal" class="bg-gray-500 p-3 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
        </div>

        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <li v-for="user in users" :key="user._id" class="bg-slate-400 p-3 rounded-md">
                <div class="flex flex-col gap-1 mb-4">
                    <h3 class="text-xl">{{ user.name }}</h3>
                    <p>{{ user.email }}</p>
                </div>
                <div class="flex gap-4">
                    <button @click="openEditModal(user)" class="bg-yellow-300 px-3 py-2 rounded-md">Edit</button>
                    <button class="bg-red-500 px-3 py-2 rounded-md">Delete</button>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { useUsers } from '#imports';
import type { CreateUserPayload, UpdateUserPayload, User } from '~/types/user';

const { getUsers, createUser, updateUser, deleteUser } = useUsers();

// Listar usuarios
const users = ref<User[]>([]);
const toast = useToast() as any;

const loadUsers = async () => {
    const { data } = await getUsers();
    if (data.value) users.value = data.value;
};

onMounted(loadUsers);

// Crear usuario
const showModal = ref(false);
const closeModal = () => {
    showModal.value = false;
    showEditModal.value = false;

    Object.assign(newUser, { name: '', email: '', password: '' });
    Object.assign(editUser, { name: '', email: '', password: '' });

    editUserId.value = '';
};

const newUser = reactive<CreateUserPayload>({
    name: '',
    email: '',
    password: ''
});

const handleCreate = async () => {
    const { error } = await createUser({ ...newUser });
    if (!error.value) {
        toast.success({ title: 'Success!', message: 'User created successfully.' })
        Object.assign(newUser, { name: '', email: '', password: '' });
        closeModal();
        await loadUsers();
    } else {
        toast.error({ title: 'Error!', message: 'Could not create user.' })
    }
}

// Edit user
const showEditModal = ref(false);
const editUserId = ref<string>('');
const editUser = reactive<UpdateUserPayload>({ name: '', email: '', password: '' });

const openEditModal = (user: User) => {
    editUserId.value = user._id;
    Object.assign(editUser, user);
    showEditModal.value = true;
};

const handleUpdate = async () => {
    const { error } = await updateUser(editUserId.value, { ...editUser });

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'User updated successfully.' });
        showEditModal.value = false;
        await loadUsers();
    } else {
        toast.error({ title: 'Error!', message: 'Could not update user.' });
    }
};
</script>