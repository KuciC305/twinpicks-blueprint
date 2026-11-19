import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getJsonPropertyProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Usage';

/** General uses of a building, inspired by the OPERAT activity categories without their codes */
const usageNames = [
    'Bureaux',
    'Enseignement',
    'Commerce',
    'Santé',
    'Hébergement',
    'Logement',
    'Restauration',
    'Sport et loisirs',
    'Culture',
    'Laboratoire',
    'Industrie et ateliers',
    'Entrepôt et logistique',
    'Parking',
    'Autre',
];

export const UsageTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getEnumProp({
            title: "Type d'usage du bâtiment",
            enum: usageNames,
            friendlyAttributeName: 'Nom',
        }),
    },
    description: {
        ...getSimpleTextProp({ title: "Précisions sur l'usage (optionnel)" }),
    },
    /**
     * Seuils des détections du tableau de bord pour les bâtiments de cet usage, partiels : un seuil
     * absent garde sa valeur par défaut. Un bâtiment à plusieurs usages applique le plus exigeant.
     * Clés : co2Watch, co2Action (ppm), comfortTolerance, comfortMin, comfortMax (°C),
     * closedConsumptionPercent, consumptionDriftPercent (%), sensorSilentAfterHours (h),
     * deliveryPointSilentAfterDays, subMeterSilentAfterDays (jours).
     */
    thresholds: {
        ...getJsonPropertyProp({
            formLabel: 'Seuils des détections (vide : valeurs par défaut)',
            canSelfInit: true,
        }),
    },

    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Usage',
            required: ['name'],
            description: "Usage d'un bâtiment, choisi parmi une liste d'usages généraux.",
            minimum: 0,
            identifier: 'name',
        },
    },
};
