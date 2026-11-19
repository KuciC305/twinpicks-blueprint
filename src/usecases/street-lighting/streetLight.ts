import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getGeoPropertyProp,
    getRelationshipProp,
    getSimpleTextProp,
    getNumericProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Streetlight';

export const StreetlightTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du point lumineux', friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: 'Pointer la position du point lumineux sur la carte',
            geometryType: 'Point',
        }),
    },
    streetAddress: {
        ...getSimpleTextProp({ title: 'Adresse' }),
    },
    circuit: {
        ...getSimpleTextProp({ title: 'Circuit électrique' }),
    },
    status: {
        ...getEnumProp({
            title: 'État général',
            enum: ['ok', 'defectiveLamp', 'columnIssue', 'brokenLantern'],
            canSelfInit: true,
            friendlyAttributeName: 'État',
        }),
    },
    controllingMethod: {
        ...getEnumProp({
            title: 'Mode de commande',
            enum: ['Groupe', 'Individuel'],
        }),
    },
    locationCategory: {
        ...getEnumProp({
            title: 'Catégorie de localisation',
            enum: [
                'Route',
                'Piste piétonne',
                'Jardin',
                'Parking',
                'Pont',
                'Tunnel',
                'Façade',
                'Playground',
                'Île centrale',
            ],
        }),
    },
    refStreetlightGroup: {
        ...getRelationshipProp({
            formLabel: 'Groupe de points lumineux',
            targetTemplateObjectId: 'urn:ngsi-ld:StreetlightGroup:Template',
        }),
    },
    refStreetlightControlCabinet: {
        ...getRelationshipProp({
            formLabel: 'Armoire de commande',
            targetTemplateObjectId: 'urn:ngsi-ld:StreetlightControlCabinet:Template',
        }),
    },
    lanternHeight: {
        ...getNumericProp({ title: 'Hauteur de la lanterne (m)', minimum: 0 }),
    },
    streetPoleNum: {
        ...getSimpleTextProp({ title: 'Numéro de mât' }),
    },
    feederPillarNum: {
        ...getSimpleTextProp({ title: 'Numéro de feeder pillar' }),
    },
    dateServiceStarted: {
        ...getDateProp({ title: 'Date de mise en service' }),
    },
    dateLastLampChange: {
        ...getDateProp({ title: 'Date du dernier changement de lampe' }),
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
            title: 'Point lumineux',
            required: ['name', 'location'],
            description: `Un point lumineux représente tout type d'éclairage extérieur sur la carte`,
            minimum: 1,
        },
    },
};
