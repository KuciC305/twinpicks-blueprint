import { StellioTemplate } from 'src/interfaces';
import { getDateProp, getEnumProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Lot';

/** Public market lot (D19), e.g. L02 of 252025S0301L02/MS1. Not the supplier's own site group. */
export const LotTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    lotNumber: {
        ...getSimpleTextProp({ title: 'Numéro de lot', friendlyAttributeName: 'Lot' }),
    },
    name: {
        ...getSimpleTextProp({ title: 'Intitulé du lot', friendlyAttributeName: 'Nom' }),
    },
    startDate: {
        ...getDateProp({ title: 'Date de début' }),
    },
    endDate: {
        ...getDateProp({ title: 'Date de fin' }),
    },
    // Codes still to agree on (D10)
    renewalStatus: {
        ...getEnumProp({ title: 'Renouvellement', enum: ['notStarted', 'inProgress', 'renewed'] }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: 'Marché',
            targetTemplateObjectId: 'urn:ngsi-ld:FrameworkContract:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Lot de marché',
            required: ['name', 'lotNumber', 'isPartOf'],
            description: "Lot d'un marché, avec ses propres dates et son statut de renouvellement.",
            minimum: 0,
        },
    },
};
