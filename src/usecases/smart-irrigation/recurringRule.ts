import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getSimpleTextProp,
    getNumericProp,
    getRelationshipProp,
    getMultiRelationshipProp,
    getEnumProp,
} from '../../utils/blueprintHelpers';

const entityType = 'RecurringRule';

export const RecurringRuleTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Programme',
            minimum: 0,
            required: [
                'name',
                'managedZones',
                'startTime',
                'duration',
                'activationDaysMode',
                'repetitionRulePerDayCount',
                'repetitionRulePerDayInterval',
                'irrigationArea',
                'managedZones',
                'status',
            ],
            description: "Un programme d'irrigation applicable à une zone d'irrigation et ses zones de gestion",
        },
    },

    // #region Properties
    name: { ...getSimpleTextProp({ title: 'Nom de la règle récurrente' }) },
    startTime: { ...getDateProp({ title: 'Heure de départ', dateMode: 'time' }) },
    duration: { ...getNumericProp({ title: 'Durée (en minutes)', minimum: 1, maximum: 120 }) },

    activationDaysMode: {
        ...getEnumProp({ title: "Mode d'activation des jours", enum: ['Tous les deux jours', 'Jours spécifiques'] }),
    },
    everySecondDayWeekStartDay: {
        ...getEnumProp({
            title: 'Jour de démarrage de la règle tous les 2 jours',
            enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        }),
    },
    specificActivationWeekDays: {
        ...getEnumProp({
            title: "Jours d'activation spécifiques",
            enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        }),
    },

    repetitionRulePerDayCount: {
        ...getNumericProp({ title: 'Nombre de répétitions par jour', minimum: 1, maximum: 10 }),
    },
    repetitionRulePerDayFrequency: {
        type: 'Property',
        value: 'MINUTELY',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'string',
                canSelfInit: true,
                friendlyAttributeName: 'Fréquence de répétition',
            },
        },
    },
    repetitionRulePerDayInterval: {
        ...getNumericProp({ title: 'Intervalle entre les répétitions (en minutes)', minimum: 1, maximum: 120 }),
    },

    irrigationArea: {
        ...getRelationshipProp({
            formLabel: "Zone d'irrigation cible du programme",
            targetTemplateObjectId: 'urn:ngsi-ld:IrrigationArea:Template',
        }),
    },
    managedZones: {
        ...getMultiRelationshipProp({
            formLabel:
                "Zones gérées (attention à bien sélectionner les zones au sein de la zone d'irrigation sélectionnée précédemment)",
            formLabelPerItem: 'Sélectionner une zone gérée',
            targetTemplateObjectId: 'urn:ngsi-ld:ManagedZone:Template',
            friendlyAttributeName: 'Zones gérées',
        }),
    },

    status: {
        ...getEnumProp({
            title: "Statut de la règle (pour ancien Econom'O, choisir 'documentationOnly')",
            enum: ['documentationOnly', 'inactive'],
            friendlyAttributeName: 'Statut de la règle',
        }),
    },
    // #endregion
};
