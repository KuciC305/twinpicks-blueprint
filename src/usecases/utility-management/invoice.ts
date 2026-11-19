import { StellioTemplate } from 'src/interfaces';
import {
    getSimpleTextProp,
    getDateProp,
    getNumericProp,
    getRelationshipProp,
    getMultiAttributeProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Invoice';

export const InvoiceTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    supplierReference: {
        ...getSimpleTextProp({ title: 'Référence fournisseur', friendlyAttributeName: 'Référence' }),
    },
    invoiceNumber: {
        ...getSimpleTextProp({ title: 'Numéro de facture' }),
    },
    startAt: {
        ...getDateProp({ title: 'Date de début' }),
    },
    endAt: {
        ...getDateProp({ title: 'Date de fin' }),
    },
    oldIndex: {
        ...getNumericProp({ title: 'Ancien index', minimum: 0 }),
    },
    newIndex: {
        ...getNumericProp({ title: 'Nouvel index', minimum: 0 }),
    },
    totalCostHT: {
        ...getNumericProp({ title: 'Montant total HT', minimum: 0 }),
    },
    totalCostTTC: {
        ...getNumericProp({ title: 'Montant total TTC', minimum: 0 }),
    },
    taxes: {
        ...getNumericProp({ title: 'Montant des taxes', minimum: 0 }),
    },
    invoiceLines: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getSimpleTextProp({ title: 'Ligne de facture' }),
            formLabel: 'Lignes de facture',
            subProps: [
                ['item', getSimpleTextProp({ title: 'Article' })],
                ['quantity', getNumericProp({ title: 'Quantité', minimum: 0 })],
                ['unit', getSimpleTextProp({ title: 'Unité' })],
                ['unitCost', getNumericProp({ title: 'Coût unitaire', minimum: 0 })],
            ],
        }),
    },
    relatedDeliveryPoint: {
        ...getRelationshipProp({
            formLabel: 'Point de livraison',
            targetTemplateObjectId: 'urn:ngsi-ld:DeliveryPoint:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Facture',
            required: ['invoiceNumber', 'supplierReference', 'startAt', 'endAt', 'relatedDeliveryPoint'],
            description:
                'Facture énergétique rattachée à un point de livraison, avec période de facturation, index de compteur et lignes de facture.',
            minimum: 0,
            identifier: 'invoiceNumber',
        },
    },
};
