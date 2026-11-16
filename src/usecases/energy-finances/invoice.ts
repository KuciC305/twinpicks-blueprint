import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getNumericProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Invoice';

/**
 * Invoice header: one entity per invoice number (D7). Per delivery point content is in InvoiceDetail.
 * No review status here: it is computed from the details when displayed (D20).
 */
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
        ...getNumericProp({ schemaType: 'number', title: 'Montant total HT' }, 'EUR'),
    },
    totalVAT: {
        ...getNumericProp({ schemaType: 'number', title: 'Montant total TVA' }, 'EUR'),
    },
    totalInclVAT: {
        ...getNumericProp({ schemaType: 'number', title: 'Montant total TTC' }, 'EUR'),
    },
    // Where the PDF is stored is still open (D18)
    sourceDocument: {
        ...getSimpleTextProp({ title: 'Lien vers le document (PDF)' }),
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
    // What a credit note corrects is on each InvoiceDetail (D21)
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
