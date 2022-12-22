export function arrOnlyUnique<T>(arr: T[]) {
  function onlyUnique(value: T, index: number, self: T[]) {
    return self.indexOf(value) === index;
  }

  return arr.filter(onlyUnique);
}
