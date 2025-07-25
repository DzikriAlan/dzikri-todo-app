<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="handleLogin" autocomplete="off">
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Username</label>
            <input v-model="username" type="text" class="w-full border rounded px-3 py-2" required autocomplete="username" />
          </div>
          <div class="mb-6">
            <label class="block mb-1 font-semibold">Password</label>
            <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required autocomplete="current-password" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        </form>
      <div v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  try {
    const res = await fetch('http://94.74.86.174:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    const data = await res.json();
    if (res.status === 200 && data.data && data.data.token) {
      localStorage.setItem('token', data.data.token);
      router.push({ name: 'Checklists' });
    } else if (res.status === 401) {
      error.value = 'Unauthorized';
    } else if (res.status === 403) {
      error.value = 'Forbidden';
    } else if (res.status === 404) {
      error.value = 'Not Found';
    } else {
      error.value = data.message || 'Login gagal';
    }
  } catch (e) {
    error.value = 'Terjadi error';
  }
};
</script>
