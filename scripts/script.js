let allProducts = [];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    himnakanNkarneriMas(data);
  });

function himnakanNkarneriMas(products) {

  let renderProduct = document.querySelector(".himnakanNkarneriMas");

  renderProduct.innerHTML = "";

  products.forEach((element) => {
    let html = `
      <div class="nkarneriDiver">
        <img src="${element.image}" alt="picture" class="himnakanPicturNer">

        <p class="text14 text15">${element.title}</p>
        <p class="text14 text17">${element.price}$ 
          <span class="gniKoxiBary">${element.category}</span>
        </p>

        <button class="orange-botton2">
          <p class="text11"></p>
          <p class="text11"></p>
          <p class="text11" onclick="handleAddProduct(${element.id})">Add To Shopping Cart</p>
        </button>

      </div>
      `;
    renderProduct.innerHTML += html;
  });
}


let select = document.querySelector("#select2");

select.addEventListener("change", (e) => {
  let value = e.target.value;
  if (value === "all") {
    himnakanNkarneriMas(allProducts);
  }
  else {
    let filtered = allProducts.filter(elem => elem.category === value);
    himnakanNkarneriMas(filtered);
  }
});


let minInput = document.querySelector("#input1");
let maxInput = document.querySelector("#input2");

function filterByPrice() {
  let min = Number(minInput.value) || 0;
  let max = Number(maxInput.value) || Infinity;

  let filtered = allProducts.filter(product => {
    return product.price >= min && product.price <= max;
  });

  himnakanNkarneriMas(filtered);
}

minInput.addEventListener("input", filterByPrice);
maxInput.addEventListener("input", filterByPrice);

let select1 = document.querySelector("#select5");

select1.addEventListener("change", (e) => {
  let value = e.target.value;

  if (value === "All") {
    himnakanNkarneriMas(allProducts);
  }
  else if (value === "a-z") {
    let sorted = [...allProducts].sort((a, b) => a.title.localeCompare(b.title));
    himnakanNkarneriMas(sorted);
  }
  else if (value === "z-a") {
    let sorted = [...allProducts].sort((a, b) => b.title.localeCompare(a.title));
    himnakanNkarneriMas(sorted);
  }
  else if (value === "min-max") {
    let sorted = [...allProducts].sort((a, b) => a.price - b.price);
    himnakanNkarneriMas(sorted);
  }
  else if (value === "max-min") {
    let sorted = [...allProducts].sort((a, b) => b.price - a.price);
    himnakanNkarneriMas(sorted);
  }
});

var swiper = new Swiper(".swiper-mySwiper", {
  pagination: {
    el: ".swiper-slide",
    dynamicBullets: true,
  },
});

let search = document.querySelector("#search");

search.addEventListener("input", () => {
  let query = search.value.toLowerCase();

  let filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  if (filtered.length > 0) {
    himnakanNkarneriMas(filtered);
  } else {
    let renderProduct = document.querySelector(".himnakanNkarneriMas");
    renderProduct.innerHTML = "<p class='not-found'>Not found</p>";
  }
});

function handleAddProduct(id) {
  let product = allProducts.find(element => element.id == id)
  let localData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  if (localData.some(elem => elem.id === id)) {
    localData.forEach(elem => {
      if (elem.id === product.id) {
        elem.count = elem.count ? elem.count + 1 : 2
      }
    });
  } else {
    localData.push(product)
  }



  localStorage.setItem('cart', JSON.stringify(localData))
}