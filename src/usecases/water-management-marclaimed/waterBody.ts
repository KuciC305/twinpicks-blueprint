import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'WaterBody';

export const WaterBodyTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Name of the water body' }),
    },
    belongsTo: {
        ...getRelationshipProp({
            formLabel: 'River basin the water body belongs to',
            targetTemplateObjectId: 'urn:ngsi-ld:RiverBasin:Template',
        }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Location of the water body', geometryType: 'Polygon' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Water body',
            required: ['name', 'belongsTo'],
            description: 'Digital twin of a water body',
            minimum: 0,
        },
    },
};
