export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

export const getCurrentISOTime = (): string => {
  return new Date().toISOString();
};
