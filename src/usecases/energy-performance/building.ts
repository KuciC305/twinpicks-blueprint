import { StellioTemplate } from 'src/interfaces';
import { getNumericProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Building';

/**
 * Light version of the Building: buildings are created with full detail by the building-management
 * use case. Here a user only completes what the performance indicators need: the floor area (kWh/m²)
 * and the weather station (degree days). Same attribute names as building-management.
 */
export const BuildingTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du bâtiment', friendlyAttributeName: 'Nom' }),
    },
    floorArea: {
        ...getNumericProp({ title: 'Surface de plancher (m²)', minimum: 0 }, 'MTK'),
    },
    hasWeatherInformation: {
        ...getRelationshipProp({
            formLabel: 'Station météo (DJU)',
            targetTemplateObjectId: 'urn:ngsi-ld:WeatherInformation:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Bâtiment',
            required: ['name'],
            minimum: 0,
            description:
                'Bâtiment du patrimoine (créé dans la gestion du bâtiment). Surface et station météo servent à normaliser les consommations.',
        },
    },
};
