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
        ...getSimpleTextProp({ title: 'Nom de la sortie électrique', friendlyAttributeName: 'Nom' }),
    },
    description: {
        ...getSimpleTextProp({ title: 'Description' }),
    },
    deliveryPointNumber: {
        ...getSimpleTextProp({ title: 'Identifiant de la sortie électrique ' }),
    },
    phaseCode: {
        ...getEnumProp({
            title: 'Phasage de la sortie (phase A, B ou C; phase inconnue X; Neutre N) ',
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
                title: "Valeur d'index cumulée (énergie ; unité selon unitCode)",
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Index du sous-compteur (sorties sous-comptées uniquement)',
        }),
    },
    consumption: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getNumericProp({
                title: 'Énergie consommée sur la période (unité selon unitCode)',
                schemaType: 'number',
                canSetObservedAt: true,
                canSetUnitCode: true,
            }),
            formLabel: 'Consommations par période du sous-compteur (sans index)',
        }),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: "Appartient à l'armoire électrique",
            targetTemplateObjectId: 'urn:ngsi-ld:ElectricalCabinet:Template',
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
            title: 'Sortie électrique',
            required: ['name', 'phaseCode', 'isPartOf'],
            description: `Point de sortie électrique, possiblement protégé/contrôlé par d'autres équipements de l'armoire électrique`,
            minimum: 0,
            identifier: 'deliveryPointNumber',
        },
    },
};
