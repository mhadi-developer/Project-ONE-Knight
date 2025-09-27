window.addEventListener("load", () => {
  const progressBar = document.querySelector(".progress-bar");
  const progressContainer = document.querySelector(".progress-container");
  const logoText = document.getElementById("logo-text");
  const preloader = document.getElementById("preloader");

  // make progress container match text width
  progressContainer.style.width = logoText.offsetWidth + "px";

  // animate progress bar to full width
  progressBar.style.width = "100%";

  // fade out preloader after 3s (when bar completes)
  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 3000);
});
