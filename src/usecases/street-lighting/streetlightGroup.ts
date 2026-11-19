import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getGeoPropertyProp,
    getMultiRelationshipProp,
    getRelationshipProp,
    getSimpleTextProp,
    getNumericProp,
} from '../../utils/blueprintHelpers';

const entityType = 'StreetlightGroup';

export const StreetlightGroupTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du groupe de points lumineux', friendlyAttributeName: 'Nom' }),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: 'Relier les points lumineux sur la carte',
            geometryType: 'MultiLineString',
        }),
    },
    refStreetlightControlCabinet: {
        ...getRelationshipProp({
            formLabel: 'Armoire de commande',
            targetTemplateObjectId: 'urn:ngsi-ld:StreetlightControlCabinet:Template',
        }),
    },
    circuitId: {
        ...getSimpleTextProp({ title: 'Identifiant du circuit' }),
    },
    illuminanceLevel: {
        ...getNumericProp({ title: "Niveau d'éclairement relatif du groupe (0 à 1)", minimum: 0, maximum: 1 }),
    },
    dateLastSwitchingOn: {
        ...getDateProp({ title: 'Date de la dernière mise sous tension' }),
    },
    dateLastSwitchingOff: {
        ...getDateProp({ title: 'Date de la dernière coupure' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Groupe de points lumineux',
            required: ['name', 'location'],
            description: 'Groupe de points lumineux partageant une même logique de commande et de commutation.',
            minimum: 0,
        },
    },
};
