import { StellioTemplate } from 'src/interfaces';
import { getJsonPropertyProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Usage';

export const UsageTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de l'usage", friendlyAttributeName: 'Nom' }),
    },
    code: {
        ...getSimpleTextProp({ title: "Code de l'usage" }),
    },
    nomenclatureSource: {
        ...getSimpleTextProp({ title: 'Source de nomenclature' }),
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

    /**
     * A complete enumeration or build on some external reference database/broker is required for such  
     */

    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Usage',
            required: ['name', 'code'],
            description: "Usage d'un bâtiment ou d'un asset, issu d'une nomenclature de référence.",
            minimum: 0,
            identifier: 'code',
        },
    },
};
