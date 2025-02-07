export function shuffleArray<T>(arr: T[]): T[] {
    const n = arr.length;
    for (let i = 0; i < n; i ++) {
      const rand = Math.floor(Math.random() * (n - i)) + i;
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
}
  