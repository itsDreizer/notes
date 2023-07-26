export default function validateEmail(email) {
  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexp.test(email);
}
