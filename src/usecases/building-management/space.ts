import { StellioTemplate } from 'src/interfaces';
import {
    getSimpleTextProp,
    getEnumProp,
    getRelationshipProp,
    getMultiRelationshipProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Space';

export const SpaceTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: `Nom de l'espace`, friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: `Description de l'espace` }),
    },
    spaceType: {
        ...getEnumProp({
            title: `Type d'espace`,
            enum: [`Espace`, `Pièce`, `Local`],
        }),
    },
    functionalZone: {
        type: 'Property',
        value: 'Bureaux',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'string',
                title: 'Zone fonctionnelle (BACS)',
                order: 40,
            },
        },
    },
    floorArea: {
        type: 'Property',
        value: 0,
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'number',
                title: 'Surface (m²)',
                order: 41,
                canSetUnitCode: true,
            },
        },
    },
    openingHours: {
        type: 'JsonProperty',
        json: {
            weekly: {
                mon: [["08:00", "18:00"]],
            },
            closures: [],
        },
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'json',
                title: "Horaires propres à l'espace",
                order: 42,
            },
        },
    },
    occupancy: {
        type: 'Property',
        value: 0,
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'number',
                title: 'Personnes détectées',
                order: 43,
                canSetObservedAt: true,
                canSelfInit: true,
            },
        },
    },
    temperature: {
        type: 'Property',
        value: 0,
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'number',
                title: 'Température intérieure',
                order: 44,
                canSetObservedAt: true,
                canSelfInit: true,
            },
        },
        unitCode: 'CEL',
    },
    temperatureSetpoint: {
        type: 'Property',
        value: 0,
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'number',
                title: 'Consigne de température',
                order: 45,
                canSetObservedAt: true,
                canSelfInit: true,
            },
        },
        unitCode: 'CEL',
    },
    co2: {
        type: 'Property',
        value: 0,
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'number',
                title: 'CO2',
                order: 46,
                canSetObservedAt: true,
                canSelfInit: true,
            },
        },
        unitCode: '59',
    },
    isPartOf: {
        ...getMultiRelationshipProp({
            formLabel: "Niveaux de l'espace",
            formLabelPerItem: 'Choisir un niveau',
            targetTemplateObjectId: 'urn:ngsi-ld:Storey:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Espace',
            minimum: 1,
            required: ['name', 'isPartOf'],
            description: `Jumeau numérique de l'espace au sein du bâtiment`,
        },
    },
};