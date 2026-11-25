import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getMultiAttributeProp,
    getMultiRelationshipProp,
    getNumericProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';
import { fluidTypes } from './deliveryPoint';

const entityType = 'RebillingContract';

/**
 * Part of the consumption billed on to a third party (D37). One `volumeSource` instance per
 * product; the dashboard computes the statements (D38). Archived, never deleted.
 */
export const RebillingContractTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du contrat', friendlyAttributeName: 'Nom' }),
    },
    reference: {
        ...getSimpleTextProp({ title: 'Référence du contrat', friendlyAttributeName: 'Référence' }),
    },
    customer: {
        ...getRelationshipProp({
            formLabel: 'Refacturé à',
            listOfAllowedRelationships: ['urn:ngsi-ld:Organization:Template', 'urn:ngsi-ld:Person:Template'],
        }),
    },
    startDate: {
        ...getDateProp({ title: 'Date de début du contrat' }),
    },
    endDate: {
        ...getDateProp({ title: 'Date de fin du contrat' }),
    },
    billingPeriodicity: {
        ...getEnumProp({ title: 'Périodicité de facturation', enum: ['monthly', 'quarterly', 'yearly'] }),
    },
    status: {
        ...getEnumProp({ title: 'Statut', enum: ['active', 'archived'] }),
    },
    volumeSource: {
        ...getMultiRelationshipProp({
            formLabel: 'Produits refacturés et compteurs',
            formLabelPerItem: 'Sélectionner le point compté (ou le point de livraison)',
            listOfAllowedRelationships: ['urn:ngsi-ld:ConnectivityNode:Template', 'urn:ngsi-ld:DeliveryPoint:Template'],
            // The nodes live in the building management use case, not in the energy finances one
            canSearchAllUseCases: true,
            minimum: 1,
            subProps: [
                ['product', getEnumProp({ title: 'Produit', enum: fluidTypes })],
                ['measureType', getEnumProp({ title: 'Mesure lue', enum: ['index', 'consumption'] })],
                // D39: the series billed on when several systems measure the node (e.g. SubMeter, GTC)
                [
                    'referenceSource',
                    getSimpleTextProp({
                        title: 'Source de référence',
                        description:
                            'Code de la source sur laquelle facturer quand plusieurs systèmes mesurent le point (ex. SubMeter, GTC). Vide : une seule source.',
                    }),
                ],
                ['validFrom', getDateProp({ title: 'Refacturé à partir du' })],
                ['validTo', getDateProp({ title: "Refacturé jusqu'au" })],
            ],
        }),
    },
    // One instance per product and price change: the history stays (D37)
    unitPrice: {
        ...getMultiAttributeProp({
            formLabel: 'Tarifs unitaires HT (historique)',
            // 'integer' because the TP form has no input for 'number'; its input accepts decimals
            propertySchemaDefinition: getNumericProp({ title: 'Prix HT par kWh ou m³', minimum: 0 }, 'EUR'),
            subProps: [
                ['product', getEnumProp({ title: 'Produit', enum: fluidTypes })],
                ['validFrom', getDateProp({ title: 'Valable à partir du' })],
            ],
        }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Contrat de refacturation',
            required: ['name', 'customer', 'startDate', 'billingPeriodicity', 'status', 'volumeSource'],
            description:
                "Refacturation à un tiers d'une partie des consommations (électricité, eau…) mesurées par un sous-compteur.",
            minimum: 0,
        },
    },
};
