const ol = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const itemInTheCart = document.querySelector('.cart__item');
  itemInTheCart.remove();
  itemInTheCart.addEventListener('click', cartItemClickListener);
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemsToCart = (event) => {
  const itemSku = getSkuFromProductItem(event.target.parentElement);
  fetchItem(itemSku).then((product) => {
    ol.appendChild(createCartItemElement(product));
  });
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', addItemsToCart);
  return section;
};

const renderProductItems = async () => {
  const productItemsSection = document.querySelector('.items');

  try {
    const products = await fetchProducts('computador');
    products.results.forEach((productItem) => {
    const productImage = createProductItemElement(productItem);

    productItemsSection.appendChild(productImage);
    });
  } catch (error) {
    console.error(error);
}
};

window.onload = () => { 
  renderProductItems();
};
