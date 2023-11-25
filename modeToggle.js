export function initModeToggle(element, toggleButton) {
  // Retrieve dark mode preference from local storage
  let isDarkMode = localStorage.getItem("dark") === "true";

  function setMode(isDark) {
    // Set dataset attribute and button text based on color mode
    element.dataset.colorMode = isDark ? "dark" : "light";
    toggleButton.textContent = isDark ? "Light" : "Dark";

    isDarkMode = isDark;

    localStorage.setItem("dark", isDark);
  }

  setMode(isDarkMode);

  toggleButton.addEventListener("click", () => {
    setMode(!isDarkMode);
  });
}
