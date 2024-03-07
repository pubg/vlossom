import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsCheckNode from './../VsCheckNode.vue';

function mountComponent() {
    return mount(VsCheckNode);
}

describe('vs-check-node', () => {
    describe('checkbox type', () => {
        it('checkbox icon이 표시된다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                props: {
                    id: 'test',
                    colorScheme: 'default',
                    styleSet: {},
                    type: 'checkbox',
                    checked: false,
                },
            });

            // then
            expect(wrapper.vm.icon).toBe('check');
        });

        it('checked 속성을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                props: {
                    id: 'test',
                    colorScheme: 'default',
                    styleSet: {},
                    type: 'checkbox',
                    checked: false,
                },
            });

            // when
            await wrapper.setProps({ checked: true });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
        });

        describe('events', () => {
            it('toggle 이벤트를 발생시킬 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                    props: {
                        id: 'test',
                        colorScheme: 'default',
                        styleSet: {},
                        type: 'checkbox',
                        checked: true,
                    },
                });

                // when
                await wrapper.find('input').trigger('change');

                // then
                expect(wrapper.emitted('change')).toHaveLength(1);
                expect(wrapper.emitted('toggle')).toHaveLength(1);
                expect(wrapper.emitted('toggle')).toEqual([[true]]);
            });

            it('focus 이벤트를 발생시킬 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                    props: {
                        id: 'test',
                        colorScheme: 'default',
                        styleSet: {},
                        type: 'checkbox',
                        checked: false,
                    },
                });

                // when
                await wrapper.find('input').trigger('focus');

                // then
                expect(wrapper.emitted('focus')).toHaveLength(1);
            });

            it('blur 이벤트를 발생시킬 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                    props: {
                        id: 'test',
                        colorScheme: 'default',
                        styleSet: {},
                        type: 'checkbox',
                        checked: false,
                    },
                });

                // when
                await wrapper.find('input').trigger('blur');

                // then
                expect(wrapper.emitted('blur')).toHaveLength(1);
            });
        });
    });

    describe('radio type', () => {
        it('checkbox icon이 표시된다', () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                props: {
                    id: 'test',
                    colorScheme: 'default',
                    styleSet: {},
                    type: 'radio',
                    checked: false,
                },
            });

            // then
            expect(wrapper.vm.icon).toBe('radioUnchecked');
        });

        it('checked 속성을 설정할 수 있다', async () => {
            // given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                props: {
                    id: 'test',
                    colorScheme: 'default',
                    styleSet: {},
                    type: 'radio',
                    checked: false,
                },
            });

            // when
            await wrapper.setProps({ checked: true });

            // then
            expect(wrapper.find('input').element.checked).toBe(true);
        });

        describe('events', () => {
            it('toggle 이벤트를 발생시킬 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                    props: {
                        id: 'test',
                        colorScheme: 'default',
                        styleSet: {},
                        type: 'radio',
                        checked: true,
                    },
                });

                // when
                await wrapper.find('input').trigger('change');

                // then
                expect(wrapper.emitted('change')).toHaveLength(1);
                expect(wrapper.emitted('toggle')).toHaveLength(1);
                expect(wrapper.emitted('toggle')).toEqual([[true]]);
            });

            it('focus 이벤트를 발생시킬 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                    props: {
                        id: 'test',
                        colorScheme: 'default',
                        styleSet: {},
                        type: 'radio',
                        checked: false,
                    },
                });

                // when
                await wrapper.find('input').trigger('focus');

                // then
                expect(wrapper.emitted('focus')).toHaveLength(1);
            });

            it('blur 이벤트를 발생시킬 수 있다', async () => {
                // given
                const wrapper: ReturnType<typeof mountComponent> = mount(VsCheckNode, {
                    props: {
                        id: 'test',
                        colorScheme: 'default',
                        styleSet: {},
                        type: 'radio',
                        checked: false,
                    },
                });

                // when
                await wrapper.find('input').trigger('blur');

                // then
                expect(wrapper.emitted('blur')).toHaveLength(1);
            });
        });
    });
});
