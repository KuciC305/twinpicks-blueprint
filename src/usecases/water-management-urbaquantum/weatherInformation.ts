import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'WeatherInformation';

export const WeatherInformationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la station', friendlyAttributeName: 'Nom' }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Position de la station', geometryType: 'Point' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Station météo',
            required: ['name'],
            minimum: 0,
            description: 'Regroupe les informations météorologiques, pluviomètriques, etc.',
        },
    },
};
