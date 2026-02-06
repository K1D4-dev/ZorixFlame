fetch("products.json")
  .then(r => r.json())
  .then(products => {

    // Каталог
    const catalog = document.getElementById("catalog");
    if (catalog) {
      products.forEach(p => {
        catalog.innerHTML += `
          <a class="card" href="product.html?id=${p.id}">
            <img src="${p.image}" alt="">
            <h3>${p.title.replace(/\n/g, "<br>")}</h3>
            <p class="price">${p.price} грн</p>
          </a>
        `;
      });
    }

    // Сторінка товару
    const id = Number(new URLSearchParams(location.search).get("id"));
    const product = products.find(p => p.id === id);

    if (!product) return;

    title.textContent = product.title;
    image.src = product.image;
    price.textContent = product.price + " грн";
    desc.innerHTML = product.description.replace(/\n/g, "<br>");

    const specsList = document.getElementById("specs-list");
    specsList.innerHTML = "";

    if (product.specs) {
      for (const key in product.specs) {
        specsList.innerHTML += `
          <li>
            <span class="spec-name">${key}</span>
            <span class="spec-value">${product.specs[key]}</span>
          </li>
        `;
      }
    }
  });
