export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export function scrollToElementWithOffset(elementId, offset) {
  const targetElement = document.getElementById(elementId);
  console.log("Target element:", targetElement);
  if (targetElement) {
    const targetElementTop = targetElement.getBoundingClientRect().top + window.scrollY;
    console.log("Target element top:", targetElementTop);
    const scrollPosition = targetElementTop - offset;
    console.log("Scroll position:", scrollPosition);
    window.scrollTo({ top: scrollPosition, left: 0, behavior: "smooth" });
  }
};