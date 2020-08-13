const storage = localStorage;

export function getItem(key: string) {
  return storage.getItem(key);
}

export function setItem(key: string, value: any) {
  return storage.setItem(key, value);
}

export function removeItem(key: string) {
  return storage.removeItem(key);
}