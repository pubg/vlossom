import { Component } from 'vue';
import { utils } from '@/utils';
import { UIState } from '@/declaration';
import type { VsToastInfo, VsToastOptions } from '@/components/vs-toast/types';

export function getToastInfo(
    content: string | Component,
    state: Exclude<UIState, 'selected'>,
    options: VsToastOptions = {},
): VsToastInfo {
    let stateColor = options.colorScheme;
    let primary = false;
    switch (state) {
        case 'success':
            stateColor = 'green';
            primary = true;
            break;
        case 'info':
            stateColor = 'light-blue';
            primary = true;
            break;
        case 'error':
            stateColor = 'red';
            primary = true;
            break;
        case 'warning':
            stateColor = 'yellow';
            primary = true;
            break;
        default:
            break;
    }

    return {
        id: utils.string.createID(),
        content,
        container: 'body',
        colorScheme: stateColor,
        autoClose: true,
        primary,
        ...options,
        placement: options.placement || 'top',
        align: options.align || 'center',
        ...(options.timeout && { autoClose: true }),
    };
}
