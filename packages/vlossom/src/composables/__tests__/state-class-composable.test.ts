import { describe, expect, it } from 'vitest';
import { UIState } from '@/declaration';
import { useStateClass } from '@/composables';
import { ref } from 'vue';

describe('state-class-composable', () => {
    it('boxGlowByState class', () => {
        // given
        const states = [UIState.Idle, UIState.Info, UIState.Success, UIState.Warning, UIState.Error];

        // when
        const classes = states.map((state) => useStateClass(ref(state)).boxGlowByState.value);

        // then
        expect(classes).toEqual([
            'vs-box-glow-idle',
            'vs-box-glow-info',
            'vs-box-glow-success',
            'vs-box-glow-warning',
            'vs-box-glow-error',
        ]);
    });

    it('textGlowByState class', () => {
        // given
        const states = [UIState.Idle, UIState.Info, UIState.Success, UIState.Warning, UIState.Error];

        // when
        const classes = states.map((state) => useStateClass(ref(state)).textGlowByState.value);

        // then
        expect(classes).toEqual([
            'vs-text-glow-idle',
            'vs-text-glow-info',
            'vs-text-glow-success',
            'vs-text-glow-warning',
            'vs-text-glow-error',
        ]);
    });
});
