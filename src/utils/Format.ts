export default function AddressFormat(address: string) {
  const match = address.match(/^[^\s]+\s[^\s]+/);
  const result = match ? match[0] : "";
  return result;
}
