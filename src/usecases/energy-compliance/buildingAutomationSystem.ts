import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getIntegerProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'BuildingAutomationSystem';

export const BuildingAutomationSystemTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du système', friendlyAttributeName: 'Nom' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment équipé',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    hvacPower: {
        ...getIntegerProp(
            { title: 'Puissance nominale des systèmes de chauffage et climatisation (kW)', minimum: 0 },
            'KWT'
        ),
    },
    bacsStatus: {
        ...getEnumProp({
            title: 'Statut BACS (toQualify : à qualifier, compliant : conforme, toEquip : à équiper, exempt : exempté)',
            enum: ['toQualify', 'compliant', 'toEquip', 'exempt'],
        }),
    },
    automationFunctions: {
        ...getEnumProp({
            title: "Fonctions d'automatisation présentes",
            enum: [
                'regulation',
                'scheduling',
                'continuousMonitoring',
                'benchmarking',
                'lossDetection',
                'interoperability',
                'manualOverride',
            ],
            allowMultiple: true,
        }),
    },
    installationDate: {
        ...getDateProp({ title: "Date d'installation" }),
    },
    lastInspectionDate: {
        ...getDateProp({ title: 'Date de la dernière inspection' }),
    },
    nextInspectionDate: {
        ...getDateProp({ title: 'Date de la prochaine inspection' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: "Système d'automatisation et de contrôle (BACS)",
            required: ['name', 'refBuilding', 'hvacPower', 'bacsStatus'],
            minimum: 0,
            description:
                "Système d'automatisation et de contrôle du bâtiment (décret BACS) : puissance des systèmes CVC, fonctions présentes et inspections.",
        },
    },
};
