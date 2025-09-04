const API = 'http://localhost:8080/products';

async function fetchProducts() {
    const res = await fetch(API);
    const products = await res.json();
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <span>${p.name} - R$${p.price}</span>
            <span>
                <button onclick="editProduct(${p.id})">Editar</button>
                <button onclick="deleteProduct(${p.id})">Deletar</button>
            </span>
        `;
        container.appendChild(div);
    });
}

async function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    if (!name || !price) return alert('Preencha todos os campos!');
    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
    });
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    fetchProducts();
}

async function editProduct(id) {
    const name = prompt('Novo nome:');
    const price = prompt('Novo preço:');
    if (!name || !price) return;
    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
    });
    fetchProducts();
}

async function deleteProduct(id) {
    if (!confirm('Deseja realmente deletar?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchProducts();
}

// Inicializa
fetchProducts();
