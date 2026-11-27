import { SiteTemplate } from './site';
import { BuildingTemplate } from './building';
import { StoreyTemplate } from './storey';
import { SpaceTemplate } from './space';
import { UsageTemplate } from './usage';
import { DeliveryPointTemplate } from './deliveryPoint';
import { WeatherInformationTemplate } from './weatherInformation';
import { EnergyActionTemplate } from './energyAction';
import { EnergyTargetTemplate } from './energyTarget';

import { generateBlueprintFile } from '../../utils';

const blueprint = [
    SiteTemplate,
    BuildingTemplate,
    StoreyTemplate,
    SpaceTemplate,
    UsageTemplate,
    DeliveryPointTemplate,
    WeatherInformationTemplate,
    EnergyActionTemplate,
    EnergyTargetTemplate,
];

const usecasePathName = __dirname.split(/dist[\\/]/)[1];

generateBlueprintFile(blueprint, usecasePathName);
