import { StellioTemplate } from 'src/interfaces';
import { getMultiRelationshipProp } from '../../utils/blueprintHelpers';

const soilManagmentCategories = [
    'Crop Rotation',
    'Reduced Tillage',
    'Cover Cropping',
    'Organic Mulching',
    'Green Manuring',
    'Nutrient Management',
    'Biochar Application',
];

const weedManagementCategories = [
    'Crop Rotation',
    'Cover Crops',
    'Reduced Tillage',
    'Mechanical Weeding',
    'Chemical Control',
    'Biological Control',
    'Natural Herbicides',
    'Mulching',
    'Precision Agriculture Techniques',
];

const irrigationManagmentCategories = [
    'Drip Irrigation',
    'Sprinkler Irrigation',
    'Surface Irrigation',
    'Subsurface Irrigation',
];

const fertilizersCategories = [
    'Organic Fertilizers',
    'Inorganic Fertilizers',
    'Slow-Release Fertilizers',
    'Liquid Fertilizers',
    'Green Manures',
];
const farmingSystemsCategories = ['Organic Farming', 'Conventional Farming', 'Integrated Farming'];

export const AgronomicPracticesTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:agronomicPractices:Template`,
    type: 'Template',
    name: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', title: 'Name' },
        },
    },
    farmingSystems: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', enum: farmingSystemsCategories, title: 'Farming Systems' },
        },
    },
    hasOperation: {
        ...getMultiRelationshipProp({
            formLabel: 'What operation were donne in this area ?',
            formLabelPerItem: 'Select a operation',
            listOfAllowedRelationships: ['urn:ngsi-ld:Operation:Template'],
            minimum: 1,
        }),
    },
    weedManagement: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', enum: weedManagementCategories, title: 'Weed Management Strategy' },
        },
    },
    soilManagement: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', enum: soilManagmentCategories, title: 'Soil Management Technique' },
        },
    },
    irrigationMethods: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', enum: irrigationManagmentCategories, title: 'Irrigation Methods' },
        },
    },
    fertilizerType: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', enum: fertilizersCategories, title: 'Fertilizer Type' },
        },
    },
    fertilizerQuantity: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'integer', title: 'Fertilizer Quantity' },
        },
    },
    rowSpacing: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'number', title: 'Row Spacing in cm' },
        },
    },
    irrigation: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'number', title: 'Irrigation in L' },
        },
    },
    tillagePractices: {
        type: 'Property',
        value: 'Placeholder',
        jsonSchema: {
            type: 'Property',
            value: { schemaType: 'string', title: 'Tillage Practices' },
        },
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'AgronomicPractices',
            title: 'Agronomic Practices',
            minimum: 0,
            required: ['name'],
            description: `This represents a Agronomic Practices`,
        },
    },
};
