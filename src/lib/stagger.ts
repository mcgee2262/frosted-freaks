import type { CSSProperties } from 'react'

/** Stagger index for .reveal entrances. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties
