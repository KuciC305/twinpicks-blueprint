import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getGeoPropertyProp,
    getMultiRelationshipProp,
    getSimpleTextProp,
    getNumericProp,
    getMultiAttributeProp,
} from '../../utils/blueprintHelpers';

const entityType = 'StreetlightControlCabinet';

export const StreetlightControlCabinetTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de l'armoire de commande", friendlyAttributeName: 'Nom' }),
    },
    location: {
        ...getGeoPropertyProp({
            formLabel: "Pointer la position de l'armoire de commande sur la carte",
            geometryType: 'Point',
        }),
    },
    serialNumber: {
        ...getSimpleTextProp({ title: 'Numéro de série' }),
    },
    brandName: {
        ...getSimpleTextProp({ title: 'Marque' }),
    },
    modelName: {
        ...getSimpleTextProp({ title: 'Modèle' }),
    },
    manufacturerName: {
        ...getSimpleTextProp({ title: 'Fabricant' }),
    },
    commandedBy: {
        ...getSimpleTextProp({ title: 'Fabricant' }),
    },
    cupboardMadeOf: {
        ...getEnumProp({
            title: 'Matériau du coffret',
            enum: ['Métal', 'Béton', 'Plastique', 'Autre'],
        }),
    },
    status: {
        ...getEnumProp({
            title: 'État opérationnel',
            enum: ['ok', 'maintenanceRequired', 'outOfOrder'],
            canSelfInit: true,
            friendlyAttributeName: 'État',
        }),
    },
    responsible: {
        ...getSimpleTextProp({ title: "Responsable de l'armoire" }),
    },
    dateServiceStarted: {
        ...getDateProp({ title: 'Date de mise en service' }),
    },
    dateLastProgramming: {
        ...getDateProp({ title: 'Date de la dernière programmation' }),
    },
    nextActuationDeadline: {
        ...getDateProp({ title: 'Échéance de la prochaine action' }),
    },
    dateMeteringStarted: {
        ...getDateProp({ title: 'Date de début du comptage énergétique' }),
    },
    maximumPowerAvailable: {
        ...getNumericProp({ title: 'Puissance maximale disponible (kW)', minimum: 0 }),
    },
    energyCost: {
        ...getNumericProp({ title: "Coût de l'énergie consommée", minimum: 0 }),
    },
    totalActivePower: {
        ...getNumericProp({ title: 'Puissance active totale (kW)', minimum: 0 }),
    },
    totalReactivePower: {
        ...getNumericProp({ title: 'Puissance réactive totale (kVAr)', minimum: 0 }),
    },
    observation: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getSimpleTextProp({ title: 'Saisir une observation' }),
            formLabel: 'Observations',
            subProps: [['observationDate', getDateProp({ title: "Date de l'observation" })]],
        }),
    },
    digitalInput: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getEnumProp({
                title: 'Saisir le statut de la porte (0: ouvert, 1: fermé)',
                enum: [0, 1],
            }),
            formLabel: 'Statut ouverture des portes',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Armoire de commande',
            required: ['name', 'location'],
            description:
                "Armoire de commande des points lumineux, permettant la gestion et la supervision des groupes d'éclairage.",
            minimum: 0,
        },
    },
};
