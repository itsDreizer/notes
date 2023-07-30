export default function validateNickname(nickname) {
  return nickname && nickname.length < 16;
}
