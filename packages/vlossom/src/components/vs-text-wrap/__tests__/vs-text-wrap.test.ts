import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VsTextWrap from './../VsTextWrap.vue';

function mountComponent() {
    return mount(VsTextWrap);
}

describe('vs-text-wrap', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    describe('default', () => {
        it('text-wrap에 hover하면 tooltip이 노출되며 tooltip contents에 마우스를 올렸을 때 유지된다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: 'This is text wrap',
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(100); // default enter delay (100ms)
            window.document.body.querySelector('.tooltip')?.dispatchEvent(new Event('mouseenter'));

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).not.toBeNull();
            expect(window.document.body.innerHTML).toContain('This is text wrap');
        });
    });

    describe('copy', () => {
        let clipboardContents = '';

        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn((text) => {
                    clipboardContents = text;
                }),
                readText: vi.fn(() => clipboardContents),
            },
        });

        it('copy:true일 때, copy button을 click하면 clipboard에 innerText가 복사되며 copied 이벤트가 발생한다.', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: `
                        <div>
                            <p>lorem ipsum dolor sit amet <i><b>consectetuer</b></i> adipiscing elit. </p>
                        </div>
                    `,
                },
                props: {
                    copy: true,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.copy-button').trigger('click');

            //then
            const clipboardText = navigator.clipboard.readText();
            expect(clipboardText).toBe('lorem ipsum dolor sit amet consectetuer adipiscing elit. ');
            const emittedText = wrapper.emitted('copied')?.[0]?.[0];
            expect(emittedText).toBe('lorem ipsum dolor sit amet consectetuer adipiscing elit. ');
        });

        afterEach(() => {
            clipboardContents = '';
        });
    });

    describe('link', () => {
        const mockedOpen = vi.fn();
        const originalOpen = window.open;
        window.open = mockedOpen;

        it('link props에 URL을 넣으면, link button을 click 했을 때 새 창이 열린다.', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: 'link',
                },
                props: {
                    link: 'https://google.com',
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.link-button').trigger('click');

            //then
            expect(mockedOpen).toBeCalled();
        });

        afterEach(() => {
            window.open = originalOpen;
        });
    });

    describe('noTooltip', () => {
        it('noTooltip:true일 때는 text에 hover 해도 tooltip이 노출되지 않는다.', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: 'This is text wrap',
                },
                props: {
                    noTooltip: true,
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(100); // default enter delay (100ms)
            window.document.body.querySelector('.tooltip')?.dispatchEvent(new Event('mouseenter'));

            //then
            expect(window.document.body.querySelector('.tooltip-contents')).toBeNull();
        });
    });

    describe('width', () => {
        it('props를 통해 width를 설정할 수 있다.', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: 'This is text wrap',
                },
                props: {
                    width: '100px',
                },
                attachTo: document.body,
            });

            //then
            expect(wrapper.find('.vs-text-wrap-contents').attributes('style')).toContain('width: 100px;');
        });
    });

    describe('placement', () => {
        it('placement을 설정하면 해당 위치에 tooltip이 붙는다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: 'This is text wrap',
                },
                props: {
                    placement: 'bottom',
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(150); // wait for setPosition end (50ms) + default enter delay (100ms)

            //then
            expect(window.document.body.querySelector('.tooltip')?.classList).toContain('placement-bottom');
        });
    });

    describe('align', () => {
        it('align을 설정하면 이에 맞게 tooltip이 정렬된다', async () => {
            //given
            const wrapper: ReturnType<typeof mountComponent> = mount(VsTextWrap, {
                slots: {
                    default: 'Hover Here!',
                    tooltip: 'Tooltip',
                },
                props: {
                    align: 'end',
                },
                attachTo: document.body,
            });

            //when
            await wrapper.find('.tooltip-trigger').trigger('mouseenter');
            await vi.advanceTimersByTimeAsync(100); // default enter delay (100ms)

            //then
            expect(window.document.body.querySelector('.tooltip')?.classList).toContain('align-end');
        });
    });
});
