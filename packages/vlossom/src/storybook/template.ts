import { COLORS, UIState } from '@/declaration';

export const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aenean commodo ligula eget dolor. Aenean massa.
Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`;

export function getStateTemplate(templateStr: string) {
    const states = [UIState.Info, UIState.Success, UIState.Warning, UIState.Error];
    return states.map((state) => templateStr.replace(/{{\s*state\s*}}/g, state)).join('\n');
}

export function getColorSchemeTemplate(templateStr: string) {
    return COLORS.map((color) => templateStr.replace(/{{\s*color\s*}}/g, color)).join('\n');
}
