document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 690) return; 

  let lastScrollTop = 0;
  const mobileMenu = document.getElementById("quickMenuMo");

  function handleScroll() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
      mobileMenu.style.bottom = "0";
    } else {
      mobileMenu.style.bottom = "-50px";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener("scroll", handleScroll);
});




document.addEventListener("DOMContentLoaded", function () {
  let eventCategoryLink = document.querySelector(".meta-category > a.event");
  if (eventCategoryLink) {
      eventCategoryLink.setAttribute("href", "/notice-event/event/");
  }
});