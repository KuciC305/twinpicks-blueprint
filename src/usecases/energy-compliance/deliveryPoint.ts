import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'DeliveryPoint';

export const DeliveryPointTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du point de livraison', friendlyAttributeName: 'Nom' }),
    },
    deliveryPointNumber: {
        ...getSimpleTextProp({ title: 'Identifiant du point de livraison' }),
    },
    fluidType: {
        ...getEnumProp({
            title: 'Type de fluide',
            enum: ['Electricité', 'Gaz', 'Eau', 'Réseau de chaleur', 'Réseau de froid', 'Fioul'],
        }),
    },
    isObserving: {
        ...getRelationshipProp({
            formLabel: "Est en train d'observer",
            listOfAllowedRelationships: ['urn:ngsi-ld:Building:Template', 'urn:ngsi-ld:Site:Template'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Point de livraison',
            required: ['name', 'deliveryPointNumber', 'fluidType', 'isObserving'],
            description: 'Compteur rattaché à un bâtiment ou à un site, source des consommations déclarées.',
            minimum: 0,
            identifier: 'deliveryPointNumber',
        },
    },
};
