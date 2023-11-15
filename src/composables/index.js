export function useFormatMoney(value, locale) {
  if (!value) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'KWD',
    trailingZeroDisplay: 'stripIfInteger'
  }).format(value);
}

export function useFormatDate(
  value,
  locale,
  options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
) {
  if (!value) return '';
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}
