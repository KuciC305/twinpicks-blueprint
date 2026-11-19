import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getGeoPropertyProp, getNumericProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'SamplingPoint';

export const SamplingPointTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Name of the sampling point' }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Location of the sampling point', geometryType: 'Point' }),
    },
    source: {
        ...getEnumProp({ title: 'Source of the sampling point', enum: ['sensor', 'lab', 'citizen'] }),
    },
    sampleVolume: {
        ...getNumericProp({ title: 'Sample volume of the sampling point' }),
    },
    usage: {
        ...getEnumProp({
            title: 'Usage of the sampling point',
            enum: ['drinking', 'agricultural', 'industrial', 'unknown', 'other'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'SamplingPoint',
            title: 'Sampling point',
            required: ['name', 'location', 'source', 'usage'],
            description: 'Digital twin of a sampling point',
            minimum: 0,
        },
    },
};
