import { describe } from 'vitest';

describe.skip('input composable', () => {
    describe('inputValue (modelValue)', () => {});

    describe('messages', () => {});

    describe('rules & validate', () => {
        // let wrapper: ReturnType<typeof mountComponent>;
        // const namePromiseCheck = () => {
        //     return Promise.resolve('Name Promise Check');
        // };
        // beforeEach(() => {
        //     wrapper = mount(VsNameInput, {
        //         props: {
        //             props: {
        //                 modelValue: { firstName: '', lastName: '' },
        //                 'onUpdate:modelValue': (v: NameInputValue) => wrapper.setProps({ modelValue: v }),
        //             },
        //         },
        //     });
        // });
        // afterEach(() => {
        //     wrapper.unmount();
        // });
        // it('rule이 설정되었어도 값의 변경이 없다면 message가 없다', () => {
        //     // then
        //     expect(wrapper.vm.changed).toBe(false);
        //     expect(wrapper.vm.showRuleMessages).toBe(false);
        //     expect(wrapper.vm.computedMessages).toHaveLength(0);
        // });
        // it('설정된 값이 유효하면 message가 없다', async () => {
        //     // when
        //     await wrapper.setProps({ modelValue: { firstName: 'Hi', lastName: 'Vlossom' } });
        //     // then
        //     expect(wrapper.vm.changed).toBe(true);
        //     expect(wrapper.vm.showRuleMessages).toBe(true);
        //     expect(wrapper.vm.computedMessages).toHaveLength(0);
        // });
        // it('설정된 값이 유효하지 않으면 message가 있다', async () => {
        //     // when
        //     await wrapper.setProps({ modelValue: { firstName: 'hey', lastName: 'why' } });
        //     await wrapper.setProps({ modelValue: { firstName: '', lastName: '' } });
        //     // then
        //     expect(wrapper.vm.changed).toBe(true);
        //     expect(wrapper.vm.showRuleMessages).toBe(true);
        //     expect(wrapper.vm.computedMessages).toHaveLength(2);
        // });
        // // TODO: nextTick 개수 확인
        // it('PromiseLike의 rule도 체크할 수 있다', async () => {
        //     // given
        //     // when
        //     await wrapper.setProps({ rules: [namePromiseCheck] });
        //     await wrapper.setProps({ modelValue: { firstName: 'hey', lastName: 'why' } });
        //     await nextTick();
        //     // then
        //     expect(wrapper.vm.changed).toBe(true);
        //     expect(wrapper.vm.showRuleMessages).toBe(true);
        //     expect(wrapper.vm.computedMessages).toHaveLength(1);
        // });
        // it('validate 함수를 호출하면 변경이 없어도 message가 노출된다', () => {
        //     // when
        //     const result = wrapper.vm.validate();
        //     // then
        //     expect(result).toBe(false);
        //     expect(wrapper.vm.changed).toBe(false);
        //     expect(wrapper.vm.showRuleMessages).toBe(true);
        //     expect(wrapper.vm.computedMessages).toHaveLength(2);
        // });
        // it('기존 message가 있으면 rule 체크 결과를 danger 타입으로 추가한다', async () => {
        //     // given
        //     const infoMsg: StateMessage = { state: UIState.INFO, message: 'info message' };
        //     wrapper.setProps({ messages: [infoMsg] });
        //     // when
        //     await wrapper.setProps({ modelValue: { firstName: '', lastName: 'test' } });
        //     // then
        //     expect(wrapper.vm.showRuleMessages).toBe(true);
        //     expect(wrapper.vm.computedMessages).toHaveLength(2);
        //     expect(wrapper.vm.computedMessages[0]).toEqual(infoMsg);
        //     expect(wrapper.vm.computedMessages[1].state).toBe(UIState.DANGER);
        //     expect(wrapper.vm.computedMessages[1].message).toBe('firstName is required');
        // });
    });
});
