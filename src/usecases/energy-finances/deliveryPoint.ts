import { StellioTemplate } from 'src/interfaces';
import {
    getEnumProp,
    getMultiRelationshipProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'DeliveryPoint';

/** Stable codes (data model principle 4, D10). Also used in DeliveryPoint ids (D11). */
export const fluidTypes = ['electricity', 'gas', 'water', 'heat'];

/**
 * Light version of the DeliveryPoint: in this use case, delivery points are mostly picked
 * from the ones already created by the patrimoine use case. Creating one here only needs
 * what an invoice must be linked to. The link to the building (controlledAsset) is set elsewhere.
 */
export const DeliveryPointTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du point de livraison', friendlyAttributeName: 'Nom' }),
    },
    deliveryPointNumber: {
        ...getSimpleTextProp({ title: 'Numéro du point de livraison (PRM, PCE…)', friendlyAttributeName: 'Numéro' }),
    },
    fluidType: {
        ...getEnumProp({ title: 'Type de fluide', enum: fluidTypes }),
    },
    segment: {
        ...getEnumProp({
            title: 'Segment',
            enum: ['C5', 'C4', 'C3', 'C2', 'C1', 'T1', 'T2', 'T3', 'T4', 'TP'],
        }),
    },
    distributor: {
        ...getRelationshipProp({
            formLabel: 'Distributeur (gestionnaire de réseau)',
            targetTemplateObjectId: 'urn:ngsi-ld:Organization:Template',
        }),
    },
    // Child → parent (D6, revised): a contract can cover hundreds of delivery points.
    // Several values when supply contracts follow each other over time.
    relatedContract: {
        ...getMultiRelationshipProp({
            formLabel: 'Contrats de fourniture',
            formLabelPerItem: 'Sélectionner un contrat',
            targetTemplateObjectId: 'urn:ngsi-ld:Contract:Template',
            minimum: 0,
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Point de livraison',
            required: ['name', 'deliveryPointNumber', 'fluidType'],
            description:
                "Point de livraison d'un fluide (PRM électricité, PCE gaz, compteur eau). Identifiant attendu : {fluidType}:{numéro}, par exemple electricity:25438060712186.",
            minimum: 0,
            // Not read by the Digital Twin form yet: ingestion flows build the id themselves
            identifier: 'deliveryPointNumber',
        },
    },
};
