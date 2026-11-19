import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getNumericProp, getMultiAttributeProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

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
            title: 'Type de fluide',
            enum: ['Eau', 'Gaz', 'Electricité'],
        }),
    },
    index: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({ title: "Valeur d'index", canSetObservedAt: true }),
            formLabel: 'Index',
            subProps: [
                ['meterReading', getEnumProp({ title: 'Type de relevé', enum: ['measured', 'estimated'] })],
                ['providedBy', getEnumProp({ title: 'Fourni par', enum: ['distributor', 'supplier'] })],
            ],
        }),
    },
    isObserving: {
        type: 'Relationship',
        object: 'urn:ngsi-ld:Building:Template',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'string',
                format: 'uri',
                title: "Est en train d'observer",
                listOfAllowedRelationships: ['urn:ngsi-ld:Building:Template', 'urn:ngsi-ld:Site:Template'],
            },
        },
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Point de livraison',
            required: ['name', 'deliveryPointNumber', 'fluidType', 'isObserving'],
            description: `Point de livraison regroupant le type d'énergie, les données du distributeur et celles du fournisseur.`,
            minimum: 0,
            identifier: 'deliveryPointNumber',
        },
    },
};
