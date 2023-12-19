import type { VsButtonStyleSet } from '@/components';
import type { StyleSet } from '@/declaration/types';

import { beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { VsComponent } from '@/declaration/types';
import { useCustomStyle } from '../custom-style-composable';
import { store } from '@/store';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

const styleSet: StyleSet = {
    VsButton: { myStyleSet: vsButton },
};

describe('useCustomStyle composable', () => {
    beforeEach(() => {
        store.registerStyleSet(styleSet);
    });

    it('parse styleSet object and return custom properties successfully', () => {
        const myStyleSet = { backgroundColor: '#a5d6ad', fontSize: '2rem' };
        const { customProperties } = useCustomStyle<VsButtonStyleSet>(VsComponent.VsButton, ref(myStyleSet));

        expect(customProperties.value).toEqual({
            '--vs-button-backgroundColor': '#a5d6ad',
            '--vs-button-fontSize': '2rem',
        });
    });

    it('find pre-defined styleSet and return custom properties successfully', () => {
        const { customProperties } = useCustomStyle<VsButtonStyleSet>(VsComponent.VsButton, ref('myStyleSet'));

        expect(customProperties.value).toEqual({
            '--vs-button-backgroundColor': '#1e88e5',
            '--vs-button-color': 'white',
        });
    });
});
