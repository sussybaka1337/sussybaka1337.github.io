function redirect(url) {
  window.location.href = url;
}
function getStartRecordID(page) {
  return (page - 1) * 10;
}
function getQuery(field) {
  const url = new URL(window.location.href);
  return url.searchParams.get(field);
}
function getCurrentPage() {
  const page = getQuery('page');
  return page == null ? 1 : parseInt(page);
}
function getCurrentProductId() {
  const productId = getQuery('productId');
  return productId == null ? 1 : parseInt(productId);
}
function getTotalPages() {
  return Math.floor(products.length / 10);
}
function renderPageButton(pageButton) {
  return `<li class="page-item${page == pageButton ? ' active': ''}"${page == pageButton ? ' aria-current="page"': ''}>
  <a class="page-link" href="products.html?page=${pageButton}">${pageButton}</a>
  </li>`;
}
const page = getCurrentPage();
const productId = getCurrentProductId();
function renderPreviousNavigation() {
  return `<li class="page-item${page == 1 ? ' disabled' : ''}">
  <a class="page-link" href="products.html?page=${page - 1}" tabindex="-1" aria-disabled="${page == 1 ? 'true' : 'false'}">Back</a>
  </li>`;
}
function renderNextNavigation() {
  return `<li class="page-item${page == getTotalPages() ? ' disabled' : ''}">
  <a class="page-link" href="products.html?page=${ page + 1 }" tabindex="-1" aria-disabled="${page == getTotalPages() ? 'true' : 'false'}">Next</a>
  </li>`;
}
function renderPagination() {
  var pagination = '';
  pagination += renderPreviousNavigation();
  pagination += renderPageButton(page);
  pagination += renderNextNavigation();
  return pagination;
}
function getProductsByPage() {
  var productsHTML = '';
  const startRecordID = getStartRecordID(page);
  for (let count = startRecordID; count < startRecordID + 10; count++) {
    const product = products[count];
    productsHTML += `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="card border-secondary border">
        <img class="card-img-top" src="assets/images/product.jpg" alt="">
        <div class="card-body">
          <h3 class="card-title mb-1">${product.name}</h3>
          <h3 class="card-text mb-1 text-danger">${product.price}</h3>
          <div class="mb-1">
            <h4><span class="badge badge-success-lighten">Còn hàng</span></h4>
          </div>
          <div class="flex flex-column">
            <button class="btn rounded-pill btn-primary" onclick="redirect('details.html?productId=${product.id}');">View Product</button>
            <button class="btn rounded-pill btn-primary">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>`;
  }
  return productsHTML;
}
function renderProductDetails() {
  const product = products.find(product => product.id == productId);
  return `
  <h3 class="mt-0">${ product.name }</h3>
  <p class="mb-1">
    Ngày thêm: 13/09/2005
  </p>
  <div class="mt-3">
    <h4><span class="badge badge-success-lighten">Còn hàng</span></h4>
  </div>
  <div class="mt-4">
    <h6 class="font-14">Giá sản phẩm:</h6>
    <h3 class="text-danger">${ product.price }</h3>
  </div>
  <div class="mt-4">
    <h6 class="font-14">Số lượng</h6>
    <div class="d-flex">
      <input type="number" min="1" value="1" class="form-control" style="width: 90px;">
      <button type="button" class="btn btn-danger ms-2">Thêm vào giỏ</button>
    </div>
  </div>
  <div class="mt-4">
    <h6 class="font-14">Mô tả sản phẩm:</h6>
    <p>${ product.description }</p>
  </div>
  `;
}
document.addEventListener('DOMContentLoaded', function () {
  try {
    var productsContainer = document.getElementById('products');
    productsContainer.innerHTML += getProductsByPage();
  } catch (exception) {
    //
  }
  try {
    var paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML += renderPagination();
  } catch (exception) {
    //
  }
  try {
    var detailsContainer = document.getElementById('productDetails');
    detailsContainer.innerHTML += renderProductDetails();
  } catch (exception) {
    //
  }
});