export function initModeToggle(element, toggleButton) {
  let isDarkMode = localStorage.getItem("dark") === "true";

  function setMode(isDark) {
    if (isDark) {
      element.dataset.colorMode = "dark";
      toggleButton.textContent = "Light";
    } else {
      element.dataset.colorMode = "light";
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
