// src/api/checklist.js
const API_URL = 'http://94.74.86.174:8080/api';

function getToken() {
  return localStorage.getItem('token');
}

export async function getAllChecklists() {
  const res = await fetch(`${API_URL}/checklist`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export async function createChecklist(name) {
  const res = await fetch(`${API_URL}/checklist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function deleteChecklist(id) {
  const res = await fetch(`${API_URL}/checklist/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

// Checklist Item API
export async function getChecklistItems(checklistId) {
  const res = await fetch(`${API_URL}/checklist/${checklistId}/item`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export async function createChecklistItem(checklistId, itemName) {
  const res = await fetch(`${API_URL}/checklist/${checklistId}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ itemName }),
  });
  return res.json();
}

export async function getChecklistItem(checklistId, itemId) {
  const res = await fetch(`${API_URL}/checklist/${checklistId}/item/${itemId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export async function updateChecklistItemStatus(checklistId, itemId) {
  const res = await fetch(`${API_URL}/checklist/${checklistId}/item/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}

export async function deleteChecklistItem(checklistId, itemId) {
  const res = await fetch(`${API_URL}/checklist/${checklistId}/item/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export async function renameChecklistItem(checklistId, itemId, itemName) {
  const res = await fetch(`${API_URL}/checklist/${checklistId}/item/rename/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ itemName }),
  });
  return res.json();
}
