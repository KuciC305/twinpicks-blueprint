import { StellioTemplate } from 'src/interfaces';
import {
    getSimpleTextProp,
    getEnumProp,
    getNumericProp,
    getGeoPropertyProp,
    getJsonPropertyProp,
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
            enum: ['space', 'room', 'technicalRoom'],
        }),
    },
    functionalZone: {
        ...getSimpleTextProp({ title: 'Zone fonctionnelle (BACS)' }),
    },
    floorArea: {
        ...getNumericProp({ title: 'Surface (m²)' }, 'MTK'),
    },
    openingHours: {
        ...getJsonPropertyProp({
            formLabel: "Horaires propres à l'espace",
            json: {
                weekly: {
                    mon: [['08:00', '18:00']],
                },
                closures: [],
            },
        }),
    },
    occupancy: {
        ...getNumericProp({ title: 'Personnes détectées', canSetObservedAt: true, canSelfInit: true }),
    },
    temperature: {
        ...getNumericProp({ title: 'Température intérieure', canSetObservedAt: true, canSelfInit: true }, 'CEL'),
    },
    temperatureSetpoint: {
        ...getNumericProp({ title: 'Consigne de température', canSetObservedAt: true, canSelfInit: true }, 'CEL'),
    },
    co2: {
        ...getNumericProp({ title: 'CO2', canSetObservedAt: true, canSelfInit: true }, '59'),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: "Contour de l'espace (WGS84, plan géoréférencé)",
            geometryType: 'Polygon',
        }),
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
