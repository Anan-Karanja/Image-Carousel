const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
let firstImgWidth = firstImg.clientWidth + 14; // getting first image width andd adding 15 margin value
let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width

const showHideIcons = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // fi clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that need to add or reduce from carousel left to take middle img centre
  let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) { 
    //   if user is scrolling right
    return (carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
    }
    // if user is scrolling left
    carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updating global variables value on mouse down
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left acording to mmouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// regex
// const reg = /^[a-zA-Z]{3,8}[0-9]{1,3}@[a-zA-Z]{2,5}\.[a-zA-Z]{2,3}$/
// let test = "hello12@gmail.com";
// let results = reg.test(test);
// console.log(results);
