const BASE = '';

async function checkHealth() {
  const badge = document.getElementById('health-badge');
  try {
    const res = await fetch(`${BASE}/health`);
    const data = await res.json();
    badge.textContent = data.status === 'ok' ? 'healthy' : 'unhealthy';
    badge.className = 'badge ' + (data.status === 'ok' ? 'ok' : 'error');
  } catch {
    badge.textContent = 'offline';
    badge.className = 'badge error';
  }
}

async function loadItems() {
  const list = document.getElementById('items-list');
  try {
    const res = await fetch(`${BASE}/api/items`);
    const items = await res.json();
    if (items.length === 0) {
      list.innerHTML = '<li class="empty">No items yet.</li>';
      return;
    }
    list.innerHTML = items.map(item => `
      <li>
        <span>${item.name}</span>
        <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
      </li>
    `).join('');
  } catch {
    list.innerHTML = '<li class="empty">Failed to load items.</li>';
  }
}

async function addItem() {
  const input = document.getElementById('item-input');
  const name = input.value.trim();
  if (!name) return;
  await fetch(`${BASE}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  input.value = '';
  loadItems();
}

async function deleteItem(id) {
  await fetch(`${BASE}/api/items/${id}`, { method: 'DELETE' });
  loadItems();
}

// Allow pressing Enter to add item
document.getElementById('item-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addItem();
});

checkHealth();
loadItems();
