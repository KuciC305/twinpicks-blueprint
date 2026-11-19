import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'ControlPoint';

export const ControlPointTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Name of the control point' }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Location of the control point', geometryType: 'Point' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Control point',
            required: ['name', 'location'],
            description: 'Digital twin of a control point',
            minimum: 0,
        },
    },
};
