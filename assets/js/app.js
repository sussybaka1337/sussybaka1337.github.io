function createPreview(content, length) {
  if (content.length <= length) {
    return content;
  } else {
    return content.slice(0, length) + "...";
  }
}

function renderTours(selector, tours) {
  var vietnamToursHTML = "";
  for (const tour of tours) {
    const vietnamTourHTML = `
    <div class="swiper-slide">
      <div class="card" style="width: 20rem">
      <div class="hovereffect">
        <img class="card-img-top" src="${tour.cardPicture}" alt="">
        <div class="overlay">
          <h2>${tour.startPlace}</h2>
        </div>
      </div>
        <div class="card-body">
          <!-- Tour information -->
          <div class="d-flex flex-column justify-content-start">
            <a class="text-start mb-3 tour-title" href="#">${createPreview(
              tour.tourTitle,
              50
            )}</a>
            <div class="d-flex align-items-center">
              <i class="fa-regular fa-clock mx-2"></i>
              <a style="font-size: 0.85rem">${tour.tourTime}</a>
            </div>
            <div class="d-flex align-items-center mt-1">
              <i class="fa-regular fa-calendar mx-2"></i>
              <a style="font-size: 0.85rem">${tour.tourSchelude}</a>
            </div>
            <div class="d-flex align-items-center mt-1">
              <i class="fa-regular fa-user mx-2"></i>
              <a style="font-size: 0.85rem">${tour.tourPlace}</a>
            </div>
            <div class="d-flex align-items-center mt-1">
              <i class="fa-solid fa-sack-dollar mx-2"></i>
              <a class="text-decoration-none" style="color: red; font-weight: bold;">${
                tour.tourPrice
              }</a>
            </div>
          </div>
          <!-- Tour information -->
        </div>
      </div>
    </div>`;
    vietnamToursHTML += vietnamTourHTML;
  }
  $(selector).html(vietnamToursHTML);
}

$(document).ready(function () {
  try {
    renderTours("#vietnamTours", vietnamTours);
    renderTours("#foreignTours", foreignTours);
  } catch (exception) {
    // Ẩn lỗi khó chịu ở Chrome Console
  }
});
