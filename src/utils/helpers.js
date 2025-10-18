export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function extractNameFromEmail(email) {
  if (!email || typeof email !== 'string') return { firstName: '', lastName: '' };

  const localPart = email.split('@')[0]; // part before the @

  const parts = localPart
    .replace(/[._-]+/g, ' ')  // replace ., _, - with spaces
    .trim()
    .split(/\s+/)             // split by spaces
    .filter(p => /^[A-Za-z]+$/.test(p)); // keep only pure alphabetic words

  const firstName = parts[0] ? capitalizeFirst(parts[0]) : '';
  const lastName = parts.length > 1 ? capitalizeFirst(parts[parts.length - 1]) : '';

  return { firstName, lastName };
}