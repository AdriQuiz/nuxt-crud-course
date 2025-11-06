<template>
    <section class="m-5 bg-slate-700 p-5 rounded-lg">
        <h2 class="text-3xl flex justify-center my-4 text-white">Products</h2>

        <div class="mb-4">
            <button @click="openCreateModal" :disabled="loading" class="p-2 bg-cyan-400 rounded-lg">+ Create Product</button>
        </div>
        
        <ProductForm
            v-if="showModal"
            :is-edit="isEdit"
            :form-data="isEdit ? editProduct : newProduct"
            @submit="isEdit ? handleUpdate() : handleCreate()"
            @cancel="closeModal"
            :loading="loading"
        />

        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <li v-for="product in products" :key="product._id" class="bg-slate-400 p-3 rounded-md">
                <div class="flex flex-col gap-1 mb-4">
                    <h3 class="text-xl">{{ product.name }}</h3>
                    <p>Price: ${{ product.price }}</p>
                    <p>Stock: {{ product.stock }}</p>
                </div>
                <div class="flex gap-4">
                    <button @click="openEditModal(product)" :disabled="loading" class="bg-yellow-300 px-3 py-2 rounded-md">Edit</button>
                    <button @click="handleDelete(product._id)" :disabled="loading" class="bg-red-500 px-3 py-2 rounded-md">Delete</button>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { CreateProductPayload, Product, UpdateProductPayload } from '~/types/product';

const { getProducts, createProduct, updateProduct, deleteProduct } = useProducts();
const toast = useToast() as any;

// Modal y edicion
const showModal = ref(false);
const isEdit = ref(false);
const editProductId = ref<string>('');
const loading = ref(false);

// Form data
const editProduct = reactive<UpdateProductPayload>({ name: '', price: 0, stock: 0 });
const newProduct = reactive<CreateProductPayload>({ name: '', price: 0, stock: 0 });

// Users
const { data: products, refresh: refreshProducts } = await getProducts();

const openCreateModal = () => {
    isEdit.value = false;
    showModal.value = true;
};

const openEditModal = (product: Product) => {
    isEdit.value = true;
    editProductId.value = product._id;
    Object.assign(editProduct, product);
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    Object.assign(newProduct, { name: '', price: 0, stock: 0 });
    Object.assign(editProduct, { name: '', price: 0, stock: 0 });
    editProductId.value = '';
};

const validateProduct = (product: CreateProductPayload | UpdateProductPayload): boolean => {
    if (!product.name || product.name.trim() === '') {
        toast.error({ title: 'Invalid data', message: 'Product name is required.' });
        return false;
    }

    if ((product.price ?? 0) < 0) {
        toast.error({ title: 'Invalid data', message: 'Stock cannot be negative.' });
        return false;
    }

    if ((product.stock ?? 0) < 0) {
        toast.error({ title: 'Invalid data', message: 'Stock cannot be negative.' });
        return false;
    }

    return true;
};

const handleCreate = async () => {
    if (!validateProduct(newProduct)) return;

    loading.value = true;
    const { error } = await createProduct({ ...newProduct });
    loading.value = false;

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'Product created successfully.' });
        closeModal();
        await refreshProducts();
    } else {
        toast.error({ title: 'Error!', message: 'Could not create product.' })
    }
}

const handleUpdate = async () => {
    if (!validateProduct(editProduct)) return;

    loading.value = true;
    const { error } = await updateProduct(editProductId.value, { ...editProduct });
    loading.value = false;

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'Product updated successfully.' });
        closeModal();
        await refreshProducts();
    } else {
        toast.error({ title: 'Error!', message: 'Could not update product.' });
    }
};

const handleDelete = async (id: string) => {
    loading.value = true;
    const { error } = await deleteProduct(id);
    loading.value = false;

    if (!error.value) {
        toast.success({ title: 'Success!', message: 'Product deleted successfully.' });
        await refreshProducts();
    } else {
        toast.error({ title: 'Error!', message: 'Could not delete product.' });
    }
};
</script>