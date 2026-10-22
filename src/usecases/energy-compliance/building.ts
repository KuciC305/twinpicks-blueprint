import { StellioTemplate } from 'src/interfaces';
import {
    getGeoPropertyProp,
    getJsonPropertyProp,
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
        ...getSimpleTextProp({ title: 'Description du bâtiment' }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: 'Appartient au site',
            targetTemplateObjectId: 'urn:ngsi-ld:Site:Template',
        }),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: 'Sélectionner le bâtiment sur la carte',
            geometryType: 'Polygon',
        }),
    },
    rnb: {
        ...getJsonPropertyProp({ formLabel: 'Référentiel national des bâtiments', canSelfInit: true }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Bâtiment',
            required: ['name', 'location', 'isPartOf'],
            minimum: 1,
            description:
                'Bâtiment du parc, localisé et rattaché au RNB (son DPE est recherché dans la BDNB à partir de son identifiant RNB).',
        },
    },
};
