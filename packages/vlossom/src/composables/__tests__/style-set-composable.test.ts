import { beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { VsComponent } from '@/declaration';
import { useStyleSet } from '../style-set-composable';
import { store } from '@/stores';

import type { VsButtonStyleSet } from '@/components';
import type { StyleSet } from '@/declaration';

const vsButton: VsButtonStyleSet = {
    backgroundColor: '#1e88e5',
    color: 'white',
};

const styleSet: StyleSet = {
    VsButton: { myStyleSet: vsButton },
};

describe('useStyleSet composable', () => {
    beforeEach(() => {
        store.option.registerStyleSet(styleSet);
    });

    it('parse styleSet object and return custom properties successfully', () => {
        const myStyleSet = { backgroundColor: '#a5d6ad', fontSize: '2rem' };
        const { computedStyleSet } = useStyleSet<VsButtonStyleSet>(VsComponent.VsButton, ref(myStyleSet));

        expect(computedStyleSet.value).toEqual({
            '--vs-button-backgroundColor': '#a5d6ad',
            '--vs-button-fontSize': '2rem',
        });
    });

    it('find pre-defined styleSet and return custom properties successfully', () => {
        const { computedStyleSet } = useStyleSet<VsButtonStyleSet>(VsComponent.VsButton, ref('myStyleSet'));

        expect(computedStyleSet.value).toEqual({
            '--vs-button-backgroundColor': '#1e88e5',
            '--vs-button-color': 'white',
        });
    });
});
