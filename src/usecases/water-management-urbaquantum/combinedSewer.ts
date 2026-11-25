import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getMultiRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'CombinedSewer';

export const CombinedSewerTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Name of the combined sewer' }),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: 'Geographical representation of the combined sewer',
            geometryType: 'LineString',
        }),
    },
    dischargesTo: {
        ...getMultiRelationshipProp({
            formLabel: 'List of rivers that receive flows from the combined sewer',
            formLabelPerItem: 'Select a river',
            listOfAllowedRelationships: ['urn:ngsi-ld:River:Template'],
        }),
    },
    refControlPoint: {
        ...getMultiRelationshipProp({
            formLabel: 'List of control points',
            formLabelPerItem: 'Select a control point',
            listOfAllowedRelationships: ['urn:ngsi-ld:ControlPoint:Template'],
        }),
    },
    refSamplingPoint: {
        ...getMultiRelationshipProp({
            formLabel: 'List of sampling points',
            formLabelPerItem: 'Select a sampling point',
            listOfAllowedRelationships: ['urn:ngsi-ld:SamplingPoint:Template'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'CombinedSewer',
            title: 'Combined sewer',
            required: ['name', 'location'],
            description: 'Digital twin of a combined sewer',
            minimum: 0,
        },
    },
};
