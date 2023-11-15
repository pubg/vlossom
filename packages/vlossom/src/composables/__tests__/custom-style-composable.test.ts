import type { VsButtonStyleSet } from '@/components';
import type { StyleSet } from '@/declaration/types';

import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import { registerStyleSet, clearStyleSet, useCustomStyle } from '../custom-style-composable';
import { ref } from 'vue';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

export const styleSet: StyleSet = {
    vsButton: { myStyleSet: vsButton },
};

describe('useCustomStyle composable', () => {
    beforeAll(() => {
        registerStyleSet(styleSet);
    });

    afterAll(() => {
        clearStyleSet();
    });

    it('parse styleSet object and return custom properties successfully', () => {
        const { customProperties } = useCustomStyle<VsButtonStyleSet>(
            ref({ backgroundColor: '#a5d6ad', fontSize: '2rem' }),
            'button',
        );

        expect(customProperties.value).toEqual({
            '--vs-button-backgroundColor': '#a5d6ad',
            '--vs-button-fontSize': '2rem',
        });
    });

    it('find pre-defined styleSet and return custom properties successfully', () => {
        const { customProperties } = useCustomStyle<VsButtonStyleSet>(ref('myStyleSet'), 'button');

        expect(customProperties.value).toEqual({
            '--vs-button-backgroundColor': '#1e88e5',
            '--vs-button-color': 'red',
        });
    });
});
