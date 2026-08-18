const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const progressTrack = document.createElement("div");
progressTrack.className = "reading-progress";
progressTrack.setAttribute("role", "progressbar");
progressTrack.setAttribute("aria-label", "页面阅读进度");
progressTrack.setAttribute("aria-valuemin", "0");
progressTrack.setAttribute("aria-valuemax", "100");
progressTrack.setAttribute("aria-valuenow", "0");
progressTrack.innerHTML = '<span class="reading-progress__bar"></span>';
document.body.prepend(progressTrack);

const progressBar = progressTrack.firstElementChild;
let progressFrame = 0;

function updateReadingProgress() {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = documentHeight > 0
    ? Math.min(1, Math.max(0, window.scrollY / documentHeight))
    : 1;

  progressBar.style.transform = `scaleX(${progress})`;
  progressTrack.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  progressFrame = 0;
}

function requestProgressUpdate() {
  if (!progressFrame) {
    progressFrame = window.requestAnimationFrame(updateReadingProgress);
  }
}

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate);
updateReadingProgress();

const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.setAttribute("tabindex", "-1");
      window.setTimeout(() => target.focus({ preventScroll: true }), 400);
    }
  });
}
