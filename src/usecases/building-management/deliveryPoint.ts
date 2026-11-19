import { StellioTemplate } from 'src/interfaces';
import {
    getEnumProp,
    getMultiAttributeProp,
    getSimpleTextProp,
    getRelationshipProp,
    getNumericProp,
} from '../../utils/blueprintHelpers';

const entityType = 'DeliveryPoint';

export const DeliveryPointTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du point de livraison', friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    deliveryPointNumber: {
        ...getSimpleTextProp({ title: 'Identifiant du point de livraison' }),
    },
    fluidType: {
        ...getEnumProp({
            title: 'Type de fluide (electricity : électricité ; gas : gaz ; water : eau)',
            enum: ['electricity', 'gas', 'water'],
        }),
    },
    index: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({
                title: "Valeur d'index cumulée (énergie, volume d'eau ou de gaz ; unité selon unitCode)",
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Index',
            subProps: [
                [
                    'meterReading',
                    getEnumProp({
                        title: 'Type de relevé (measured : mesuré ; estimated : estimé)',
                        enum: ['measured', 'estimated'],
                    }),
                ],
                [
                    'providedBy',
                    getEnumProp({
                        title: 'Fourni par (distributor : distributeur ; supplier : fournisseur)',
                        enum: ['distributor', 'supplier'],
                    }),
                ],
            ],
        }),
    },
    // Measured by the distributor (Enedis, GRDF…), one datasetId per series, as read by the energy
    // finances and sub-metering dashboards, e.g. urn:ngsi-ld:Dataset:Enedis:energy:P1D (energy of each
    // day) and urn:ngsi-ld:Dataset:Enedis:maxPower:P1D (maximum power of each day)
    consumption: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({
                title: 'Énergie, volume d’eau ou de gaz consommé sur la période (unité selon unitCode)',
                schemaType: 'number',
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Consommations par période (compteurs sans index, ex. Linky)',
        }),
    },
    maxPower: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({
                title: 'Puissance maximale atteinte sur la période (unité selon unitCode)',
                schemaType: 'number',
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Puissances maximales par période',
        }),
    },
    controlledAsset: {
        ...getRelationshipProp({
            formLabel: 'Actif contrôlé',
            // The graph of the blueprint draws the link to the building, the form also accepts a site
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
            listOfAllowedRelationships: ['urn:ngsi-ld:Building:Template', 'urn:ngsi-ld:Site:Template'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Point de livraison',
            required: ['name', 'deliveryPointNumber', 'fluidType', 'controlledAsset'],
            description: `Point de livraison regroupant le type d'énergie, les données du distributeur et celles du fournisseur.`,
            minimum: 0,
            identifier: 'deliveryPointNumber',
        },
    },
};
