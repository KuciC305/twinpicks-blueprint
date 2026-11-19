import { generateBlueprintFile } from '../../utils';

import { ControlPointTemplate } from './controlPoint';
import { RiverBasinTemplate } from './riverBasin';
import { WaterBodyTemplate } from './waterBody';

const blueprint = [ControlPointTemplate, RiverBasinTemplate, WaterBodyTemplate];

const usecasePathName = __dirname.split(/dist[\\/]/)[1];

generateBlueprintFile(blueprint, usecasePathName);
