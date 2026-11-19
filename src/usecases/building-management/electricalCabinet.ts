import { StellioTemplate } from 'src/interfaces';
import { getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'ElectricalCabinet';

export const ElectricalCabinetTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: `Nom de l'armoire électrique`, friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    electricalCabinetId: {
        ...getSimpleTextProp({ title: `Identifiant de l'armoire électrique` }),
    },
    isFedBy: {
        ...getRelationshipProp({
            formLabel: "Est alimentée par (point de livraison, ou sortie électrique d'une armoire amont)",
            // The graph of the blueprint draws the link to the delivery point, the form also accepts an output
            targetTemplateObjectId: 'urn:ngsi-ld:DeliveryPoint:Template',
            listOfAllowedRelationships: ['urn:ngsi-ld:DeliveryPoint:Template', 'urn:ngsi-ld:ConnectivityNode:Template'],
        }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: "Local dans lequel est située l'armoire électrique",
            targetTemplateObjectId: 'urn:ngsi-ld:Space:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Armoire électrique',
            required: ['name', 'isPartOf'],
            description: `Armoire électrique contenant des sorties électriques`,
            minimum: 0,
            identifier: 'name',
        },
    },
};
