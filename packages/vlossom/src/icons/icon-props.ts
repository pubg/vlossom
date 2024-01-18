export function getIconProps() {
    return {
        size: {
            type: [Number, String],
            default: 24,
            validator: (value: number | string) => {
                const size = Number(value);
                return !isNaN(size) && size > 0;
            },
        },
    };
}
