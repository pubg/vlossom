import { afterEach, beforeEach, vi } from 'vitest';
import { config } from '@vue/test-utils';
import { VsStore } from '@/store';
import * as exports from '@/store';
import { createVlossom } from '@/index';

beforeEach(() => {
    const fakeStore = new VsStore();
    vi.spyOn(exports, 'store', 'get').mockReturnValue(fakeStore);

    const vlossom = createVlossom();
    config.global.plugins = [vlossom];
});
afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});

const matchMediaMock = vi.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}));

vi.stubGlobal('matchMedia', matchMediaMock);

const resizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', resizeObserverMock);
