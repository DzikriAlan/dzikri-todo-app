<template>
  <button
    @click="() => { localStorage.removeItem('token'); window.location.href = '/login'; }"
    style="position:fixed;top:1rem;right:1rem;z-index:1000" 
    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
  >Logout</button>
  <div class="mt-5 flex justify-center items-center">
    <div class="w-1/2 gap-4">
      <h1 class="text-2xl font-bold mb-4">Dzikri Alan Checklist</h1>
      <form
        @submit.prevent="addChecklist"
        class="flex mb-4"
      >
        <input
          v-model="newChecklist"
          class="border rounded px-2 py-1 mr-2 flex-1"
          placeholder="New checklist name"
        />
        <button class="bg-blue-500 text-white px-4 py-1 rounded" type="submit">Add</button>
      </form>
      <ul>
        <li
          v-for="checklist in checklists"
          :key="checklist.id"
          class="flex items-center justify-between border-b py-2"
        >
          <router-link
            class="flex-1"
          >{{ checklist.name }}</router-link>
          <button @click="removeChecklist(checklist.id)" class="text-red-500 ml-2">Delete</button>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="!loadingPage" class="flex justify-center items-center">
    <div class="w-1/2 flex flex-wrap gap-4">
      <div
        v-for="checklist in checklists"
        class="mx-auto my-8 bg-white rounded-lg shadow p-8"
      >
        <h1 class="text-2xl font-bold mb-4">{{ checklist.name }}</h1>
        <div class="flex mb-4">
          <input
            v-model="newItem[checklist.id]"
            class="border rounded px-2 py-1 mr-2 flex-1"
            placeholder="Enter For Create New"
            @keyup.enter.prevent="addItem(checklist.id)"
          />
          <button class="bg-blue-500 text-white px-4 py-1 rounded" type="submit" @click.prevent="addItem(checklist.id)">Add</button>
        </div>
        <ul>
          <li
            v-for="item in checklist.items"
            :key="item.id"
            class="mb-4"
          >
            <div
              class="bg-white rounded-lg shadow flex items-center justify-between px-4 py-3"
            >
              <div class="flex items-center flex-1">
                <input
                  type="checkbox"
                  :checked="item.itemCompletionStatus === true"
                  @change="toggleStatus(checklist.id, item.id)"
                  class="mr-2"
                />
                <template
                  v-if="editName[checklist.id] && editName[checklist.id][item.id] !== undefined"
                >
                  <input
                    v-model="editName[checklist.id][item.id]"
                    class="border rounded px-2 py-1 flex-1"
                    @blur="saveRename(checklist.id, item.id)"
                    @keyup.enter.prevent="saveRename(checklist.id, item.id)"
                    @keyup.esc="cancelEdit(checklist.id, item.id, item.name)"
                    autofocus
                  />
                </template>
                <template v-else>
                  <span
                    :title="item?.name"
                    class="mr-2"
                    :class="['cursor-pointer', 'truncate', 'overflow-hidden', 'whitespace-nowrap', 'max-w-xs']"
                    @click="activateEdit(checklist.id, item.id, item.name)"
                  >{{ item.name }}</span>
                </template>
              </div>
              <div class="flex items-center">
                <button
                  @click="activateEdit(checklist.id, item.id, item.name)"
                  class="text-yellow-500 mr-2"
                  title="Rename"
                >Rename</button>
                <button
                  @click="removeItem(checklist.id, item.id)"
                  class="text-red-500"
                  title="Delete"
                >Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center bg-white z-50 w-screen">
    <span class="text-xl font-semibold">Loading...</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  getChecklistItems, createChecklistItem, deleteChecklistItem,
  updateChecklistItemStatus, renameChecklistItem, getAllChecklists, 
  createChecklist, deleteChecklist 
} from '../api/checklist';

const checklists = ref([]);
const newChecklist = ref('');
const newItem = ref({});
const editName = ref({});
const loadingPage = ref(true)

async function fetchChecklists() {
  const res = await getAllChecklists();
  if (res.statusCode == 2100) {
    checklists.value = res.data;
  }
}

async function addChecklist() {
  if (!newChecklist.value.trim()) return;
  const res = await createChecklist(newChecklist.value);
  if (res.statusCode === 2000) {
    newChecklist.value = '';
    fetchChecklists();
  }
}

async function removeChecklist(id) {
  await deleteChecklist(id);
  fetchChecklists();
}

async function fetchItems(idChecklist) {
  const res = await getChecklistItems(idChecklist);
  if (res.statusCode === 2000) {
    items.value[idChecklist] = res.data;
  }
}

async function addItem(id) {
  if (!newItem.value[id] || !newItem.value[id].trim()) return;
  const res = await createChecklistItem(id, newItem.value[id]);
  const checklist = checklists.value.find(cl => cl.id === id);
  let tempItem = {id: 0, name: newItem.value[id], itemCompletionStatus: false}
  checklist.items.push(tempItem);

  if (res.statusCode === 2000 && res.data) {
    if (checklist && Array.isArray(checklist.items)) {
      checklist.items.pop();
      checklist.items.push(res.data);
    }
    newItem.value[id] = '';
  }
}

async function removeItem(idChecklist, idItemChecklist) {
  await deleteChecklistItem(idChecklist, idItemChecklist);
  const checklist = checklists.value.find(cl => cl.id === idChecklist);
  if (checklist && Array.isArray(checklist.items)) {
    checklist.items = checklist.items.filter(item => item && item.id !== idItemChecklist);
  }
}

async function toggleStatus(idChecklist, idItemChecklist) {
  await updateChecklistItemStatus(idChecklist, idItemChecklist);
  fetchItems(idChecklist);
}

async function saveRename(checklistId, itemId) {
  const name = editName.value[checklistId]?.[itemId];
  if (!name || !name.trim()) {
    cancelEdit(checklistId, itemId);
    return;
  }
  await renameChecklistItem(checklistId, itemId, name);
  editName.value[checklistId][itemId] = undefined;
  fetchChecklists();
}

function activateEdit(checklistId, itemId, name) {
  if (!editName.value[checklistId]) editName.value[checklistId] = {};
  editName.value[checklistId][itemId] = name;
}

function cancelEdit(checklistId, itemId, originalName) {
  if (editName.value[checklistId]) {
    editName.value[checklistId][itemId] = undefined;
  }
}

onMounted(() => {
  loadingPage.value = true
  fetchChecklists().then(() => {
    loadingPage.value = false
  });
});
</script>
