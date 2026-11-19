import { BuildingTemplate } from './building';
import { WeatherInformationTemplate } from './weatherInformation';
import { EnergyActionTemplate } from './energyAction';
import { EnergyTargetTemplate } from './energyTarget';

import { generateBlueprintFile } from '../../utils';

const blueprint = [BuildingTemplate, WeatherInformationTemplate, EnergyActionTemplate, EnergyTargetTemplate];

const usecasePathName = __dirname.split(/dist[\\/]/)[1];

generateBlueprintFile(blueprint, usecasePathName);
