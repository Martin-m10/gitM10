document.getElementById("enterBtn").addEventListener("click", function (e) {
  e.preventDefault();

  let leftImg = document.querySelector(".corner-img.left");
  let rightImg = document.querySelector(".corner-img.right");

  leftImg.classList.add("hide-left");
  rightImg.classList.add("hide-right");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});