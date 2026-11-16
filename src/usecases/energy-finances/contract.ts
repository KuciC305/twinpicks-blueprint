import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Contract';

/** Supply contract, as referenced on the supplier's invoice. Delivery points point to it (D6, revised). */
export const ContractTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du contrat', friendlyAttributeName: 'Nom' }),
    },
    reference: {
        ...getSimpleTextProp({ title: 'Référence du contrat', friendlyAttributeName: 'Référence' }),
    },
    priceType: {
        ...getEnumProp({ title: 'Type de prix', enum: ['market', 'regulated'] }),
    },
    offerName: {
        ...getSimpleTextProp({ title: "Nom de l'offre" }),
    },
    // Supplier's own grouping, e.g. EDF "Lot 04 | C5 | BAT". Not the market Lot.
    supplierSiteGroup: {
        ...getSimpleTextProp({ title: 'Groupe de sites (fournisseur)' }),
    },
    // Rows of the lot's price schedule that apply to this contract (D15, proposal)
    pricingGroup: {
        ...getSimpleTextProp({ title: 'Groupe de prix du bordereau (ex. C4, C5-BASE)' }),
    },
    startDate: {
        ...getDateProp({ title: 'Date de début de fourniture' }),
    },
    endDate: {
        ...getDateProp({ title: 'Date de fin de fourniture' }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: 'Lot de marché',
            targetTemplateObjectId: 'urn:ngsi-ld:Lot:Template',
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
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Contrat de fourniture',
            required: ['name', 'reference', 'supplier', 'startDate'],
            description:
                "Contrat de fourniture couvrant un ou plusieurs points de livraison (le lien est porté par le point de livraison), rattaché à un lot de marché quand il y en a un.",
            minimum: 0,
            identifier: 'reference',
        },
    },
};
