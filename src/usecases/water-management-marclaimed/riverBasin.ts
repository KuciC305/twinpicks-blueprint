import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'RiverBasin';

export const RiverBasinTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Name of the river basin' }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Location of the river basin', geometryType: 'Polygon' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'River basin',
            required: ['name'],
            description: 'Digital twin of a river basin',
            minimum: 0,
        },
    },
};
