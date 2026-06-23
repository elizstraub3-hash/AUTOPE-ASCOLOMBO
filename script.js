// ========== SLIDER ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
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
  'Ford': ['Ka', 'Fiesta', 'Ecosport', 'Focus', 'Ranger', 'Territory', 'Bronco Sport'],
  'Honda': ['Civic', 'Fit', 'HR-V', 'CR-V', 'City', 'WR-V'],
  'Toyota': ['Corolla', 'Hilux', 'Yaris', 'SW4', 'RAV4', 'Etios'],
  'Hyundai': ['HB20', 'Creta', 'Tucson', 'i30', 'Santa Fe'],
  'Renault': ['Sandero', 'Duster', 'Logan', 'Kwid', 'Captur', 'Oroch'],
  'Jeep': ['Renegade', 'Compass', 'Wrangler', 'Commander'],
  'Nissan': ['Kicks', 'Frontier', 'Versa', 'Sentra', 'March'],
};

function loadModelos() {
  const marca = document.getElementById('sel-marca').value;
  const selModelo = document.getElementById('sel-modelo');
  selModelo.innerHTML = '<option value="">Selecione o Modelo</option>';
  if (modelosPorMarca[marca]) {
    modelosPorMarca[marca].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      selModelo.appendChild(opt);
    });
  }
}

// ========== CART BUTTONS ==========
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> ADICIONADO!';
    this.style.background = '#27ae60';
    setTimeout(() => {
      this.innerHTML = original;
      this.style.background = '';
    }, 1500);

    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = parseInt(cartCount.textContent || 0) + 1;
    }
  });
});

// ========== BACK TO TOP ==========
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backTop');
  if (btn) {
    btn.classList.toggle('show', window.scrollY > 400);
  }
});

// ========== SEARCH ==========
document.getElementById('searchInput')?.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && this.value.trim()) {
    alert('Buscando por: ' + this.value);
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
