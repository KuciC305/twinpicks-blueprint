import { StellioTemplate } from 'src/interfaces';
import {
    getGeoPropertyProp,
    getJsonPropertyProp,
    getMultiRelationshipProp,
    getNumericProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'Building';

/**
 * Light version of the Building: what the performance dashboard reads. Same attribute names as
 * building-management, so that a building created there is the same entity.
 */
export const BuildingTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du bâtiment', friendlyAttributeName: 'Nom' }),
    },
    floorArea: {
        ...getNumericProp({ title: 'Surface de plancher (m²)', minimum: 0 }, 'MTK'),
    },
    height: {
        ...getNumericProp({ title: 'Hauteur du bâtiment (m)', minimum: 0 }, 'MTR'),
    },
    hasWeatherInformation: {
        ...getRelationshipProp({
            formLabel: 'Station météo (DJU)',
            targetTemplateObjectId: 'urn:ngsi-ld:WeatherInformation:Template',
        }),
    },
    hasUsage: {
        ...getMultiRelationshipProp({
            formLabel: 'Utilisation du bâtiment',
            formLabelPerItem: "Choisir un type d'usage",
            listOfAllowedRelationships: ['urn:ngsi-ld:Usage:Template'],
        }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: 'Appartient au site',
            targetTemplateObjectId: 'urn:ngsi-ld:Site:Template',
        }),
    },
    // Selected on the map: the footprint of the Référentiel National des Bâtiments
    location: {
        ...getGeoPropertyProp({
            formLabel: 'Sélectionner le bâtiment sur la carte',
            geometryType: 'Polygon',
        }),
    },
    // Filled by the map selection: identifier and data of the selected building, read by other dashboards (DPE)
    rnb: {
        ...getJsonPropertyProp({ formLabel: 'Référentiel National des Bâtiments', canSelfInit: true }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Bâtiment',
            required: ['name', 'location'],
            minimum: 0,
            description:
                'Bâtiment du patrimoine. Surface et station météo servent à normaliser les consommations, le contour à le placer sur la carte.',
        },
    },
};
