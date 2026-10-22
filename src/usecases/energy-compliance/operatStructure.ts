import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'OperatStructure';

/** Natures of structure of the OPERAT referential */
export const OPERAT_STRUCTURE_NATURES = [
    'ET_MINISTERE',
    'ET_SERVICE',
    'ET_OPERATEUR',
    'CO_REGION',
    'CO_DEPARTEMENT',
    'CO_COMMUNE',
    'CO_OCT',
    'EPCI_METROPOLE',
    'EPCI_URBAINE',
    'EPCI_AGGLO',
    'EPCI_COMMUNE',
    'EPCI_SYNDICAT',
    'ENT_ENTREPRISE',
    'ENT_ASSOCIATION',
    'ENT_LIBERAL',
    'PROP_SOCIETE',
    'PROP_PARTICULIER',
    'PROP_COPRO',
];

export const OperatStructureTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la structure assujettie', friendlyAttributeName: 'Nom' }),
    },
    structureNature: {
        ...getEnumProp({ title: 'Nature de la structure (référentiel OPERAT)', enum: OPERAT_STRUCTURE_NATURES }),
    },
    identifierType: {
        ...getEnumProp({
            title: "Type d'identifiant de la structure",
            enum: ['SIRET', 'RNA', 'AUTRE', 'REF_ETAT', 'PARTICULIER'],
        }),
    },
    otherIdentifierName: {
        ...getSimpleTextProp({ title: "Nom de l'identifiant (type AUTRE : RCS, RPPS…)" }),
    },
    identifier: {
        ...getSimpleTextProp({ title: 'Identifiant de la structure (SIRET du siège, RNA…)' }),
    },
    postalAddress: {
        postalCode: {
            ...getSimpleTextProp({ title: 'Code postal' }),
        },
        addressLocality: {
            ...getSimpleTextProp({ title: 'Commune' }),
        },
        extendedAddress: {
            ...getSimpleTextProp({ title: "Complément d'adresse" }),
        },
        ...getSimpleTextProp({ title: 'Numéro et voie' }),
    },
    legalRepresentativeEmail: {
        ...getSimpleTextProp({ title: 'Courriel du représentant légal' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Structure assujettie OPERAT',
            required: ['name', 'structureNature', 'identifierType', 'identifier'],
            minimum: 0,
            maximum: 1,
            description:
                'Structure assujettie (entité juridique du cas d’usage) telle que déclarée sur OPERAT : son identifiant nomme les fichiers d’import.',
        },
    },
};
