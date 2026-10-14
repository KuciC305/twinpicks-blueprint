import { StellioTemplate, StellioTemplateProp } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getMultiAttributeProp,
    getNumberProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'InvoiceDetail';

/**
 * Sub-properties shared by every invoice line instance (amount and consumption).
 * Each line is one instance, told apart by its datasetId (D8, D9).
 */
const getLineSubProps = (): [string, StellioTemplateProp][] => [
    ['startDate', getDateProp({ title: 'Début de période' })],
    ['endDate', getDateProp({ title: 'Fin de période' })],
    ['section', getEnumProp({ title: 'Bloc de facture', enum: ['supply', 'network', 'taxes', 'services'] })],
    // Normalised category shared across suppliers, list still to agree on (D9)
    ['lineCategory', getSimpleTextProp({ title: 'Catégorie de ligne' })],
    // Invoice number of a cancelled estimate ("Annulation estimation facture n°…")
    ['cancelsInvoice', getSimpleTextProp({ title: 'Facture annulée' })],
];

/** Part of an invoice for one delivery point (D7). One row of the Finances control queue. */
export const InvoiceDetailTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du détail de facture', friendlyAttributeName: 'Nom' }),
    },
    startDate: {
        ...getDateProp({ title: 'Début de la période facturée' }),
    },
    endDate: {
        ...getDateProp({ title: 'Fin de la période facturée' }),
    },
    amount: {
        ...getMultiAttributeProp({
            formLabel: 'Lignes de facture (montants HT)',
            propertySchemaDefinition: getNumberProp({ title: 'Montant HT', canSetObservedAt: true }, 'EUR'),
            subProps: [
                ...getLineSubProps(),
                ['quantity', getNumberProp({ title: 'Quantité', canSetUnitCode: true })],
                ['unitPrice', getNumberProp({ title: 'Prix unitaire HT', minimum: 0, canSetUnitCode: true })],
                ['vatRate', getNumberProp({ title: 'Taux de TVA (%)', minimum: 0, maximum: 100 })],
            ],
        }),
    },
    consumption: {
        ...getMultiAttributeProp({
            formLabel: 'Consommations facturées',
            propertySchemaDefinition: getNumberProp({
                title: 'Consommation',
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            subProps: [
                ...getLineSubProps(),
                ['meterReading', getEnumProp({ title: 'Type de relevé', enum: ['measured', 'estimated'] })],
            ],
        }),
    },
    // Set by the control flow, then changed by the user in the control queue. Control results: D17.
    reviewStatus: {
        ...getEnumProp({ title: 'Statut de contrôle', enum: ['toReview', 'validated', 'rejected'] }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: 'Facture',
            targetTemplateObjectId: 'urn:ngsi-ld:Invoice:Template',
        }),
    },
    relatedDeliveryPoint: {
        ...getRelationshipProp({
            formLabel: 'Point de livraison',
            targetTemplateObjectId: 'urn:ngsi-ld:DeliveryPoint:Template',
        }),
    },
    relatedContract: {
        ...getRelationshipProp({
            formLabel: 'Contrat de fourniture',
            targetTemplateObjectId: 'urn:ngsi-ld:Contract:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Détail de facture',
            required: ['name', 'isPartOf', 'relatedDeliveryPoint', 'startDate', 'endDate'],
            description:
                "Partie d'une facture qui concerne un point de livraison : période, lignes de montants et de consommations, statut de contrôle.",
            minimum: 0,
        },
    },
};
