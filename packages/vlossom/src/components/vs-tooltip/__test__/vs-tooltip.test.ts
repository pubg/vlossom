import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTooltip from '../VsTooltip.vue';
import { nextTick } from 'vue';

function mountComponent() {
    return mount(VsTooltip);
}

describe('vs-tooltip', () => {
    describe('default', () => {
        beforeEach(() => {
            document.body.innerHTML = '';
        });
        it('초기에는 trigger만 렌더되며 contents는 노출되지 않는다.', () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
            });

            //then
            expect(wrapper.find('.tooltip-trigger').exists()).toBe(true);
            expect(wrapper.find('.tooltip-contents').exists()).toBe(false);
            expect(wrapper.html()).toContain('Hover Here!');
        });

        it('tooltip trigger에 마우스를 올렸을 때 tooltip contents가 노출된다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: '<div>Tooltip</div>',
                },
                props: {
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });
            vi.useFakeTimers();

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).toContain('Tooltip');
        });

        it('tooltip trigger에 마우스를 올렸다가 뗐을 때 tooltip contents가 사라진다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTooltip, {
                slots: {
                    default: 'Hover Here!',
                    contents: 'Tooltip',
                },
                props: {
                    enterDelay: 0,
                    leaveDelay: 0,
                },
                attachTo: document.body,
            });

            //when
            wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(0);

            wrapper.find('.tooltip-trigger').trigger('mouseleave');
            await vi.advanceTimersByTimeAsync(200); // wait for animation end

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
            expect(window.document.body.innerHTML).toContain('Hover Here!');
            expect(window.document.body.innerHTML).not.toContain('Tooltip');

        });
    });

    describe('position', () => {});

    describe('align', () => {});

    describe('clickable', () => {});

    describe('contents hover', () => {});

    describe('disabled', () => {});
});
