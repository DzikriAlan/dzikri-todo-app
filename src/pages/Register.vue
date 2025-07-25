<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Username</label>
          <input v-model="username" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Email</label>
          <input v-model="email" type="email" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-6">
          <label class="block mb-1 font-semibold">Password</label>
          <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
      </form>
      <div v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</div>
      <div class="mt-4 text-center">
        <router-link to="/login" class="text-blue-500 hover:underline">Sudah punya akun? Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleRegister = async () => {
  error.value = '';
  try {
    const res = await fetch('http://94.74.86.174:8080/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, email: email.value, password: password.value })
    });
    if (res.status === 200 || res.status === 201) {
      window.location.href = '/login';
    } else if (res.status === 401) {
      error.value = 'Unauthorized';
    } else if (res.status === 403) {
      error.value = 'Forbidden';
    } else if (res.status === 404) {
      error.value = 'Not Found';
    } else {
      error.value = 'Register gagal';
    }
  } catch (e) {
    error.value = 'Terjadi error';
  }
};
</script>
