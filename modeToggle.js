export function initModeToggle() {
  const body = document.querySelector("body");
  const toggleButton = document.querySelector(".btn-toggle");

  let isDarkMode = localStorage.getItem("dark") === "true";

  function setMode(isDark) {
    if (isDark) {
      body.dataset.colorMode = "dark";
      toggleButton.textContent = "Light";
    } else {
      body.dataset.colorMode = "light";
      toggleButton.textContent = "Dark";
    }

    isDarkMode = isDark;
    localStorage.setItem("dark", isDark);
  }

  setMode(isDarkMode);

  toggleButton.addEventListener("click", () => {
    setMode(!isDarkMode);
  });
}
