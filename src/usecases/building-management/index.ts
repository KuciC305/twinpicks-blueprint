import { SiteTemplate } from './site';
import { BuildingTemplate } from './building';
import { StoreyTemplate } from './storey';
import { SpaceTemplate } from './space';
import { UsageTemplate } from './usage';
import { DeliveryPointTemplate } from './deliveryPoint';
import { ElectricalCabinetTemplate } from './electricalCabinet';
import { ConnectivityNodeTemplate } from './connectivityNode';

import { generateBlueprintFile } from '../../utils';

const blueprint = [
    SiteTemplate,
    BuildingTemplate,
    StoreyTemplate,
    SpaceTemplate,
    UsageTemplate,
    DeliveryPointTemplate,
    ElectricalCabinetTemplate,
    ConnectivityNodeTemplate,
];

const usecasePathName = __dirname.split(/dist[\\/]/)[1];

generateBlueprintFile(blueprint, usecasePathName);
