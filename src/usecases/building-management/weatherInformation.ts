import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getNumericProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'WeatherInformation';

export const WeatherInformationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la station', friendlyAttributeName: 'Nom' }),
    },
    operatStationCode: {
        ...getSimpleTextProp({
            title: 'Code de la station météo de référence OPERAT (Météo-France, 8 chiffres)',
            pattern: '^[0-9]{8}$',
        }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Position de la station', geometryType: 'Point' }),
    },
    temperature: {
        ...getNumericProp({ title: 'Température extérieure', canSetObservedAt: true, canSelfInit: true }, 'CEL'),
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
