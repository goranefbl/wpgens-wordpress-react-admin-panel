export function emptyStringToNull(value, originalValue) {
    if (typeof originalValue === 'string' && originalValue === '') {
        return null;
    }
    return value;
}
