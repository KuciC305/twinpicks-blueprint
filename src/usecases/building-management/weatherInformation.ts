import { StellioTemplate } from 'src/interfaces';
import { getIntegerProp } from '../../utils/blueprintHelpers';

const entityType = 'WeatherInformation';

export const WeatherInformationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    temperature: {
        ...getIntegerProp({ title: 'Température extérieure', canSetObservedAt: true, canSelfInit: true }, 'CEL'),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Information Météo',
            description:
                'Station météo dont la température extérieure sert aux DJU et aux chronologies des bâtiments (de préférence la station Météo-France retenue par OPERAT)',
            minimum: 0,
            canEntityBeCreated: false,
        },
    },
};
