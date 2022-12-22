export const createSequelizeErrorMes = (e: Error) => {
  const message = e.message;
  const detail =
    'original' in e && typeof e.original === 'object' && !!e.original && 'detail' in e.original
      ? '. Detail: ' + e.original.detail
      : '';

  return message + detail;
};
