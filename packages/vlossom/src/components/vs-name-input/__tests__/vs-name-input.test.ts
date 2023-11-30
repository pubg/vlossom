import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsNameInput, { NameInputValue } from '../VsNameInput.vue';
import { nextTick } from 'vue';
import { StateMessage, UIState } from '@/declaration/types';

function mountComponent() {
    return mount(VsNameInput);
}

describe('Name Input', () => {
    describe('v-model로 수정하고 싶은 값을 two-way binding 할 수 있다', () => {
        it('modelValue의 초깃값을 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hello', lastName: 'World' });
            expect(wrapper.vm.inputValue).toEqual({ firstName: 'Hello', lastName: 'World' });
            expect(wrapper.vm.changed).toBe(false);
        });

        it('modelValue를 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await wrapper.find('.first-name').setValue('Hi');
            await wrapper.find('.last-name').setValue('Vlossom');

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hi', lastName: 'Vlossom' });
            expect(wrapper.vm.changed).toBe(true);
        });

        it('modelValue를 바꿔서 값을 반영할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();
            await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hi', lastName: 'Vlossom' });
            expect(wrapper.vm.changed).toBe(true);
        });

        it('값이 변경되면 change 이벤트가 발생한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();
            await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });

            // then
            expect(wrapper.emitted()).toHaveProperty('change');
            expect(wrapper.emitted().change).toHaveLength(1);
            expect(wrapper.emitted().change[0]).toEqual([{ firstName: 'Hi', lastName: 'Vlossom' }]);
            expect(wrapper.vm.changed).toBe(true);
        });

        it('null 값이 할당된 경우 기본 값으로 할당한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    // @ts-expect-error: null 값이 할당되는 경우를 테스트하기 위해 null을 할당한다
                    modelValue: null,
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await nextTick();

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: '' });
            expect(wrapper.vm.changed).toBe(false);
        });

        it('v-model:firstName과, v-model의 firstName에 binding된 값이 다른 경우 v-model:firstName이 우선한다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: '' },
                    firstName: 'Hi',
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                    'onUpdate:firstName': (v: string) => wrapper.setProps({ firstName: v }),
                },
            });

            await nextTick();

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hi', lastName: '' });
            expect(wrapper.props('firstName')).toBe('Hi');
        });

        it('firstName을 수정하면 v-model:firstName binding 된 값이 변경된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: '' },
                    firstName: 'Hi',
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                    'onUpdate:firstName': (v: string) => wrapper.setProps({ firstName: v }),
                },
            });

            // when
            await wrapper.find('.first-name').setValue('Hi');

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hi', lastName: '' });
            expect(wrapper.props('firstName')).toBe('Hi');
        });

        it('v-model:firstName을 수정하면 binding 된 값이 변경된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: '' },
                    firstName: 'Hello',
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                    'onUpdate:firstName': (v: string) => wrapper.setProps({ firstName: v }),
                },
            });

            // when
            await wrapper.setProps({ firstName: 'Hi' });

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hi', lastName: '' });
            expect(wrapper.props('firstName')).toBe('Hi');
        });

        it('lastName을 수정하면 v-model:lastName binding 된 값이 변경된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: '', lastName: 'World' },
                    lastName: 'World',
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                    'onUpdate:lastName': (v: string) => wrapper.setProps({ lastName: v }),
                },
            });

            // when
            await wrapper.find('.last-name').setValue('Vlossom');

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: 'Vlossom' });
            expect(wrapper.props('lastName')).toBe('Vlossom');
        });

        it('v-model:lastName을 수정하면 binding 된 값이 변경된다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: '', lastName: 'World' },
                    lastName: 'World',
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                    'onUpdate:lastName': (v: string) => wrapper.setProps({ lastName: v }),
                },
            });

            // when
            await wrapper.setProps({ lastName: 'Vlossom' });

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: 'Vlossom' });
            expect(wrapper.props('lastName')).toBe('Vlossom');
        });

        it('clear 버튼을 누르면 값이 비워진다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            wrapper.find('.clear-btn').trigger('click');
            await nextTick();

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: '' });
        });
    });

    describe('v-model binding이 없이도 수정 가능하다', () => {
        it('v-model binding은 없고, v-model:firstName, v-model:lastName binding만 있을 경우도 수정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    firstName: 'Hello',
                    lastName: 'World',
                    'onUpdate:firstName': (v: string) => wrapper.setProps({ firstName: v }),
                    'onUpdate:lastName': (v: string) => wrapper.setProps({ lastName: v }),
                },
            });

            // when
            await wrapper.find('.first-name').setValue('Hi');
            await wrapper.find('.last-name').setValue('Vlossom');

            // then
            expect(wrapper.props('firstName')).toBe('Hi');
            expect(wrapper.props('lastName')).toBe('Vlossom');
        });

        it('아무 binding된 값이 없어도 입력 후 clear 버튼을 누르면 값이 비워진다', async () => {
            // given
            const wrapper = mount(VsNameInput);
            await wrapper.find('.first-name').setValue('Hi');
            await wrapper.find('.last-name').setValue('Vlossom');

            // when
            wrapper.find('.clear-btn').trigger('click');
            await nextTick();

            // then
            expect((wrapper.find('.first-name').element as HTMLInputElement).value).toBe('');
            expect((wrapper.find('.last-name').element as HTMLInputElement).value).toBe('');
        });
    });

    describe('placeholder', () => {
        it('placeholder를 설정하지 않아도 placeholder 영역이 있다', () => {
            // given
            const wrapper = mount(VsNameInput);

            // then
            expect(wrapper.find('.first-name').attributes('placeholder')).toBe('first name');
            expect(wrapper.find('.last-name').attributes('placeholder')).toBe('last name');
        });

        it('placeholder를 설정할 수 있다', () => {
            // given
            const wrapper = mount(VsNameInput, {
                props: {
                    placeholderFirstName: 'first name placeholder',
                    placeholderLastName: 'last name placeholder',
                },
            });

            // then
            expect(wrapper.find('.first-name').attributes('placeholder')).toBe('first name placeholder');
            expect(wrapper.find('.last-name').attributes('placeholder')).toBe('last name placeholder');
        });
    });

    describe('messages', () => {
        it('messages를 StateMessage[] 형태로 전달할 수 있다', async () => {
            // given
            const wrapper = mount(VsNameInput, {
                props: {
                    messages: [
                        { state: UIState.INFO, message: 'info message' },
                        { state: UIState.SUCCESS, message: 'success message' },
                        { state: UIState.WARN, message: 'warning message' },
                    ],
                },
            });

            await nextTick();

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.INFO);
            expect(wrapper.vm.computedMessages[0].message).toBe('info message');
        });

        it('messages를 함수로 전달할 수 있다', async () => {
            // given
            const wrapper = mount(VsNameInput, {
                props: {
                    messages: [
                        () => ({ state: UIState.INFO, message: 'info message' }),
                        () => ({ state: UIState.SUCCESS, message: 'success message' }),
                        () => ({ state: UIState.WARN, message: 'warning message' }),
                    ],
                },
            });

            await nextTick();

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.INFO);
            expect(wrapper.vm.computedMessages[0].message).toBe('info message');
        });

        it('messages를 PromiseLike를 반환하는 함수로도 전달할 수 있다', async () => {
            // given
            const wrapper = mount(VsNameInput, {
                props: {
                    messages: [
                        () => Promise.resolve({ state: UIState.INFO, message: 'info message' }),
                        () => Promise.resolve({ state: UIState.SUCCESS, message: 'success message' }),
                        () => Promise.resolve({ state: UIState.WARN, message: 'warning message' }),
                    ],
                },
            });

            await nextTick();
            await nextTick();

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
            expect(wrapper.vm.computedMessages[0].state).toBe(UIState.INFO);
            expect(wrapper.vm.computedMessages[0].message).toBe('info message');
        });
    });

    describe('rules & validate', () => {
        let wrapper: ReturnType<typeof mountComponent>;
        const firstNameRequiredCheck = ({ firstName }: NameInputValue) => (firstName ? '' : 'firstName is required');
        const lastNameRequiredCheck = ({ lastName }: NameInputValue) => (lastName ? '' : 'lastName is required');
        const namePromiseCheck = () => {
            return Promise.resolve('Name Promise Check');
        };

        beforeEach(() => {
            wrapper = mount(VsNameInput, {
                props: {
                    props: {
                        modelValue: { firstName: '', lastName: '' },
                        'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                    },
                    rules: [firstNameRequiredCheck, lastNameRequiredCheck],
                },
            });
        });
        afterEach(() => {
            wrapper.unmount();
        });

        it('rule이 설정되었어도 값의 변경이 없다면 message가 없다', () => {
            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.showRuleMessages).toBe(false);
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('설정된 값이 유효하면 message가 없다', async () => {
            // when
            await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });

            // then
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('설정된 값이 유효하지 않으면 message가 있다', async () => {
            // when
            await wrapper.setProps({ modelValue: { firstName: 'hey', lastName: 'why' } });
            await wrapper.setProps({ modelValue: { firstName: '', lastName: '' } });

            // then
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(2);
        });

        // TODO: nextTick 개수 확인
        it('PromiseLike의 rule도 체크할 수 있다', async () => {
            // given
            // when
            await wrapper.setProps({ rules: [namePromiseCheck] });
            await wrapper.setProps({ modelValue: { firstName: 'hey', lastName: 'why' } });
            await nextTick();

            // then
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(1);
        });

        it('validate 함수를 호출하면 변경이 없어도 message가 노출된다', () => {
            // when
            const result = wrapper.vm.validate();

            // then
            expect(result).toBe(false);
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(2);
        });

        it('기존 message가 있으면 rule 체크 결과를 danger 타입으로 추가한다', async () => {
            // given
            const infoMsg: StateMessage = { state: UIState.INFO, message: 'info message' };
            wrapper.setProps({ messages: [infoMsg] });

            // when
            await wrapper.setProps({ modelValue: { firstName: '', lastName: 'test' } });

            // then
            expect(wrapper.vm.showRuleMessages).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(2);
            expect(wrapper.vm.computedMessages[0]).toEqual(infoMsg);
            expect(wrapper.vm.computedMessages[1].state).toBe(UIState.DANGER);
            expect(wrapper.vm.computedMessages[1].message).toBe('firstName is required');
        });
    });

    describe('focus / blur', () => {
        it('focus 함수를 호출해서 firstName input에 focus 시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsNameInput, { attachTo: document.body });

            // when
            // wrapper.vm.focus();
            await wrapper.find('.first-name').trigger('focus');

            // then
            expect(wrapper.vm.focused).toBe(true);
            expect(wrapper.vm.focusedFirstName).toBe(true);
            expect(wrapper.emitted()).toHaveProperty('focus');
            expect(wrapper.emitted().focus).toHaveLength(1);
        });

        it('blur 함수를 호출해서 blur 시킬 수 있다', async () => {
            // given
            const wrapper = mount(VsNameInput, { attachTo: document.body });
            // wrapper.vm.focus();
            await wrapper.find('.first-name').trigger('focus');
            await nextTick();

            // when
            // wrapper.vm.blur();
            await wrapper.find('.first-name').trigger('blur');

            // then
            expect(wrapper.vm.focused).toBe(false);
            expect(wrapper.vm.focusedFirstName).toBe(false);
            expect(wrapper.vm.focusedLastName).toBe(false);
            expect(wrapper.emitted()).toHaveProperty('blur');
            expect(wrapper.emitted().blur).toHaveLength(1);
        });

        it('firstName input에서 tab을 입력하면  lastName input으로 focus가 바뀐다', async () => {
            // given
            const wrapper = mount(VsNameInput, { attachTo: document.body });
            await wrapper.find('.first-name').trigger('focus');
            await nextTick();

            // when
            await wrapper.find('.first-name').trigger('keydown.tab');
            await wrapper.find('.first-name').trigger('blur'); // blur 이벤트가 발생하지 않아서 직접 발생시킨다
            await wrapper.find('.last-name').trigger('focus'); // focus 이벤트가 발생하지 않아서 직접 발생시킨다

            // then
            expect(wrapper.vm.focused).toBe(true);
            expect(wrapper.vm.focusedFirstName).toBe(false);
            expect(wrapper.vm.focusedLastName).toBe(true);
        });

        it('lastName input에서 shift + tab을 입력하면 firstName input으로 focus가 바뀐다', async () => {
            // given
            const wrapper = mount(VsNameInput, { attachTo: document.body });
            await wrapper.find('.last-name').trigger('focus');
            await nextTick();

            // when
            await wrapper.find('.last-name').trigger('keydown.tab', { shiftKey: true });
            await wrapper.find('.last-name').trigger('blur'); // blur 이벤트가 발생하지 않아서 직접 발생시킨다
            await wrapper.find('.first-name').trigger('focus'); // focus 이벤트가 발생하지 않아서 직접 발생시킨다

            // then
            expect(wrapper.vm.focused).toBe(true);
            expect(wrapper.vm.focusedFirstName).toBe(true);
            expect(wrapper.vm.focusedLastName).toBe(false);
        });

        it('lastName input에서 tab을 입력하면 focus가 사라진다', async () => {
            // given
            const wrapper = mount(VsNameInput, { attachTo: document.body });
            await wrapper.find('.last-name').trigger('focus');
            await nextTick();

            // when
            await wrapper.find('.last-name').trigger('keydown.tab');
            await wrapper.find('.last-name').trigger('blur'); // focus 이벤트가 발생하지 않아서 직접 발생시킨다

            // then
            expect(wrapper.vm.focused).toBe(false);
            expect(wrapper.vm.focusedFirstName).toBe(false);
            expect(wrapper.vm.focusedLastName).toBe(false);
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 value를 비울 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            wrapper.vm.clear();
            await nextTick();

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: '' });
        });
    });
});
