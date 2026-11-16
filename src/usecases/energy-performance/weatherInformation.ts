import { StellioTemplate } from 'src/interfaces';
import { getGeoPropertyProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'WeatherInformation';

/**
 * Weather station whose temperatures give the degree days of the buildings that point to it.
 * Temperatures come from ingestion: daily `temperature` instances, one datasetId per statistic
 * (`urn:ngsi-ld:Dataset:{source}:temperatureMin:P1D`, `…:temperatureMax:P1D`).
 */
export const WeatherInformationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la station', friendlyAttributeName: 'Nom' }),
    },
    location: {
        ...getGeoPropertyProp({ formLabel: 'Position de la station', geometryType: 'Point' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Station météo',
            required: ['name'],
            minimum: 0,
            description: 'Station météo dont les températures donnent les degrés-jours (DJU) des bâtiments rattachés.',
        },
    },
};
