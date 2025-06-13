export function getFileSizeFormat(number: number): string {
    if (number < 1e3) {
        return `${number} bytes`;
    }
    if (number >= 1e3 && number < 1e6) {
        return `${(number / 1e3).toFixed(1)} KB`;
    }
    if (number >= 1e6 && number < 1e9) {
        return `${(number / 1e6).toFixed(1)} MB`;
    }
    return `${(number / 1e9).toFixed(1)} GB`;
}
