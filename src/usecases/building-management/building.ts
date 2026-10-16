import { StellioTemplate } from 'src/interfaces';
import {
    getGeoPropertyProp,
    getIntegerProp,
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
        ...getSimpleTextProp({ title: 'Description du bâtiment' }),
    },
    floorArea: {
        ...getIntegerProp({ title: 'Surface de plancher (m²)' }, 'MTK'),
    },
    openingHours: {
        ...getJsonPropertyProp({
            formLabel: "Horaires d'ouverture et fermetures",
            json: JSON.stringify({
                weekly: {
                    mon: [['08:00', '18:00']],
                    tue: [['08:00', '18:00']],
                },
                closures: [],
            }),
        }),
    },
    hasWeatherInformation: {
        ...getRelationshipProp({
            formLabel: 'Station météo (DJU)',
            targetTemplateObjectId: 'urn:ngsi-ld:WeatherInformation:Template',
        }),
    },
    hasUsage: {
        ...getMultiRelationshipProp({
            formLabel: 'Utilisation du bâtiment',
            formLabelPerItem: "Choisir un type d'usage",
            targetTemplateObjectId: 'urn:ngsi-ld:Usage:Template',
        }),
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
        ...getJsonPropertyProp({ formLabel: 'Référentiel National des Bâtiments', canSelfInit: true }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'Building',
            title: 'Bâtiment',
            required: ['name', 'location'],
            minimum: 1,
            description: 'Jumeau numérique du bâtiment',
        },
    },
};
