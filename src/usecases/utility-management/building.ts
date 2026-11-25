import { StellioTemplate } from 'src/interfaces';
import {
    getGeoPropertyProp,
    getJsonPropertyProp,
    getMultiRelationshipProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Building';

export const BuildingTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du bâtiment', friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    /**
     * A GeoProperty in a Building will display the RNB selector component in TP
     * It will fill the rnb property automatically
     */
    location: {
        ...getGeoPropertyProp({ formLabel: 'Sélectionner le bâtiment sur la carte', geometryType: 'Polygon' }),
    },
    rnb: {
        ...getJsonPropertyProp({ formLabel: 'Référentiel National des Bâtiments', canSelfInit: true }),
    },
    isContainedIn: {
        ...getRelationshipProp({
            formLabel: 'Site auquel appartient le bâtiment',
            targetTemplateObjectId: 'urn:ngsi-ld:Site:Template',
        }),
    },
    hasUsage: {
        ...getMultiRelationshipProp({
            formLabel: 'Usages du bâtiment',
            formLabelPerItem: 'Sélectionner un usage',
            listOfAllowedRelationships: ['urn:ngsi-ld:Usage:Template'],
            minimum: 0,
        }),
    },
    hasDeliveryPoint: {
        ...getMultiRelationshipProp({
            formLabel: 'Points de livraison',
            formLabelPerItem: 'Sélectionner un point de livraison',
            listOfAllowedRelationships: ['urn:ngsi-ld:DeliveryPoint:Template'],
            minimum: 0,
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Bâtiment',
            required: ['name', 'location', 'isContainedIn'],
            description: 'Bâtiment ou asset rattaché à un site, identifié via le Référentiel National des Bâtiments.',
            minimum: 0,
        },
    },
};
