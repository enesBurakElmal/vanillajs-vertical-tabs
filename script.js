const tabItems = document.querySelectorAll('.tab-list-item')
const popUp = document.querySelector('.pop-up-wrapper')
const tabCategoryWrapper = document.querySelector('.tab-list-wrapper')
const initialTabState = 'Tamir, Tadilat Gereçleri'

const swiperProducts = new Swiper('.swiper', {
  slidesPerView: 4,
  spaceBetween: 20,

  preloadImages: false,
  lazy: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    stopOnLastSlide: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    100: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
})

const createTabCategory = (tabData) => {
  tabData.forEach((tabItem, index) => {
    const categoryItem = document.createElement('li')

    categoryItem.classList.add('tab-list-item')
    index == 0 && categoryItem.classList.add('active')
    categoryItem.textContent = tabItem
    categoryItem.setAttribute('data-tab', tabItem)
    tabCategoryWrapper.appendChild(categoryItem)

    categoryItem.addEventListener('click', (e) => {
      const item = e.target
      const data = item.getAttribute('data-tab')
      makeActive(item)
      getProductData(data)
    })
  })
}

const popUpController = () => {
  const buyButton = document.querySelectorAll('.product-item-buy-button')

  buyButton.forEach((item) => {
    item.addEventListener('click', (e) => {
      const product = e.target.dataset.product
      createPopUp(product)
    })
  })
}

const createPopUp = (product) => {
  const popUp = document.querySelector('.pop-up-content')
  const popUpCloser = document.querySelector('.pop-up-closer')
  const popUpProductContainer = document.querySelector('.pop-up-product')

  popUpProductContainer.textContent = product + ' sepete eklendi!'
  popUp.style.display = 'flex'

  popUpCloser.addEventListener('click', () => {
    popUp.style.display = 'none'
  })
}

const createSlider = (sliderData) => {
  swiperProducts.removeAllSlides()
  sliderData.forEach((item) => {
    swiperProducts.appendSlide(`
      <div class="product-item swiper-slide" key="${item.productId}">
          <div class="product-item-image">
          <img data-src="${item.image}" alt="${
      item.name
    }" class="product-item-tag swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
          </div>
          <div class="product-item-info">
            <h5 class="product-item-name">${item.name}</h5>
            <p class="product-item-price">${item.priceText}</p>
            <div class="product-item-shipping">${
              item.params.shippingFee
                ? ' <img src="assets/shipping-icon.png" alt="shipping-icon" class="product-item-icon"/><span class="mobile-icon">*</span> <span class="shipping-span"> Ücretsiz Kargo</span>'
                : ''
            }</div>
          </div>
          <div class="product-item-buy-button" data-product="${
            item.name
          }">Sepete Ekle</div>
      </div>
    `)
    popUpController()
  })
}

const makeActive = (targetItem) => {
  const tabItems = document.querySelectorAll('.tab-list-item')
  tabItems.forEach((item) => {
    item.classList.remove('active')
    targetItem.classList.add('active')
  })
}

const getTabData = () => {
  fetch('./product-list.json')
    .then((response) => response.json())
    .then((data) => {
      const allCategories = data.params.userCategories /// Fetch All Categories
      createTabCategory(allCategories)
    })
}

const getProductData = (products) => {
  fetch('./product-list.json')
    .then((response) => response.json())
    .then((data) => {
      const selectedCategory = data.params.recommendedProducts[products] /// Fetch All Products
      createSlider(selectedCategory)
    })
}

getTabData()

getProductData(initialTabState)
