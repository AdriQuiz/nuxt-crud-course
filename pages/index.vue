<template>
    <section class="min-h-screen flex flex-col justify-center 
        items-center p-8 space-y-8">
        <h1 class="text-2xl font-bold">Shopping Cart</h1>
        <p class="">Select an option:</p>
        
        <div class="flex gap-3">
            <NuxtLink to="/products" class="p-2 bg-blue-300">
                Ver Productos
            </NuxtLink>
            <NuxtLink to="/users" class="p-2 bg-blue-300">
                Ver Usuarios
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
useHead({
    title: 'Inicio de la app'
})
</script>