import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VsIcon from './../VsIcon.vue';
import { iconSvgs } from './../icons';

describe('vs-icon', () => {
    describe('icon', () => {
        it('지정된 icon svg를 삽입할 수 있다', () => {
            // when
            const wrapper = mount(VsIcon, {
                props: {
                    icon: 'close',
                },
            });

            // then
            const html = wrapper.html().replaceAll(' ', '').replaceAll('\n', '');
            const iconSvg = iconSvgs.close.replaceAll(' ', '').replaceAll('\n', '');
            expect(html).toContain(iconSvg);
        });
    });

    describe('size', () => {
        it('size를 숫자로만 입력하면 px단위로 size style을 적용한다', () => {
            // when
            const wrapper = mount(VsIcon, {
                props: {
                    icon: 'close',
                    size: 20,
                },
            });

            // then
            expect(wrapper.html()).toContain('style="width: 20px; height: 20px;"');
        });

        it('지정된 size(rem)로 아이콘을 표시할 수 있다', () => {
            // when
            const wrapper = mount(VsIcon, {
                props: {
                    icon: 'close',
                    size: '2rem',
                },
            });

            // then
            expect(wrapper.html()).toContain('style="width: 2rem; height: 2rem;"');
        });

        it('size를 전달하지 않으면 width, height를 별도로 지정하지 않는다', () => {
            // when
            const wrapper = mount(VsIcon, {
                props: {
                    icon: 'close',
                },
            });

            // then
            expect(wrapper.html()).not.toContain('width');
            expect(wrapper.html()).not.toContain('height');
        });
    });
});
