import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useIndexSelector } from './../index-selector-composable';

describe('index-selector-composable', () => {
    const list = ref(['a', 'b', 'c', 'd', 'e']);

    describe('selectIndex', () => {
        it('원하는 index를 선택할 수 있다', () => {
            // given
            const { selectedIndex, selectIndex } = useIndexSelector(list);

            // when
            selectIndex(3);

            // then
            expect(selectedIndex.value).toBe(3);
        });

        it('list의 length를 넘어가는 index는 -1로 보정된다', () => {
            // given
            const { selectedIndex, selectIndex } = useIndexSelector(list);

            // when
            selectIndex(5);

            // then
            expect(selectedIndex.value).toBe(-1);
        });

        it('-1보다 작은 index는 -1로 보정된다', () => {
            // given
            const { selectedIndex, selectIndex } = useIndexSelector(list);

            // when
            selectIndex(-8);

            // then
            expect(selectedIndex.value).toBe(-1);
        });

        it('모든 list item이 disabled 상태이면 선택 했을 때 -1로 보정한다', () => {
            // given
            const disabled = ref([0, 1, 2, 3, 4]);
            const { selectedIndex, selectIndex } = useIndexSelector(list, disabled);

            // when
            selectIndex(2);

            // then
            expect(selectedIndex.value).toBe(-1);
        });
    });

    describe('findNextActivedIndex', () => {
        it('targetIndex가 선택 가능하면 targetIndex를 그대로 반환한다', () => {
            // given
            const { findNextActivedIndex } = useIndexSelector(list);

            // then
            expect(findNextActivedIndex(2)).toBe(2);
        });

        it('targetIndex가 disabled이면 그 다음 선택 가능한 index를 반환한다', () => {
            // given
            const disabled = ref([1, 2]);
            const { findNextActivedIndex } = useIndexSelector(list, disabled);

            // when

            // then
            expect(findNextActivedIndex(1)).toBe(3);
        });

        it('targetIndex 이후에 선택 가능한 index가 없으면 -1을 반환한다', () => {
            // given
            const disabled = ref([3, 4]);
            const { findNextActivedIndex } = useIndexSelector(list, disabled);

            // then
            expect(findNextActivedIndex(3)).toBe(-1);
        });

        it('targetIndex가 list의 마지막 index보다 크면 -1을 반환한다', () => {
            // given
            const { findNextActivedIndex } = useIndexSelector(list);

            // then
            expect(findNextActivedIndex(5)).toBe(-1);
        });

        it('targetIndex가 -1보다 작으면 -1을 반환한다', () => {
            // given
            const { findNextActivedIndex } = useIndexSelector(list);

            // then
            expect(findNextActivedIndex(-2)).toBe(-1);
        });
    });

    describe('findPreviousActivedIndex', () => {
        it('targetIndex가 선택 가능하면 targetIndex를 그대로 반환한다', () => {
            // given
            const { findPreviousActivedIndex } = useIndexSelector(list);

            // then
            expect(findPreviousActivedIndex(2)).toBe(2);
        });

        it('targetIndex가 disabled이면 그 이전 선택 가능한 index를 반환한다', () => {
            // given
            const disabled = ref([1, 2]);
            const { findPreviousActivedIndex } = useIndexSelector(list, disabled);

            // when

            // then
            expect(findPreviousActivedIndex(2)).toBe(0);
        });

        it('targetIndex 이전에 선택 가능한 index가 없으면 -1을 반환한다', () => {
            // given
            const disabled = ref([0, 1]);
            const { findPreviousActivedIndex } = useIndexSelector(list, disabled);

            // then
            expect(findPreviousActivedIndex(1)).toBe(-1);
        });

        it('targetIndex가 list의 마지막 index보다 크면 -1을 반환한다', () => {
            // given
            const disabled = ref([0, 1, 2, 3, 4]); // 모든 index가 disabled인 경우
            const { findPreviousActivedIndex } = useIndexSelector(list, disabled);

            // then
            expect(findPreviousActivedIndex(5)).toBe(-1);
        });

        it('targetIndex가 -1보다 작으면 -1을 반환한다', () => {
            // given
            const { findPreviousActivedIndex } = useIndexSelector(list);

            // then
            expect(findPreviousActivedIndex(-2)).toBe(-1);
        });
    });

    describe('getInitialIndex', () => {
        it('initial index가 -1이면 -1을 반환한다', () => {
            // given
            const { getInitialIndex } = useIndexSelector(list);

            // then
            expect(getInitialIndex(-1)).toBe(-1);
        });

        it('initial index가 선택 가능하면 그대로 반환한다', () => {
            // given
            const { getInitialIndex } = useIndexSelector(list);

            // then
            expect(getInitialIndex(2)).toBe(2);
        });

        it('initial index가 disabled이면 다음 선택 가능한 index를 반환한다', () => {
            // given
            const disabled = ref([1, 2]);
            const { getInitialIndex } = useIndexSelector(list, disabled);

            // then
            expect(getInitialIndex(1)).toBe(3);
        });
    });

    it('isSelected', () => {
        // given
        const { isSelected, selectIndex } = useIndexSelector(list);
        selectIndex(3);

        // then
        expect(isSelected(3)).toBe(true);
        expect(isSelected(1)).toBe(false);
    });

    it('isDisabled', () => {
        // given
        const disabled = ref([0, 4]);
        const { isDisabled } = useIndexSelector(list, disabled);

        // then
        expect(isDisabled(0)).toBe(true);
        expect(isDisabled(1)).toBe(false);
    });

    it('isPrevious', () => {
        // given
        const { isPrevious, selectIndex } = useIndexSelector(list);
        selectIndex(2);

        // then
        expect(isPrevious(1)).toBe(true);
        expect(isPrevious(2)).toBe(false);
    });

    describe('isLeftEdge', () => {
        it('selectedIndex가 0이면 왼쪽 끝이다', () => {
            // given
            const { isLeftEdge, selectIndex } = useIndexSelector(list);
            selectIndex(0);

            // then
            expect(isLeftEdge.value).toBe(true);
        });

        it('selectedIndex가 왼쪽 끝인지 알 수 있다', () => {
            // given
            const disabled = ref([0, 1, 2]);
            const { isLeftEdge, selectIndex } = useIndexSelector(list, disabled);
            selectIndex(3);

            // then
            expect(isLeftEdge.value).toBe(true);
        });

        it('selectedIndex가 왼쪽 끝이 아닌지 알 수 있다', () => {
            // given
            const disabled = ref([0, 1, 2]);
            const { isLeftEdge, selectIndex } = useIndexSelector(list, disabled);
            selectIndex(4);

            // then
            expect(isLeftEdge.value).toBe(false);
        });

        it('selectedIndex가 -1이면 true를 반환한다', () => {
            // given
            const { isLeftEdge, selectIndex } = useIndexSelector(list);
            selectIndex(-1);

            // then
            expect(isLeftEdge.value).toBe(true);
        });
    });

    describe('isRightEdge', () => {
        it('selectedIndex가 list의 마지막 index면 오른쪽 끝이다', () => {
            // given
            const { isRightEdge, selectIndex } = useIndexSelector(list);
            selectIndex(4);

            // then
            expect(isRightEdge.value).toBe(true);
        });

        it('selectedIndex가 오른쪽 끝인지 알 수 있다', () => {
            // given
            const disabled = ref([3, 4]);
            const { isRightEdge, selectIndex } = useIndexSelector(list, disabled);
            selectIndex(2);

            // then
            expect(isRightEdge.value).toBe(true);
        });

        it('selectedIndex가 오른쪽 끝이 아닌지 알 수 있다', () => {
            // given
            const disabled = ref([3, 4]);
            const { isRightEdge, selectIndex } = useIndexSelector(list, disabled);
            selectIndex(1);

            // then
            expect(isRightEdge.value).toBe(false);
        });

        it('selectedIndex가 -1이면 true를 반환한다', () => {
            // given
            const { isRightEdge, selectIndex } = useIndexSelector(list);
            selectIndex(-1);

            // then
            expect(isRightEdge.value).toBe(true);
        });
    });

    describe('handleKeydown', () => {
        it('ArrowLeft 키를 누르면 이전 활성화된 index로 이동한다', () => {
            // given
            const { handleKeydown, selectIndex } = useIndexSelector(list);
            selectIndex(2);

            // when
            const event = { code: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('ArrowRight 키를 누르면 다음 활성화된 index로 이동한다', () => {
            // given
            const { handleKeydown, selectIndex } = useIndexSelector(list);
            selectIndex(2);

            // when
            const event = { code: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('Home 키를 누르면 첫 번째 활성화된 index로 이동한다', () => {
            // given
            const { handleKeydown, selectIndex } = useIndexSelector(list);
            selectIndex(2);

            // when
            const event = { code: 'Home', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('End 키를 누르면 마지막 활성화된 index로 이동한다', () => {
            // given
            const { handleKeydown, selectIndex } = useIndexSelector(list);
            selectIndex(2);

            // when
            const event = { code: 'End', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('왼쪽 끝에서 ArrowLeft 키를 누르면 아무 동작도 하지 않는다', () => {
            // given
            const { handleKeydown, selectIndex } = useIndexSelector(list);
            selectIndex(0);

            // when
            const event = { code: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('오른쪽 끝에서 ArrowRight 키를 누르면 아무 동작도 하지 않는다', () => {
            // given
            const { handleKeydown, selectIndex } = useIndexSelector(list);
            selectIndex(4);

            // when
            const event = { code: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('disabled된 index가 있을 때 Home 키를 누르면 첫 번째 활성화된 index로 이동한다', () => {
            // given
            const disabled = ref([0, 1]);
            const { handleKeydown, selectIndex } = useIndexSelector(list, disabled);
            selectIndex(3);

            // when
            const event = { code: 'Home', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('disabled된 index가 있을 때 End 키를 누르면 마지막 활성화된 index로 이동한다', () => {
            // given
            const disabled = ref([3, 4]);
            const { handleKeydown, selectIndex } = useIndexSelector(list, disabled);
            selectIndex(1);

            // when
            const event = { code: 'End', preventDefault: vi.fn() } as unknown as KeyboardEvent;
            handleKeydown(event);

            // then
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });
});
