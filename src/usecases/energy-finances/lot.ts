import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getMultiAttributeProp,
    getNumericProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

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
    // Price schedule (BPU) of the lot, one value per price group, component, time class and year (D15, proposal)
    contractedPrice: {
        ...getMultiAttributeProp({
            formLabel: 'Prix contractuels (bordereau de prix)',
            propertySchemaDefinition: getNumericProp({ schemaType: 'number', title: 'Prix HT', minimum: 0 }, 'EUR'),
            subProps: [
                ['pricingGroup', getSimpleTextProp({ title: 'Groupe de prix (ex. C4, C5-BASE)' })],
                [
                    'component',
                    getEnumProp({
                        title: 'Composante',
                        enum: ['energy', 'subscription', 'capacity', 'cee', 'guarantee-of-origin'],
                    }),
                ],
                [
                    'timeClass',
                    getEnumProp({
                        title: 'Poste horosaisonnier',
                        enum: ['BASE', 'HP', 'HC', 'HPH', 'HCH', 'HPE', 'HCE', 'PTE'],
                    }),
                ],
                ['priceUnit', getEnumProp({ title: 'Unité de prix', enum: ['MWH', 'YEAR', 'MONTH'] })],
                ['validFrom', getDateProp({ title: 'Valable du' })],
                ['validTo', getDateProp({ title: 'Valable au' })],
            ],
        }),
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
