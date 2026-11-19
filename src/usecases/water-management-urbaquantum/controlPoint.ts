import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getGeoPropertyProp, getNumericProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

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
    inflow: {
        ...getNumericProp({ title: 'Inflow' }, 'MTQ'),
    },
    waterLevel: {
        ...getNumericProp({ title: 'Water level' }, 'MTR'),
    },
    source: {
        ...getEnumProp({ title: 'Source of the control point', enum: ['sensor', 'lab', 'citizen'] }),
    },
    ph: {
        ...getNumericProp({ title: 'pH value of the control point', minimum: 0, maximum: 14 }),
    },
    temperature: {
        ...getNumericProp({ title: 'Temperature of the control point', minimum: -20, maximum: 100 }),
    },
    conductivity: {
        ...getNumericProp({ title: 'Conductivity of the control point', minimum: 0, maximum: 1000 }),
    },
    dissolvedOxygen: {
        ...getNumericProp({ title: 'Dissolved oxygen of the control point', minimum: 0, maximum: 1000 }),
    },
    turbidity: {
        ...getNumericProp({ title: 'Turbidity of the control point', minimum: 0, maximum: 1000 }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'ControlPoint',
            title: 'Control point',
            required: ['name', 'location', 'source'],
            description: 'Digital twin of a control point',
            minimum: 0,
        },
    },
};
