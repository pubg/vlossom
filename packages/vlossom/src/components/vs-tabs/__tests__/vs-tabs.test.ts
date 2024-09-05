import { afterEach, beforeEach, describe, expect, it, MockInstance, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTabs from './../VsTabs.vue';

describe('vs-tabs', () => {
    const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];

    const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
    let scrollIntoViewMock: MockInstance | null = null;
    let originalInnerWidth: number = 0;

    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn().mockImplementation(() => {});
        scrollIntoViewMock = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
        originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
        window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
        window.innerWidth = originalInnerWidth;
    });

    describe('tabs', () => {
        it('tabs를 설정한 만큼 tab이 생성된다', () => {
            // given
            const wrapper = mount(VsTabs, {
                props: { tabs },
            });

            // when
            const tabItems = wrapper.findAll('.vs-tab-item');

            // then
            expect(tabItems).toHaveLength(tabs.length);
        });

        it('disabled에 설정한 탭은 disabled 되어 있다', () => {
            // given
            const disabled = [0, 2];
            const wrapper = mount(VsTabs, {
                props: { tabs, disabled },
            });

            // when
            const tabItems = wrapper.findAll('.vs-tab-item');

            // then
            expect(tabItems.filter((t) => t.classes().includes('vs-disabled'))).toHaveLength(disabled.length);
        });
    });

    describe('tab select', () => {
        it('초기 index는 0이다', () => {
            // given
            const wrapper = mount(VsTabs, {
                props: { tabs },
            });

            // then
            expect(wrapper.vm.selectedIndex).toEqual(0);
        });

        it('tab을 click하면 선택된 index가 바뀐다', async () => {
            // given
            const wrapper = mount(VsTabs, {
                props: {
                    tabs,
                    modelValue: 0,
                    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                },
            });

            // when
            const tabItems = wrapper.findAll('.vs-tab-item');
            await tabItems[2].trigger('click');

            // then
            expect(wrapper.vm.selectedIndex).toEqual(2);
            expect(wrapper.vm.modelValue).toEqual(2);
        });

        describe('tab index with modelValue', () => {
            it('modelValue로 원하는 index로 변경할 수 있다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                await wrapper.setProps({ modelValue: 3 });
                expect(wrapper.vm.selectedIndex).toEqual(3);
            });

            it('modelValue가 -1보다 작으면 index가 -1로 보정된다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: -5 });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });

            it('modelValue가 tabs length보다 크면 index가 -1로 보정된다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 10 });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });
        });

        describe('첫번째 탭이 disabled 상태이면 선택 가능한 첫번째 탭으로 index를 보정한다', () => {
            it('초기 상태에 index 0이 disabled이면 그 다음 선택 가능한 다음 tab으로 index가 보정된다', () => {
                // given
                const disabled = [0, 1];
                const wrapper = mount(VsTabs, {
                    props: { tabs, disabled },
                });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
            });

            it('modelValue가 disabled tab에 지정되면 index가 -1로 보정된다', async () => {
                // given
                const disabled = [3];
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled,
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.setProps({ modelValue: 3 });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });

            it('선택 가능한 tab이 하나도 없으면 index를 -1로 보정한다', async () => {
                // given
                const disabled = [0, 1, 2, 3, 4];
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled,
                    },
                });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(-1);
            });
        });

        describe('tabs 변경됐을 때', () => {
            it('첫번쨰 탭으로 index를 보정한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: { tabs },
                });

                // when
                await wrapper.setProps({ tabs: ['tab6', 'tab7', 'tab8'] });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(0);
            });

            it('첫번째 탭이 disabled 상태이면 선택 가능한 첫번째 탭으로 index를 보정한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: { tabs },
                });

                // when
                await wrapper.setProps({ tabs: ['tab6', 'tab7', 'tab8'], disabled: [0, 1] });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
            });
        });
    });

    describe('scroll buttons', () => {
        describe('left button click', () => {
            it('왼쪽 tab으로 index가 이동하면서 스크롤이 이동한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const leftButton = wrapper.find('.vs-scroll-left-button');
                await leftButton.trigger('click');

                // then
                expect(wrapper.vm.selectedIndex).toEqual(1);
                expect(wrapper.vm.modelValue).toEqual(1);
                expect(scrollIntoViewMock).toHaveBeenCalled();
            });

            it('왼쪽 tab이 disabled 상태이면 선택 가능한 이전 index로 이동한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 3,
                        disabled: [1, 2],
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const leftButton = wrapper.find('.vs-scroll-left-button');
                await leftButton.trigger('click');

                // then
                expect(wrapper.vm.selectedIndex).toEqual(0);
                expect(wrapper.vm.modelValue).toEqual(0);
                expect(scrollIntoViewMock).toHaveBeenCalled();
            });

            it('index가 0일 때 left button은 disabled 상태이다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        tabButtons: 'show' as const,
                    },
                });

                // when
                const leftButton = wrapper.find('.vs-scroll-left-button');

                // then
                expect(leftButton.attributes()).toHaveProperty('disabled');
            });

            it('왼쪽으로 더 갈 수 없는 상태일 때는 버튼이 disabled 되어 있다 (with disabled)', () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        disabled: [0, 1],
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const leftButton = wrapper.find('.vs-scroll-left-button');

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(leftButton.attributes()).toHaveProperty('disabled');
            });
        });

        describe('right button click', () => {
            it('오른쪽 tab으로 index가 이동하면서 스크롤이 이동한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const rightButton = wrapper.find('.vs-scroll-right-button');
                await rightButton.trigger('click');

                // then
                expect(wrapper.vm.selectedIndex).toEqual(3);
                expect(wrapper.vm.modelValue).toEqual(3);
                expect(scrollIntoViewMock).toHaveBeenCalled();
            });

            it('오른쪽 tab이 disabled 상태이면 선택 가능한 다음 index로 이동한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 1,
                        disabled: [2, 3],
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const rightButton = wrapper.find('.vs-scroll-right-button');
                await rightButton.trigger('click');

                // then
                expect(wrapper.vm.selectedIndex).toEqual(4);
                expect(wrapper.vm.modelValue).toEqual(4);
                expect(scrollIntoViewMock).toHaveBeenCalled();
            });

            it('index가 마지막 tab일 때 right button은 disabled 상태이다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: tabs.length - 1,
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const rightButton = wrapper.find('.vs-scroll-right-button');

                // then
                expect(rightButton.attributes()).toHaveProperty('disabled');
            });

            it('오른쪽으로 더 갈 수 없는 상태일 때는 버튼이 disabled 되어 있다 (with disabled)', () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        disabled: [3, 4],
                        tabButtons: 'show' as const,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                const rightButton = wrapper.find('.vs-scroll-right-button');

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(rightButton.attributes()).toHaveProperty('disabled');
            });
        });
    });

    describe('keyboard control', () => {
        describe('left arrow 키를 눌렀을 때', () => {
            it('왼쪽 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'ArrowLeft' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(1);
                expect(wrapper.vm.modelValue).toEqual(1);
            });

            it('왼쪽에 disabled 된 tab이 있다면 이전 선택 가능한 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled: [2],
                        modelValue: 3,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'ArrowLeft' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(1);
                expect(wrapper.vm.modelValue).toEqual(1);
            });

            it('더 왼쪽으로 갈 수 없다면 index가 유지된다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled: [0, 1],
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'ArrowLeft' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });

        describe('right arrow 키를 눌렀을 때', () => {
            it('오른쪽 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'ArrowRight' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(3);
                expect(wrapper.vm.modelValue).toEqual(3);
            });

            it('오른쪽에 disabled 된 tab이 있다면 다음 선택 가능한 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled: [2],
                        modelValue: 1,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'ArrowRight' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(3);
                expect(wrapper.vm.modelValue).toEqual(3);
            });

            it('더 왼쪽으로 갈 수 없다면 index가 유지된다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled: [3, 4],
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'ArrowRight' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });

        describe('home arrow 키를 눌렀을 때', () => {
            it('맨 처음 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'Home' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(0);
                expect(wrapper.vm.modelValue).toEqual(0);
            });

            it('disabled가 있을 때 앞쪽에서 선택 가능한 맨 앞 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled: [0, 1],
                        modelValue: 4,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'Home' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });

        describe('end arrow 키를 눌렀을 때', () => {
            it('맨 마지막 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        modelValue: 2,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'End' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(4);
                expect(wrapper.vm.modelValue).toEqual(4);
            });

            it('disabled가 있을 때 뒤쪽에서 선택 가능한 맨 마지막 tab을 선택한다', async () => {
                // given
                const wrapper = mount(VsTabs, {
                    props: {
                        tabs,
                        disabled: [3, 4],
                        modelValue: 0,
                        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
                    },
                });

                // when
                await wrapper.find('.vs-tab-item.vs-selected').trigger('keydown', { code: 'End' });

                // then
                expect(wrapper.vm.selectedIndex).toEqual(2);
                expect(wrapper.vm.modelValue).toEqual(2);
            });
        });
    });
});
