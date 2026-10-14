import { StellioTemplate } from 'src/interfaces';
import { getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'BillingAccount';

/** What an invoice is addressed to, with the Chorus Pro routing data. Groups delivery points on one invoice. */
export const BillingAccountTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du compte de facturation', friendlyAttributeName: 'Nom' }),
    },
    reference: {
        ...getSimpleTextProp({ title: 'Numéro du compte de facturation', friendlyAttributeName: 'Référence' }),
    },
    chorusSiret: {
        ...getSimpleTextProp({ title: 'SIRET destinataire (Chorus Pro)', pattern: '^[0-9]{14}$' }),
    },
    legalCommitmentNumber: {
        ...getSimpleTextProp({ title: "Numéro d'engagement juridique (EJ)" }),
    },
    serviceCode: {
        ...getSimpleTextProp({ title: 'Code service (CSE)' }),
    },
    holder: {
        ...getRelationshipProp({
            formLabel: 'Titulaire',
            targetTemplateObjectId: 'urn:ngsi-ld:Organization:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Compte de facturation',
            required: ['name', 'reference', 'holder'],
            description: 'Compte de facturation chez un fournisseur, avec les informations de routage Chorus Pro.',
            minimum: 0,
            identifier: 'reference',
        },
    },
};
