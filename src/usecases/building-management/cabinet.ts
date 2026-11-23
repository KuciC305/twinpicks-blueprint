import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Cabinet';

export const CabinetTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: `Nom de l'armoire`, friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    cabinetId: {
        ...getSimpleTextProp({ title: `Identifiant de l'armoire` }),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: `Position de l'armoire, qui localise les points de connexion qu'elle contient`,
            geometryType: 'Point',
        }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: `Local dans lequel est située l'armoire`,
            targetTemplateObjectId: 'urn:ngsi-ld:Space:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Armoire',
            required: ['name', 'isPartOf'],
            description: `Armoire ou coffret (électrique, de comptage d'eau ou de gaz, de dispatch…) contenant des points de connexion. Elle ne porte que sa localisation : l'alimentation se décrit entre les points de connexion (ConnectivityNode.isFedBy).`,
            minimum: 0,
            identifier: 'name',
        },
    },
};
