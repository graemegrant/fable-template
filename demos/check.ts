/**
 * Type check only (never imported): every demo must export what the files
 * it replaces export, with the same shapes, or `tsc` fails here. Add a line
 * for each new demo (see demos/README.md).
 */
import type * as TemplateData from '../lib/data';
import type { HotelConfig } from '../hotel.config';
import * as coastalData from './coastal/data';
import { hotelConfig as coastalConfig } from './coastal/hotel.config';

export const demoData: Record<string, typeof TemplateData> = { coastal: coastalData };
export const demoConfigs: Record<string, HotelConfig> = { coastal: coastalConfig };
