import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getNumberProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Invoice';

/** Invoice header: one entity per invoice number (D7). Per delivery point content is in InvoiceDetail. */
export const InvoiceTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la facture', friendlyAttributeName: 'Nom' }),
    },
    invoiceNumber: {
        ...getSimpleTextProp({ title: 'Numéro de facture', friendlyAttributeName: 'Numéro' }),
    },
    invoiceType: {
        ...getEnumProp({ title: 'Type de document', enum: ['invoice', 'creditNote'] }),
    },
    issueDate: {
        ...getDateProp({ title: "Date d'émission" }),
    },
    dueDate: {
        ...getDateProp({ title: "Date d'échéance" }),
    },
    totalExclVAT: {
        ...getNumberProp({ title: 'Montant total HT' }, 'EUR'),
    },
    totalVAT: {
        ...getNumberProp({ title: 'Montant total TVA' }, 'EUR'),
    },
    totalInclVAT: {
        ...getNumberProp({ title: 'Montant total TTC' }, 'EUR'),
    },
    // Where the PDF is stored is still open (D18)
    sourceDocument: {
        ...getSimpleTextProp({ title: 'Lien vers le document (PDF)' }),
    },
    marketReference: {
        ...getSimpleTextProp({ title: 'Référence du marché indiquée sur la facture' }),
    },
    chorusStatus: {
        ...getSimpleTextProp({ title: 'Statut Chorus Pro' }),
    },
    // Derived from the reviewStatus of the details
    reviewStatus: {
        ...getEnumProp({
            title: 'Statut de contrôle',
            enum: ['toReview', 'validated', 'rejected'],
        }),
    },
    supplier: {
        ...getRelationshipProp({
            formLabel: 'Fournisseur',
            targetTemplateObjectId: 'urn:ngsi-ld:Organization:Template',
        }),
    },
    billingAccount: {
        ...getRelationshipProp({
            formLabel: 'Compte de facturation',
            targetTemplateObjectId: 'urn:ngsi-ld:BillingAccount:Template',
        }),
    },
    // For a credit note: the invoice it corrects
    corrects: {
        ...getRelationshipProp({
            formLabel: 'Facture corrigée (avoir)',
            targetTemplateObjectId: 'urn:ngsi-ld:Invoice:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Facture',
            required: ['name', 'invoiceNumber', 'invoiceType', 'issueDate', 'supplier'],
            description:
                'En-tête de facture ou d’avoir : numéro, totaux, document source. Le détail par point de livraison est dans les détails de facture.',
            minimum: 0,
            identifier: 'invoiceNumber',
        },
    },
};
