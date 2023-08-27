const navbar = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  {
    name: 'Our Products',
    id: 'product',
    child: [
      { name: 'Product 1', id: 'p1' },
      { name: 'Product 2', id: 'p2' },
      { name: 'Product 3', id: 'p3' },
      { name: 'Product 4', id: 'p4' },
    ],
  },
  { name: 'Contact Us', id: 'contact' },
];

const navbarElement = document.getElementById('navbar');
const productList = document.getElementById('product-list');
const contactForm = document.getElementById('contact-form');

function createMenu() {
  navbar.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;

    if (item.child) {
      li.classList.add('has-child');
      const ul = document.createElement('ul');
      item.child.forEach(childItem => {
        const childLi = document.createElement('li');
        childLi.textContent = childItem.name;
        ul.appendChild(childLi);
      });
      li.appendChild(ul);
    }

    navbarElement.appendChild(li);
  });
}

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price}$</p>
      `;
      productList.appendChild(productDiv);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = contactForm.querySelector('#name').value;
  const email = contactForm.querySelector('#email').value;
  const message = contactForm.querySelector('#message').value;

  if (name && email && message) {
    alert('Form submitted successfully!');
    // You can send the form data to a server here
  } else {
    alert('Please fill in all fields.');
  }
});

createMenu();
fetchProducts();
