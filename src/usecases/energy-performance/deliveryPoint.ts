import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'DeliveryPoint';

/** Its measured `consumption` comes from ingestion, not from the forms */
export const DeliveryPointTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du point de livraison', friendlyAttributeName: 'Nom' }),
    },
    fluidType: {
        ...getEnumProp({
            title: 'Type de fluide',
            enum: ['electricity', 'gas', 'water'],
        }),
    },
    controlledAsset: {
        ...getRelationshipProp({
            formLabel: 'Actif contrôlé',
            listOfAllowedRelationships: ['urn:ngsi-ld:Building:Template', 'urn:ngsi-ld:Site:Template'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Point de livraison',
            required: ['name', 'fluidType', 'controlledAsset'],
            description: "Compteur d'un bâtiment, dont les consommations sont analysées.",
            minimum: 0,
        },
    },
};
