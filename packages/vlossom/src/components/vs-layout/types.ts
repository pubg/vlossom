import type { CssPosition, Placement } from '@/declaration';

export interface LayoutAttrs {
    header?: { position: CssPosition; height: string };
    footer?: { position: CssPosition; height: string };
    drawer?: { placement: Placement; size: string };
}
