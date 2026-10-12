// Данные товаров (позже можно вынести в отдельный JSON)
const products = [
  {
    id: 1,
    name: "Кольцо золотое с фианитами",
    category: "rings",
    price: "24 900 ₽",
    images: [
      "images/ring1.jpg",
      "images/ring2.jpg"
    ],
    material: "Золото 585",
    weight: "3.2 г",
    size: "16–20",
    description: "Элегантное золотое кольцо с россыпью фианитов. Подходит как для повседневной носки, так и для особых случаев."
  },
  {
    id: 2,
    name: "Кольцо серебряное минимализм",
    category: "rings",
    price: "4 500 ₽",
    images: [
      "images/ring2.jpg"
    ],
    material: "Серебро 925",
    weight: "2.1 г",
    size: "16–19",
    description: "Лаконичное серебряное кольцо в минималистичном стиле. Универсальное украшение на каждый день."
  },
  {
    id: 3,
    name: "Обручальные кольца",
    category: "rings",
    price: "от 35 000 ₽",
    images: [
      "images/chain1.jpg"
    ],
    material: "Золото 585",
    weight: "пара",
    size: "по запросу",
    description: "Классические обручальные кольца. Возможна гравировка и подбор размера."
  },
  {
    id: 4,
    name: "Серьги-пусеты с фианитами",
    category: "earrings",
    price: "6 800 ₽",
    images: [
      "images/earring1.jpg"
    ],
    material: "Серебро 925",
    weight: "1.8 г",
    size: "—",
    description: "Нежные серьги-пусеты с фианитами. Лёгкие и комфортные в носке."
  },
  {
    id: 5,
    name: "Серьги золотые длинные",
    category: "earrings",
    price: "18 500 ₽",
    images: [
      "images/earring2.jpg"
    ],
    material: "Золото 585",
    weight: "4.5 г",
    size: "—",
    description: "Изящные длинные серьги из золота. Подчёркивают шею и лицо."
  },
  {
    id: 6,
    name: "Серьги серебряные классика",
    category: "earrings",
    price: "3 900 ₽",
    images: [
      "images/jewelry1.jpg"
    ],
    material: "Серебро 925",
    weight: "2.4 г",
    size: "—",
    description: "Классические серебряные серьги. Подходят под любой образ."
  },
  {
    id: 7,
    name: "Цепь золотая якорная",
    category: "chains",
    price: "42 000 ₽",
    images: [
      "images/chain1.jpg"
    ],
    material: "Золото 585",
    weight: "8.7 г",
    size: "50 см",
    description: "Массивная якорная цепь из золота. Яркий акцент в образе."
  },
  {
    id: 8,
    name: "Колье серебряное",
    category: "chains",
    price: "8 200 ₽",
    images: [
      "images/necklace1.jpg"
    ],
    material: "Серебро 925",
    weight: "5.1 г",
    size: "45 см",
    description: "Элегантное серебряное колье. Можно носить как самостоятельно, так и с подвеской."
  },
  {
    id: 9,
    name: "Цепь серебряная тонкая",
    category: "chains",
    price: "5 400 ₽",
    images: [
      "images/jewelry1.jpg"
    ],
    material: "Серебро 925",
    weight: "3.3 г",
    size: "45 см",
    description: "Тонкая серебряная цепь. Универсальное базовое украшение."
  },
  {
    id: 10,
    name: "Браслет серебряный декоративный",
    category: "bracelets",
    price: "7 200 ₽",
    images: [
      "images/bracelet1.jpg"
    ],
    material: "Серебро 925",
    weight: "6.5 г",
    size: "17–19 см",
    description: "Декоративный браслет с фианитами. Элегантное дополнение к образу."
  },
  {
    id: 11,
    name: "Подвеска золотая с фианитом",
    category: "pendants",
    price: "9 800 ₽",
    images: [
      "images/pendant1.jpg"
    ],
    material: "Золото 585",
    weight: "1.4 г",
    size: "—",
    description: "Изящная подвеска. Можно носить на цепи или колье."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Гамбургер-меню
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Закрытие при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Каталог
  const grid = document.getElementById('products-grid');
  if (grid) {
    const filterButtons = document.querySelectorAll('.filter-btn');

    function getCategoryFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || 'all';
    }

    function renderProducts(filter = 'all') {
      const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

      grid.innerHTML = filtered.map(product => `
        <a href="product.html?id=${product.id}" class="product-card">
          <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-material">${product.material}</p>
            <p class="product-price">${product.price}</p>
          </div>
        </a>
      `).join('');

      filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        renderProducts(filter);
        const url = filter === 'all' ? 'catalog.html' : `catalog.html?category=${filter}`;
        history.pushState({}, '', url);
      });
    });

    const initialFilter = getCategoryFromUrl();
    renderProducts(initialFilter);
  }

  // Страница товара
  const productPage = document.getElementById('product-page');
  if (productPage) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (!product) {
      productPage.innerHTML = `
        <div class="container" style="text-align:center; padding: 4rem 0;">
          <h1>Товар не найден</h1>
          <a href="catalog.html" class="btn" style="margin-top:1.5rem;">Вернуться в каталог</a>
        </div>`;
      return;
    }

    document.title = `${product.name} — Эксклюзив`;

    const gallery = product.images.map((src, i) => `
      <img src="${src}" alt="${product.name}" class="${i === 0 ? 'active' : ''}" data-index="${i}">
    `).join('');

    const thumbs = product.images.map((src, i) => `
      <img src="${src}" alt="" class="thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
    `).join('');

    productPage.innerHTML = `
      <div class="container product-layout">
        <div class="product-gallery">
          <div class="gallery-main">${gallery}</div>
          ${product.images.length > 1 ? `<div class="gallery-thumbs">${thumbs}</div>` : ''}
        </div>

        <div class="product-details">
          <p class="uppercase">${product.material}</p>
          <h1>${product.name}</h1>
          <p class="product-price-large">${product.price}</p>
          <p class="product-desc">${product.description}</p>

          <div class="product-specs">
            <div><span>Материал</span><strong>${product.material}</strong></div>
            <div><span>Вес</span><strong>${product.weight}</strong></div>
            <div><span>Размер</span><strong>${product.size}</strong></div>
          </div>

          <a href="https://t.me/jewerlyexlusivbelogorsk?text=Здравствуйте! Хочу уточнить наличие: ${encodeURIComponent(product.name)}" 
             class="btn btn-accent" target="_blank" rel="noopener">
            Уточнить в Telegram
          </a>

          <p class="product-note">Наличие и точную цену уточняйте у менеджера. Можно забронировать товар.</p>
        </div>
      </div>
    `;

    // Переключение фото
    const mainImages = productPage.querySelectorAll('.gallery-main img');
    const thumbImages = productPage.querySelectorAll('.thumb');

    thumbImages.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = thumb.dataset.index;
        mainImages.forEach(img => img.classList.remove('active'));
        thumbImages.forEach(t => t.classList.remove('active'));
        mainImages[index].classList.add('active');
        thumb.classList.add('active');
      });
    });
  }
});

