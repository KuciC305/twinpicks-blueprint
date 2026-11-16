import { StellioTemplate } from 'src/interfaces';

import { getNumericProp, getEnumProp, getMultiRelationshipProp } from '../../utils/blueprintHelpers';

export const ToolRequirementsTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:ToolRequirements:Template`,
    type: 'Template',
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'ToolRequirements',
            title: 'ToolRequirements',
            minimum: 0,
            required: ['hasCrops', 'WeedPresure', 'SoilTypes', 'SoilTextures', 'maxBbch', 'minBbch'],
            description: `This represents a Crop`,
        },
    },
    hasCrops: {
        ...getMultiRelationshipProp({
            formLabel: 'What crops can the operation be performed on?',
            formLabelPerItem: 'Select a crop',
            targetTemplateObjectId: 'urn:ngsi-ld:Crop:Template',
            minimum: 1,
        }),
    },
    weedPresure: {
        ...getEnumProp({
            title: 'optimal weed pressure to do the operation',
            enum: ['Low', 'Medium', 'High'],
        }),
    },
    soilTypes: {
        ...getEnumProp({
            title: 'optimal soil type to do the operation',
            enum: ['light soils', 'medium soils', 'heavy soils', 'high stone content', 'low stone content'],
        }),
    },
    soilTextures: {
        ...getEnumProp({
            title: 'optimal soil type to do the operation',
            enum: [
                'coarse sand',
                'fine sand',
                'loamy sand',
                'sandy loam',
                'light sandy clay loam',
                'loam',
                'sandy clay loam',
                'clay loam',
                'clay',
                'self-mulching clay',
            ],
        }),
    },

    maxBbch: {
        ...getNumericProp({
            title: 'max BBCH stage the the operation can be done at',
            minimum: 0,
            maximum: 100,
        }),
    },
    minBbch: {
        ...getNumericProp({
            title: 'minimal BBCH stage the the operation can be done at',
            minimum: 0,
            maximum: 100,
        }),
    },
};
