// ========== CARRINHO ==========
let cart = JSON.parse(localStorage.getItem('colombo-cart') || '[]');

function saveCart() {
  localStorage.setItem('colombo-cart', JSON.stringify(cart));
}

function addToCart(name, price, img, qtyInputId) {
  const qtyInput = document.getElementById(qtyInputId);
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, img, qty });
  }

  saveCart();
  renderCart();
  updateHeaderCart();
  showToast(`<i class="fas fa-check-circle"></i> ${name.substring(0, 30)}... adicionado!`);
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateHeaderCart();
}

function changeCartQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    removeFromCart(index);
    return;
  }
  saveCart();
  renderCart();
  updateHeaderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateHeaderCart();
}

function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function fmtMoney(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');
  const empty     = document.getElementById('cartEmpty');

  if (cart.length === 0) {
    empty.style.display = 'block';
    footer.style.display = 'none';
    container.innerHTML = '';
    container.appendChild(empty);
    return;
  }

  empty.style.display = 'none';
  footer.style.display = 'block';

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmtMoney(item.price * item.qty)}</div>
        <div class="cart-item-qty">
          <button onclick="changeCartQty(${idx}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeCartQty(${idx}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${idx})" title="Remover">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  const total = cartTotal();
  const pix   = total * 0.95;

  document.getElementById('cartTotal').textContent    = fmtMoney(total);
  document.getElementById('cartTotalPix').textContent = fmtMoney(pix);

  // Atualiza link WhatsApp com resumo do pedido
  const msg = encodeURIComponent(
    'Olá! Gostaria de finalizar meu pedido:\n\n' +
    cart.map(i => `• ${i.qty}x ${i.name} — ${fmtMoney(i.price * i.qty)}`).join('\n') +
    `\n\n*Total: ${fmtMoney(total)}*\n*No PIX: ${fmtMoney(pix)}*`
  );
  document.getElementById('cartWhatsapp').href = `https://wa.me/5541999990000?text=${msg}`;
}

function updateHeaderCart() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const money = cartTotal();
  const countEl = document.querySelector('.cart-count');
  const totalEl = document.querySelector('.cart-btn strong');
  if (countEl) countEl.textContent = total;
  if (totalEl) totalEl.textContent = total === 0 ? 'R$ 0,00' : fmtMoney(money);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Toast
function showToast(msg) {
  let t = document.querySelector('.cart-toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'cart-toast';
    document.body.appendChild(t);
  }
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ========== QTY INPUT ==========
function changeQty(id, delta) {
  const el = document.getElementById(id);
  if (!el) return;
  const val = Math.max(1, parseInt(el.value || 1) + delta);
  el.value = val;
}

// ========== SLIDER ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');
let autoSlideInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(dir) {
  showSlide(currentSlide + dir);
  resetAutoSlide();
}

function goToSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => changeSlide(1), 5000);
}

autoSlideInterval = setInterval(() => changeSlide(1), 5000);

// ========== TABS ==========
function switchTab(btn, tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById(tabId);
  if (el) el.classList.add('active');
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
  document.getElementById('navList').classList.toggle('open');
}

// ========== VEHICLE MODELS ==========
const modelosPorMarca = {
  'Chevrolet': ['Onix', 'Prisma', 'Celta', 'Corsa', 'Cruze', 'S10', 'Spin', 'Tracker'],
  'Volkswagen': ['Gol', 'Polo', 'Voyage', 'Fox', 'Jetta', 'T-Cross', 'Virtus', 'Amarok'],
  'Fiat': ['Uno', 'Palio', 'Siena', 'Strada', 'Toro', 'Pulse', 'Argo', 'Cronos'],
  'Ford': ['Ka', 'Fiesta', 'Ecosport', 'Focus', 'Ranger', 'Territory'],
  'Honda': ['Civic', 'Fit', 'HR-V', 'CR-V', 'City', 'WR-V'],
  'Toyota': ['Corolla', 'Hilux', 'Yaris', 'SW4', 'RAV4'],
  'Hyundai': ['HB20', 'Creta', 'Tucson', 'i30'],
  'Renault': ['Sandero', 'Duster', 'Logan', 'Kwid', 'Captur'],
  'Jeep': ['Renegade', 'Compass', 'Commander'],
  'Nissan': ['Kicks', 'Frontier', 'Versa'],
};

function loadModelos() {
  const marca = document.getElementById('sel-marca').value;
  const sel   = document.getElementById('sel-modelo');
  sel.innerHTML = '<option value="">Selecione o Modelo</option>';
  (modelosPorMarca[marca] || []).forEach(m => {
    const opt = document.createElement('option');
    opt.value = m; opt.textContent = m;
    sel.appendChild(opt);
  });
}

// ========== BACK TO TOP ==========
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backTop');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

// ========== SEARCH ==========
document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && this.value.trim()) {
    showToast(`<i class="fas fa-search"></i> Buscando: ${this.value}`);
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ========== INIT ==========
renderCart();
updateHeaderCart();
