import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getMultiAttributeProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'WeeklySchedule';

/** 24h time in HH:mm format, e.g. 08:00 or 17:30 */
const timePattern = '^([01][0-9]|2[0-3]):[0-5][0-9]$';

export const WeeklyScheduleTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du planning', friendlyAttributeName: 'Nom' }),
    },
    timeSlots: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getSimpleTextProp({ title: 'Libellé du créneau (optionnel)' }),
            formLabel: 'Créneaux horaires',
            subProps: [
                [
                    'days',
                    getEnumProp({
                        title: 'Jours',
                        enum: [1, 2, 3, 4, 5, 6, 7],
                        allowMultiple: true,
                    }),
                ],
                ['startTime', getSimpleTextProp({ title: 'Heure de début (HH:mm)', pattern: timePattern })],
                ['endTime', getSimpleTextProp({ title: 'Heure de fin (HH:mm)', pattern: timePattern })],
            ],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Planning hebdomadaire',
            minimum: 0,
            required: ['name', 'timeSlots'],
            description: "Planning hebdomadaire composé d'un ou plusieurs créneaux horaires",
        },
    },
};
