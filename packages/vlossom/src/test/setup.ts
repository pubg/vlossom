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
