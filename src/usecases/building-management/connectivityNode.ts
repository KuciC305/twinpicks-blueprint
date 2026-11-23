import { StellioTemplate } from 'src/interfaces';
import {
    getEnumProp,
    getNumericProp,
    getMultiAttributeProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'ConnectivityNode';

export const ConnectivityNodeTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du point de connexion', friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    deliveryPointNumber: {
        ...getSimpleTextProp({ title: 'Identifiant du point de connexion' }),
    },
    fluidType: {
        ...getEnumProp({
            title: 'Type de fluide (electricity : électricité ; gas : gaz ; water : eau ; heat : chaleur)',
            enum: ['electricity', 'gas', 'water', 'heat'],
        }),
    },
    phaseCode: {
        ...getEnumProp({
            title: 'Phasage (électricité uniquement ; phase A, B ou C; phase inconnue X; Neutre N) ',
            enum: ['AN', 'BN', 'CN', 'XN', 'ABCN', 'ABN'],
        }),
    },
    serviceDomain: {
        ...getEnumProp({
            title: 'Usage mesuré (heatingCooling : chauffage et climatisation ; ventilation ; lighting : éclairage ; water : eau et ECS ; plugs : prises et usages généraux ; business : activités métier ; production : production locale)',
            enum: ['heatingCooling', 'ventilation', 'lighting', 'water', 'plugs', 'business', 'production'],
        }),
    },
    index: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({
                title: "Valeur d'index cumulée (énergie, volume d'eau ou de gaz ; unité selon unitCode)",
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Index du compteur (points sous-comptés uniquement)',
        }),
    },
    consumption: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({
                title: "Énergie, volume d'eau ou de gaz consommé sur la période (unité selon unitCode)",
                schemaType: 'number',
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Consommations par période du compteur (sans index)',
        }),
    },
    communicationStatus: {
        ...getEnumProp({
            title: 'État de communication du compteur (communicating : transmet ses relevés ; interrupted : ne transmet plus)',
            enum: ['communicating', 'interrupted'],
        }),
    },
    isFedBy: {
        ...getRelationshipProp({
            formLabel: 'Est alimenté par (point de livraison, ou point de connexion amont)',
            // The graph of the blueprint draws the link to the delivery point, the form also accepts a connectivity node
            targetTemplateObjectId: 'urn:ngsi-ld:DeliveryPoint:Template',
            listOfAllowedRelationships: ['urn:ngsi-ld:DeliveryPoint:Template', 'urn:ngsi-ld:ConnectivityNode:Template'],
        }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: "Appartient à l'armoire (absent pour un compteur virtuel)",
            targetTemplateObjectId: 'urn:ngsi-ld:Cabinet:Template',
        }),
    },
    controlledAsset: {
        ...getRelationshipProp({
            formLabel: 'Actif alimenté (local, bâtiment ou site)',
            // The graph of the blueprint draws the link to the space, the form also accepts a building or a site
            targetTemplateObjectId: 'urn:ngsi-ld:Space:Template',
            listOfAllowedRelationships: [
                'urn:ngsi-ld:Space:Template',
                'urn:ngsi-ld:Building:Template',
                'urn:ngsi-ld:Site:Template',
            ],
        }),
    },

    /**
     * Les attributs de mesure (index, consumption, etc.) Doivent être associés aux phases via le datasetId (ex.: "datasetId": "urn:ngsi-ld:Dataset:phase:B"). A vérifier si cela est fait via la connection des capteurs actuels (et homogène pour tous les capteurs) ou si cela doit être défini quelquepart.
     */
    /**
     * La modélisation des éléments de contrôle (ex. une horloge programmable) devra être ajouté
     */
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Point de connexion',
            required: ['name', 'fluidType'],
            description: `Point d'un réseau d'électricité, d'eau, de gaz ou de chaleur (entrée ou sortie d'une armoire, point de dispatch, compteur virtuel…), possiblement compté et possiblement protégé/contrôlé par d'autres équipements de l'armoire`,
            minimum: 0,
            identifier: 'deliveryPointNumber',
        },
    },
};
