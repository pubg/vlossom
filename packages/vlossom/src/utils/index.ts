export function pascalToKebab(str: string) {
    return str
        .split(/(?=[A-Z])/)
        .map((s) => s.toLowerCase())
        .join('-');
}
