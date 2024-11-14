import { describe, expect, it } from 'vitest';
import { getInputProps } from './../input-model';

describe('getInputProps', () => {
    it('input component에 필요한 props들을 가져올 수 있다', () => {
        // when
        const props = getInputProps();

        // then
        expect(props).toMatchSnapshot();
    });

    it('input props 중 제외할 props를 정할 수 있다', () => {
        // when
        const props = getInputProps('label', 'messages');

        // then
        expect(props).toMatchSnapshot();
        expect(props).not.toHaveProperty('label');
        expect(props).not.toHaveProperty('messages');
    });
});
