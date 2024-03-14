import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTooltip from '../VsTooltip.vue';

function mountComponent() {
    return mount(VsTooltip);
}

describe('vs-tooltip', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    describe('default', () => {
        let wrapper: ReturnType<typeof mountComponent>;

        beforeEach(() => {
            wrapper = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });
        });

        afterEach(() => {
            wrapper.unmount();
        });

        it('초기에는 trigger만 렌더되며 contents는 노출되지 않는다', () => {
            //then
            expect(wrapper.find('.tooltip-trigger').exists()).toBe(true);
            expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).not.toContain('Tooltip');
        });

        it('trigger에 마우스를 올렸을 때 contents가 노출된다', async () => {
            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).toContain('Tooltip');
        });

        it('trigger에 마우스를 올렸다가 뗐을 때 contents가 사라진다', async () => {
            //when
            wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);

            wrapper.find('.tooltip-trigger').trigger('mouseleave');
            await vi.advanceTimersByTimeAsync(200); // wait for animation end (200ms)

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).not.toContain('Tooltip');
        });
    });

    describe('placement', () => {
        it('placement을 설정하면 해당 위치에 tooltip이 붙는다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    placement: 'bottom',
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

            //then
            expect(wrapper.vm.computedPlacement).toBe('bottom');
            expect(window.document.body.querySelector('.tooltip')?.classList).toContain('placement-bottom');
        });
    });

    describe('align', () => {
        it('align을 설정하면 이에 맞게 tooltip이 정렬된다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    align: 'end',
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);

            //then
            expect(window.document.body.querySelector('.tooltip')?.classList).toContain('align-end');
        });
    });

    describe('clickable', () => {
        it('clickable:true일 때 trigger를 클릭하면 contents가 노출된다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    clickable: true,
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('click');
            await vi.advanceTimersByTimeAsync(0);

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).toContain('Tooltip');
        });
    });

    describe('contents hover', () => {
        it('contentsHover:true일 때 trigger에 hover한 후 tooltip으로 마우스를 옮기면 contents가 유지된다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    contentsHover: true,
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);
            window.document.body.querySelector('.tooltip')?.dispatchEvent(new Event('mouseenter'));

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).toContain('Tooltip');
        });
    });

    describe('enter delay', () => {
        describe('enterDelay:100ms (default)', () => {
            let wrapper: ReturnType<typeof mountComponent>;
            beforeEach(() => {
                wrapper = mount(VsTooltip, {
                    slots: {
                        default: 'Hover Here!',
                        tooltip: 'Tooltip',
                    },
                    attachTo: document.body,
                });
            });

            afterEach(() => {
                wrapper.unmount();
            });

            it('mousesenter가 100ms 지속되지 않으면 contents가 나타나지 않는다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(0);

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
                expect(window.document.body.innerHTML).not.toContain('Tooltip');
            });

            it('mousesenter가 100ms 지속되면 contents가 나타난다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(100);

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
                expect(window.document.body.innerHTML).toContain('Tooltip');
            });
        });

        describe('enterDelay:300ms', () => {
            let wrapper: ReturnType<typeof mountComponent>;
            beforeEach(() => {
                wrapper = mount(VsTooltip, {
                    slots: {
                        default: 'Hover Here!',
                        tooltip: 'Tooltip',
                    },
                    props: {
                        enterDelay: 300,
                    },
                    attachTo: document.body,
                });
            });

            afterEach(() => {
                wrapper.unmount();
            });

            it('mousesenter가 300ms 지속되지 않으면 contents가 나타나지 않는다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(0);

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
                expect(window.document.body.innerHTML).not.toContain('Tooltip');
            });

            it('mousesenter가 300ms 지속되면 contents가 나타난다.', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(300);

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
                expect(window.document.body.innerHTML).toContain('Tooltip');
            });
        });
    });

    describe('leave delay', () => {
        describe('leaveDelay:100ms (default)', () => {
            let wrapper: ReturnType<typeof mountComponent>;
            beforeEach(() => {
                wrapper = mount(VsTooltip, {
                    slots: {
                        default: 'Hover Here!',
                        tooltip: 'Tooltip',
                    },
                    props: {
                        enterDelay: 0,
                    },
                    attachTo: document.body,
                });
            });

            afterEach(() => {
                wrapper.unmount();
            });

            it('mousesenter 발생 후 mouseleave가 100ms 지속되지 않으면 contents가 사라지지 않는다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(0);

                await wrapper.find('.tooltip-trigger').trigger('mouseleave');
                await vi.advanceTimersByTimeAsync(200); // wait for animation end (200ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
                expect(window.document.body.innerHTML).toContain('Tooltip');
            });

            it('mousesenter 발생 후 mouseleave가 100ms 지속되면 contents가 사라진다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(0);

                await wrapper.find('.tooltip-trigger').trigger('mouseleave');
                await vi.advanceTimersByTimeAsync(300); // wait for animation end (200ms) + leave delay (100ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
                expect(window.document.body.innerHTML).not.toContain('Tooltip');
            });
        });

        describe('leaveDelay:300ms', () => {
            let wrapper: ReturnType<typeof mountComponent>;
            beforeEach(() => {
                wrapper = mount(VsTooltip, {
                    slots: {
                        default: 'Hover Here!',
                        tooltip: 'Tooltip',
                    },
                    props: {
                        enterDelay: 0,
                        leaveDelay: 300,
                    },
                    attachTo: document.body,
                });
            });

            afterEach(() => {
                wrapper.unmount();
            });

            it('mousesenter 발생 후 mouseleave가 300ms 지속되지 않으면 contents가 사라지지 않는다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(0);
                await wrapper.find('.tooltip-trigger').trigger('mouseleave');
                await vi.advanceTimersByTimeAsync(200); // wait for animation end (200ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
                expect(window.document.body.innerHTML).toContain('Tooltip');
            });

            it('mousesenter 발생 후 mouseleave가 300ms 지속되면 contents가 사라진다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(0);

                await wrapper.find('.tooltip-trigger').trigger('mouseleave');
                await vi.advanceTimersByTimeAsync(500); // wait for animation end (200ms) + leave delay (300ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
                expect(window.document.body.innerHTML).not.toContain('Tooltip');
            });
        });
    });

    describe('disable animation', () => {
        describe('disableAnimation:false (default)', () => {
            let wrapper: ReturnType<typeof mountComponent>;
            beforeEach(() => {
                wrapper = mount(VsTooltip, {
                    slots: {
                        default: 'Hover Here!',
                        tooltip: 'Tooltip',
                    },
                    props: {
                        enterDelay: 0,
                        leaveDelay: 0,
                    },
                    attachTo: document.body,
                });
            });

            afterEach(() => {
                wrapper.unmount();
            });

            it('trigger에 마우스를 올리면 fade in transition이 발생한다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')?.classList).toContain('fade-in-bottom');
            });

            it('trigger에 마우스를 올렸다가 떼면 fade out transition이 발생한다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

                await wrapper.find('.tooltip-trigger').trigger('mouseleave');
                await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')?.classList).toContain('fade-out-bottom');
            });
        });

        describe('disableAnimation:true', () => {
            let wrapper: ReturnType<typeof mountComponent>;
            beforeEach(() => {
                wrapper = mount(VsTooltip, {
                    slots: {
                        default: 'Hover Here!',
                        tooltip: 'Tooltip',
                    },
                    props: {
                        disableAnimation: true,
                        enterDelay: 0,
                        leaveDelay: 0,
                    },
                    attachTo: document.body,
                });
            });

            afterEach(() => {
                wrapper.unmount();
            });

            it('trigger에 마우스를 올려도 fade in transition이 발생하지 않는다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')?.classList).toBeNull;
            });

            it('trigger에 마우스를 올렸다가 떼도 fade out transition이 발생하지 않는다', async () => {
                //when
                await wrapper.find('.tooltip-trigger').trigger('mouseenter');
                await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

                await wrapper.find('.tooltip-trigger').trigger('mouseleave');
                await vi.advanceTimersByTimeAsync(50); // wait for setPosition end (50ms)

                //then
                expect(window.document.body.querySelector('.tooltip-contents')?.classList).toBeNull;
            });
        });
    });

    describe('disabled', () => {
        it('disabled:true일 때는 trigger에 마우스를 올렸을 때 contents가 노출되지 않는다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    disabled: true,
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).not.toContain('Tooltip');
        });
    });
});
