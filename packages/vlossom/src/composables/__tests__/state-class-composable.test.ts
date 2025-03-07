import { describe, expect, it } from 'vitest';
import { useStateClass } from '@/composables';
import { ref } from 'vue';
import { UIState } from '@/declaration';

describe('state-class-composable', () => {
    describe('stateClasses class', () => {
        it('stated', () => {
            // given
            const stated: UIState[] = ['info', 'success', 'error', 'warning'];

            // when
            const classes = stated.map((state) => useStateClass(ref(state)).stateClasses.value);

            // then
            expect(classes).toEqual([
                { 'vs-state-box': true, 'vs-state-box-info': true },
                { 'vs-state-box': true, 'vs-state-box-success': true },
                { 'vs-state-box': true, 'vs-state-box-error': true },
                { 'vs-state-box': true, 'vs-state-box-warning': true },
            ]);
        });

        it('not stated', () => {
            // given
            const notStated: UIState[] = ['idle', 'selected'];

            // when
            const classes = notStated.map((state) => useStateClass(ref(state)).stateClasses.value);

            // then
            expect(classes).toEqual([
                { 'vs-state-box': false, 'vs-state-box-idle': false },
                { 'vs-state-box': false, 'vs-state-box-selected': false },
            ]);
        });
    });
});
