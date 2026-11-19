import { StellioTemplate, StellioTemplateProp } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getMultiAttributeProp,
    getNumericProp,
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
    // Normalised component shared across suppliers, {component}[-{timeClass}] (D9)
    ['lineCategory', getSimpleTextProp({ title: 'Catégorie de ligne' })],
    // Adjustment lines keep the category of the component they adjust (D9)
    ['adjustment', getEnumProp({ title: "Type d'ajustement", enum: ['estimateCancellation', 'regularisation'] })],
    // Invoice number of a cancelled estimate ("Annulation estimation facture n°…")
    ['cancelsInvoice', getSimpleTextProp({ title: 'Facture annulée' })],
    // Supplier label(s), several when lines of the same category and start date are summed (D9)
    ['sourceLabel', getSimpleTextProp({ title: 'Libellé fournisseur' })],
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
            propertySchemaDefinition: getNumericProp(
                { schemaType: 'number', title: 'Montant HT', canSetObservedAt: true },
                'EUR'
            ),
            subProps: [
                ...getLineSubProps(),
                ['quantity', getNumericProp({ schemaType: 'number', title: 'Quantité', canSetUnitCode: true })],
                [
                    'unitPrice',
                    getNumericProp({
                        schemaType: 'number',
                        title: 'Prix unitaire HT',
                        minimum: 0,
                        canSetUnitCode: true,
                    }),
                ],
                [
                    'vatRate',
                    getNumericProp({ schemaType: 'number', title: 'Taux de TVA (%)', minimum: 0, maximum: 100 }),
                ],
            ],
        }),
    },
    consumption: {
        ...getMultiAttributeProp({
            formLabel: 'Consommations facturées',
            propertySchemaDefinition: getNumericProp({
                schemaType: 'number',
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
    // Set to toReview by the ingestion flow, then changed in the control queue (D20). observedAt = review time.
    // Control results: D17.
    reviewStatus: {
        ...getEnumProp({
            title: 'Statut de contrôle',
            enum: ['toReview', 'validated', 'rejected'],
            canSetObservedAt: true,
        }),
        reviewerId: {
            ...getSimpleTextProp({ title: 'Identifiant du contrôleur (Keycloak)' }),
        },
        reviewerName: {
            ...getSimpleTextProp({ title: 'Nom du contrôleur' }),
        },
        reviewComment: {
            ...getSimpleTextProp({ title: 'Commentaire de contrôle (obligatoire en cas de rejet)' }),
        },
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
    // On a credit note: the invoice it corrects for this delivery point, which can differ per delivery point (D21)
    corrects: {
        ...getRelationshipProp({
            formLabel: 'Facture corrigée (avoir)',
            targetTemplateObjectId: 'urn:ngsi-ld:Invoice:Template',
        }),
        correctionType: {
            ...getEnumProp({ title: 'Type de correction', enum: ['cancellation', 'partialCorrection'] }),
        },
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
