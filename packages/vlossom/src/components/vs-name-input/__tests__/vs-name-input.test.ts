import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import VsNameInput, { NameInputValue, StateMessage, UIState } from '../VsNameInput.vue';
import { nextTick } from 'vue';

function shallowMountComponent() {
    return shallowMount(VsNameInput);
}

describe('Name Input', () => {
    describe('v-model로 수정하고 싶은 값을 two-way binding 할 수 있다', () => {
        // TODO: init event test (not change event)
        it('modelValue의 초깃값을 설정할 수 있다', () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hello', lastName: 'World' });
            expect((wrapper.find('.first-name').element as HTMLInputElement).value).toBe('Hello');
            expect((wrapper.find('.last-name').element as HTMLInputElement).value).toBe('World');
            expect(wrapper.vm.changed).toBe(false);
        });

        it('modelValue를 업데이트 할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
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
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: 'Hi', lastName: 'Vlossom' });
            expect((wrapper.find('.first-name').element as HTMLInputElement).value).toBe('Hi');
            expect((wrapper.find('.last-name').element as HTMLInputElement).value).toBe('Vlossom');
        });

        it('값이 변경되면 change 이벤트가 발생한다', async () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });

            // then
            expect(wrapper.emitted()).toHaveProperty('change');
            expect(wrapper.emitted().change).toHaveLength(1);
            expect(wrapper.emitted().change[0]).toEqual([{ firstName: 'Hi', lastName: 'Vlossom' }]);
            expect(wrapper.vm.changed).toBe(true);
        });

        it('null 값이 할당된 경우 기본 값으로 할당한다', async () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
                props: {
                    // @ts-expect-error: null 값이 할당되는 경우를 테스트하기 위해 null을 할당한다
                    modelValue: null,
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // then
            nextTick(() => {
                expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: '' });
            });
        });

        it('v-model:firstName으로 firstName을 수정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: '' },
                    firstName: 'Hello',
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

        it('v-model:lastName으로 lastName을 수정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
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
    });

    describe('v-model binding이 없이도 수정 가능하다', () => {
        it('v-model binding은 없고, v-model:firstName만 binding만 있을 경우도 수정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof shallowMountComponent> = shallowMount(VsNameInput, {
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
    });

    describe('label', () => {
        it('label을 설정할 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
                props: {
                    label: 'Name Input',
                },
            });

            // then
            const label = wrapper.find('.label');
            expect(label.exists()).toBe(true);
            expect(label.isVisible()).toBe(true);
        });

        it('label을 설정하지 않아도 label 영역이 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput);

            // then
            const label = wrapper.find('.label');
            expect(label.exists()).toBe(true);
            expect(label.isVisible()).toBe(false);
            expect(label.text()).toBe('');
        });

        it('noLabel props를 설정하면 label 영역이 없다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
                props: {
                    noLabel: true,
                },
            });

            // then
            expect(wrapper.find('.label').exists()).toBe(false);
        });
    });

    describe('placeholder', () => {
        it('placeholder를 설정하지 않아도 placeholder 영역이 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput);

            // then
            expect(wrapper.find('.first-name').attributes('placeholder')).toBe('first name');
            expect(wrapper.find('.last-name').attributes('placeholder')).toBe('last name');
        });

        it('placeholder를 설정할 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
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

    describe('width / grid 설정', () => {
        let container: HTMLDivElement;
        let wrapper: any;
        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            wrapper.unmount();
            container.remove();
        });

        it('width를 string value로 직접 설정할 수 있다', () => {
            // given
            wrapper = shallowMount(VsNameInput, {
                props: {
                    width: '300px',
                },
            });

            // then
            // expect(wrapper.attributes('style')).toHaveProperty('width', '300px');
            expect(wrapper.attributes('style')).toBe('width: 300px;');
        });

        describe('container가 lg일 때', () => {
            beforeEach(() => {
                container.setAttribute('style', 'width: 1200px;');
            });

            it('width를 설정 할 수 있다', () => {
                // given
                wrapper = shallowMount(VsNameInput, {
                    attachTo: container,
                    props: {
                        width: { lg: '150px', md: '200px', sm: '250px' },
                    },
                });

                // then
                expect(wrapper.attributes('style')).toHaveProperty('width', '150px');
            });

            it('grid를 설정할 수 있다', () => {
                // given
                wrapper = shallowMount(VsNameInput, {
                    attachTo: container,
                    props: {
                        grid: { lg: 3, md: 4, sm: 6 },
                    },
                });

                // then
                expect(wrapper.attributes('style')).toHaveProperty('width', '25%');
            });
        });

        describe('container가 sm일 때', () => {
            beforeEach(() => {
                container.setAttribute('style', 'width: 800px;');
            });

            it('width를 설정 할 수 있다', () => {
                // given
                wrapper = shallowMount(VsNameInput, {
                    attachTo: container,
                    props: {
                        width: { lg: '150px', md: '200px', sm: '250px' },
                    },
                });

                // then
                expect(wrapper.attributes('style')).toHaveProperty('width', '250px');
            });

            it('grid를 설정할 수 있다', () => {
                // given
                wrapper = shallowMount(VsNameInput, {
                    attachTo: container,
                    props: {
                        grid: { lg: 3, md: 4, sm: 6 },
                    },
                });

                // then
                expect(wrapper.attributes('style')).toHaveProperty('width', '50%');
            });
        });
    });

    describe('messages', () => {
        it('messages를 StateMessage[] 형태로 전달할 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
                props: {
                    messages: [
                        { state: UIState.INFO, message: 'info message' },
                        { state: UIState.SUCCESS, message: 'success message' },
                        { state: UIState.WARN, message: 'warning message' },
                    ],
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
        });

        it('messages를 함수로 전달할 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
                props: {
                    messages: [
                        () => ({ state: UIState.INFO, message: 'info message' }),
                        () => ({ state: UIState.SUCCESS, message: 'success message' }),
                        () => ({ state: UIState.WARN, message: 'warning message' }),
                    ],
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
        });

        it('messages를 PromiseLike를 반환하는 함수로도 전달할 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
                props: {
                    messages: [
                        () => Promise.resolve({ state: UIState.INFO, message: 'info message' }),
                        () => Promise.resolve({ state: UIState.SUCCESS, message: 'success message' }),
                        () => Promise.resolve({ state: UIState.WARN, message: 'warning message' }),
                    ],
                },
            });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(3);
        });
    });

    describe('rules & validate', () => {
        let wrapper: any;
        const firstNameRequiredCheck = ({ firstName }: NameInputValue) => (firstName ? '' : 'firstName is required');
        const lastNameRequiredCheck = ({ lastName }: NameInputValue) => (lastName ? '' : 'lastName is required');
        const namePromiseCheck = (_: NameInputValue) => {
            console.log(_);
            return Promise.resolve('Name Promise Check');
        };

        beforeEach(() => {
            wrapper = shallowMount(VsNameInput, {
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
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('설정된 값이 유효하면 message가 없다', async () => {
            // when
            await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });

            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.computedMessages).toHaveLength(0);
        });

        it('설정된 값이 유효하지 않으면 message가 있다', async () => {
            // when
            await wrapper.setProps({ modelValue: { firstName: 'hey', lastName: 'why' } });
            await wrapper.setProps({ modelValue: { firstName: '', lastName: '' } });

            // then
            expect(wrapper.vm.changed).toBe(true);
            expect(wrapper.vm.computedMessages).toHaveLength(2);
        });

        it('PromiseLike의 rule도 체크할 수 있다', async () => {
            // given
            // when
            await wrapper.setProps({ rules: [namePromiseCheck] });

            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.computedMessages).toHaveLength(1);
        });

        it('validate 함수를 호출하면 변경이 없어도 message가 노출된다', () => {
            // when
            wrapper.vm.validate();

            // then
            expect(wrapper.vm.changed).toBe(false);
            expect(wrapper.vm.computedMessages).toHaveLength(2);
        });

        it('기존 message가 있으면 rule 체크 결과를 danger 타입으로 추가한다', async () => {
            // given
            const infoMsg: StateMessage = { state: UIState.INFO, message: 'info message' };
            wrapper.setProps({ messages: [infoMsg] });
            // when
            await wrapper.setProps({ modelValue: { firstName: '', lastName: 'test' } });

            // then
            expect(wrapper.vm.computedMessages).toHaveLength(2);
            expect(wrapper.vm.computedMessages[0]).toEqual(infoMsg);
            expect(wrapper.vm.computedMessages[1].state).toBe(UIState.DANGER);
            expect(wrapper.vm.computedMessages[1].message).toBe('firstName is required');
        });
    });

    describe('focus / blur', () => {
        it('focus 함수를 호출해서 focus 시킬 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput);

            // when
            wrapper.vm.focus();

            // then
            expect(wrapper.vm.focused).toBe(true);
            expect(wrapper.find('.first-name').element).toBe(document.activeElement);
        });

        it('blur 함수를 호출해서 blur 시킬 수 있다', async () => {
            // given
            const wrapper = shallowMount(VsNameInput);
            wrapper.vm.focus();
            await nextTick();

            // when
            wrapper.vm.blur();

            // then
            expect(wrapper.vm.focused).toBe(false);
            expect(wrapper.find('.first-name').element).not.toBe(document.activeElement);
        });

        it('firstName input에서 tab을 입력하면  lastName input으로 focus가 바뀐다', async () => {
            // given
            const wrapper = shallowMount(VsNameInput);
            wrapper.vm.focus();
            await nextTick();

            // when
            await wrapper.find('.first-name').trigger('keydown.tab');

            // then
            expect(wrapper.vm.focused).toBe(true);
            expect(wrapper.find('.last-name').element).toBe(document.activeElement);
        });

        it('lastName input에서 shift + tab을 입력하면 firstName input으로 focus가 바뀐다', async () => {
            // given
            const wrapper = shallowMount(VsNameInput);
            wrapper.vm.focus();
            await nextTick();

            // when
            await wrapper.find('.last-name').trigger('keydown.tab', { shiftKey: true });

            // then
            expect(wrapper.vm.focused).toBe(true);
            expect(wrapper.find('.first-name').element).toBe(document.activeElement);
        });

        it('lastName input에서 tab을 입력하면 focus가 사라진다', async () => {
            // given
            const wrapper = shallowMount(VsNameInput);
            wrapper.vm.focus();
            await nextTick();
            await wrapper.find('.last-name').trigger('keydown.tab');

            // when
            await wrapper.find('.last-name').trigger('keydown.tab');

            // then
            expect(wrapper.vm.focused).toBe(false);
            expect(wrapper.find('.last-name').element).not.toBe(document.activeElement);
        });
    });

    describe('clear', () => {
        it('clear 함수를 호출하면 value를 비울 수 있다', () => {
            // given
            const wrapper = shallowMount(VsNameInput, {
                props: {
                    modelValue: { firstName: 'Hello', lastName: 'World' },
                    'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
                },
            });

            // when
            wrapper.vm.clear();

            // then
            expect(wrapper.props('modelValue')).toEqual({ firstName: '', lastName: '' });
        });
    });
});
