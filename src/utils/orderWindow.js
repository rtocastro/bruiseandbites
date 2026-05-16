export function getOrderWindowStatus() {
  const now = new Date();
  const hour = now.getHours();

  // TEMP WINDOW:
  // Open from 4:20 AM to 8 AM
  const isOpen = hour >= 420 || hour < 8;

  return {
    isOpen,
    message: isOpen
      ? "Orders are open. PB is ready for brews and bites."
      : "Orders are closed right now. PB is napping.",
    nextWindow: "Orders open in the morning at 4:20 AM.",
  };
}