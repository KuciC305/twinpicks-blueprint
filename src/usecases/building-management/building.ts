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
        ...getSimpleTextProp({ title: 'Description du bâtiment' }),
    },
    floorArea: {
        type: 'Property',
        value: 0,
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'number',
                title: 'Surface de plancher (m²)',
                order: 40,
                canSetUnitCode: true,
            },
        },
    },
    openingHours: {
        type: 'JsonProperty',
        json: {
            weekly: {
                mon: [["08:00", "18:00"]],
                tue: [["08:00", "18:00"]],
            },
            closures: [],
        },
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'json',
                title: "Horaires d'ouverture et fermetures",
                order: 41,
            },
        },
    },
    territory: {
        type: 'Property',
        value: 'Territoire',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'string',
                title: 'Territoire',
                order: 42,
            },
        },
    },
    hasWeatherInformation: {
        type: 'Relationship',
        object: 'urn:ngsi-ld:WeatherInformation:Template',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'relationship',
                title: 'Station météo (DJU)',
                order: 43,
            },
        },
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