import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getNumericProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'EnergyAction';

/** Stable codes (data model principle 4, D10) */
export const actionCategories = [
    'lighting',
    'heating',
    'cooling',
    'ventilation',
    'hotWater',
    'envelope',
    'controls',
    'schedules',
    'renewable',
    'behaviour',
    'other',
];
export const actionStatuses = ['proposed', 'planned', 'inProgress', 'done', 'cancelled'];

/**
 * Improvement action on a building: works, settings or behaviour. The dashboard measures its
 * gain by comparing the building's consumption before `startDate` with the consumption after
 * `endDate` (climate-adjusted), against the estimated saving.
 */
export const EnergyActionTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de l'action", friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment concerné',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    // Optional, several possible: one instance per target, each with its datasetId (like DeliveryPoint.controlledAsset)
    refEnergyTarget: {
        ...getRelationshipProp({
            formLabel: 'Objectifs visés',
            targetTemplateObjectId: 'urn:ngsi-ld:EnergyTarget:Template',
        }),
    },
    actionCategory: {
        ...getEnumProp({ title: "Catégorie d'action", enum: actionCategories }),
    },
    status: {
        ...getEnumProp({ title: 'Statut', enum: actionStatuses }),
    },
    priority: {
        ...getEnumProp({ title: 'Priorité', enum: ['high', 'medium', 'low'] }),
    },
    fluidType: {
        ...getEnumProp({
            title: 'Fluides concernés',
            enum: ['electricity', 'gas', 'water', 'heat'],
            allowMultiple: true,
        }),
    },
    startDate: {
        ...getDateProp({ title: 'Début des travaux ou de la mise en œuvre' }),
    },
    endDate: {
        ...getDateProp({ title: 'Fin des travaux / mise en service' }),
    },
    investmentCost: {
        ...getNumericProp({ title: 'Coût (€ HT)', minimum: 0 }, 'EUR'),
    },
    estimatedSaving: {
        ...getNumericProp({ title: 'Économie estimée (kWh/an)', minimum: 0 }, 'KWH'),
    },
    estimatedSavingPercent: {
        ...getNumericProp(
            { title: 'Économie estimée (% de la consommation du bâtiment)', minimum: 0, maximum: 100 },
            'P1'
        ),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: "Action d'amélioration",
            required: ['name', 'refBuilding', 'actionCategory', 'status'],
            minimum: 0,
            description:
                "Action du plan d'amélioration d'un bâtiment (travaux, réglages, comportements), avec son économie estimée. Le gain réel est mesuré par le tableau de bord.",
        },
    },
};
