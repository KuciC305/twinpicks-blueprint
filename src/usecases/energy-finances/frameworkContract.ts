import { StellioTemplate } from 'src/interfaces';
import { getDateProp, getEnumProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';
import { fluidTypes } from './deliveryPoint';

const entityType = 'FrameworkContract';

export const FrameworkContractTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    reference: {
        ...getSimpleTextProp({ title: 'Référence du marché', friendlyAttributeName: 'Référence' }),
    },
    name: {
        ...getSimpleTextProp({ title: 'Nom du marché', friendlyAttributeName: 'Nom' }),
    },
    fluidType: {
        ...getEnumProp({ title: 'Type de fluide', enum: fluidTypes }),
    },
    startDate: {
        ...getDateProp({ title: 'Date de début' }),
    },
    endDate: {
        ...getDateProp({ title: 'Date de fin' }),
    },
    supplier: {
        ...getRelationshipProp({
            formLabel: 'Fournisseur',
            targetTemplateObjectId: 'urn:ngsi-ld:Organization:Template',
        }),
    },
    // The buyer is not always the consumer, e.g. Département 06 for the MS1 purchasing group
    buyer: {
        ...getRelationshipProp({
            formLabel: 'Acheteur',
            targetTemplateObjectId: 'urn:ngsi-ld:Organization:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Marché (contrat cadre)',
            required: ['name', 'reference', 'fluidType', 'supplier'],
            description: "Marché ou accord-cadre de fourniture d'un fluide, passé par un acheteur avec un fournisseur.",
            minimum: 0,
            identifier: 'reference',
        },
    },
};
