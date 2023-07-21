import { gsap } from "gsap";
const tl = gsap.timeline({ paused: true });

function revealMenu() {
  revealMenuItems();
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-menu");

  toggleBtn.onclick = function (e) {
    tl.reversed(!tl.reversed());
  };
  closeBtn.onclick = function (e) {
    tl.reversed(!tl.reversed());
  };
}

revealMenu();

function revealMenuItems() {
  tl.to(".menu-container", 0.01, {
    height: "210px",
  });

  tl.to(".col-1", 1, {
    left: "--200px",
    ease: "power4.inOut",
  });

  tl.to(
    ".col-2",
    0.025,
    {
      left: "0px",
      ease: "power4.inOut",
    },
    "<"
  );
  tl.to(
    ".col-2 > .menu-item",
    1,
    {
      left: 0,
      ease: "power4.inOut",
      stagger: {
        amount: 0.25,
      },
    },
    "<"
  ).reverse();
}

gsap.to(".marquee", {
  x: "-25%",
  duration: 10,
  ease: "none",
  repeat: -1,
  yoyo: true,
});

document.addEventListener("DOMContentLoaded", function () {
  let menuContainer = document.querySelector(".menu-container");
  let marqueeContainer = document.querySelector(".marquee-container");
  let isiInsiteMenuContainer = false;

  menuContainer.addEventListener("mouseenter", function () {
    isiInsiteMenuContainer = true;
    marqueeContainer.style.display = "block";
  });

  menuContainer.addEventListener("mousemove", function (event) {
    if (isiInsiteMenuContainer) {
      marqueeContainer.style.display = "block";
      let pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
      let pageYOffset = window.pageYOffset || document.documentElement.scrollTop;

      let cursorX = event.clientX + pageXOffset;
      let cursorY = event.clientY + pageYOffset;

      let containerX = cursorX - marqueeContainer.offsetWidth / 2;
      let containerY = cursorY - marqueeContainer.offsetHeight / 2;

      gsap.to(marqueeContainer, {
        scale: 1,
        left: containerX + 25,
        top: containerY,
        duration: 1,
        ease: "power3.out",
      });
    }
  });

  menuContainer.addEventListener("mouseleave", function () {
    isiInsiteMenuContainer = false;
    gsap.to(marqueeContainer, {
      scale: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: function () {
        marqueeContainer.style.display = "none";
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let marqueeText = document.querySelector(".marquee");
  menuContainer.addEventListener("mouseenter", function () {
    isiInsiteMenuContainer = false;
  });
  menuContainer.addEventListener("mousemove", function (event) {
    if (isiInsiteMenuContainer) {
      let hoveredMenuItem = event.target.closet(".menu-item");
      let hoveredText = hoveredMenuItem.textContent.trim() || "home";
      let marqueeContent = (hoveredText + " ").repeat(12);
      marqueeText.innerHTML = marqueeContent.replace(/\s/g, "nbsp;");
    }
  });
  menuContainer.addEventListener("mouseleave,", function () {
    isiInsiteMenuContainer = false;
    let marqueeContent = ("home" + " ").repeat(12);
    marqueeText.innerHTML = marqueeContent.replace(/\s/g, "nbsp;");
  });
});
