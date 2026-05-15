export function getOrderWindowStatus() {
  const now = new Date();
  const hour = now.getHours();

  // TEMP WINDOW:
  // Open from 11 PM to 6 AM
  const isOpen = hour >= 22 || hour < 6;

  return {
    isOpen,
    message: isOpen
      ? "Orders are open. PB is ready for brews and bites."
      : "Orders are closed right now. PB is napping.",
    nextWindow: "Orders open tonight at 11 PM.",
  };
}