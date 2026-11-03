/**
 * Type check only (never imported): every demo must export what the files
 * it replaces export, with the same shapes, or `tsc` fails here. Add a line
 * for each new demo (see demos/README.md).
 */
import type * as TemplateData from '../lib/data';
import type { HotelConfig } from '../hotel.config';
import * as coastalData from './coastal/data';
import { hotelConfig as coastalConfig } from './coastal/hotel.config';
import * as urbanData from './urban/data';
import { hotelConfig as urbanConfig } from './urban/hotel.config';

export const demoData: Record<string, typeof TemplateData> = { coastal: coastalData, urban: urbanData };
export const demoConfigs: Record<string, HotelConfig> = { coastal: coastalConfig, urban: urbanConfig };
