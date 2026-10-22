import { StellioTemplate } from 'src/interfaces';
import { getBooleanProp, getEnumProp, getSimpleTextProp } from '../../utils/blueprintHelpers';
import { OPERAT_STRUCTURE_NATURES } from './operatStructure';

const entityType = 'OperatAccount';

export const OperatAccountTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de famille de l'utilisateur", friendlyAttributeName: 'Nom' }),
    },
    givenName: {
        ...getSimpleTextProp({ title: 'Prénom' }),
    },
    email: {
        ...getSimpleTextProp({ title: 'Courriel (identifiant de connexion à OPERAT)' }),
    },
    telephone: {
        ...getSimpleTextProp({ title: 'Téléphone (10 chiffres)' }),
    },
    profile: {
        ...getEnumProp({
            title: 'Profil (REP_STRUCT : représentant légal, REFERENT, COR_STRUCT : correspondant, GEST_TECH : gestionnaire technique, GEST_IMMO : gestionnaire immobilier, EXPLOITANT, OBSERVATEUR)',
            enum: ['REP_STRUCT', 'REFERENT', 'COR_STRUCT', 'GEST_TECH', 'GEST_IMMO', 'EXPLOITANT', 'OBSERVATEUR'],
        }),
    },
    isMandated: {
        ...getBooleanProp({ title: 'Compte mandaté (utilisateur d’une autre structure que la structure assujettie)' }),
    },
    mandatedStructureNature: {
        ...getEnumProp({ title: 'Nature de la structure mandatée', enum: OPERAT_STRUCTURE_NATURES }),
    },
    mandatedStructureIdentifierType: {
        ...getEnumProp({
            title: "Type d'identifiant de la structure mandatée",
            enum: ['SIRET', 'RNA', 'AUTRE', 'PARTICULIER', 'REF_ETAT'],
        }),
    },
    mandatedStructureOtherIdentifierName: {
        ...getSimpleTextProp({ title: "Nom de l'identifiant de la structure mandatée (type AUTRE)" }),
    },
    mandatedStructureName: {
        ...getSimpleTextProp({ title: 'Nom de la structure mandatée (type AUTRE)' }),
    },
    mandatedStructureIdentifier: {
        ...getSimpleTextProp({ title: 'Identifiant de la structure mandatée' }),
    },
    mandatedStructureAddress: {
        postalCode: {
            ...getSimpleTextProp({ title: 'Code postal' }),
        },
        addressLocality: {
            ...getSimpleTextProp({ title: 'Commune' }),
        },
        extendedAddress: {
            ...getSimpleTextProp({ title: "Complément d'adresse" }),
        },
        ...getSimpleTextProp({ title: 'Adresse de la structure mandatée (numéro et voie)' }),
    },
    hasNewsletterSubscription: {
        ...getBooleanProp({ title: 'Abonnement aux actualités OPERAT' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Compte utilisateur OPERAT',
            required: ['name', 'givenName', 'email', 'profile'],
            minimum: 0,
            description: 'Compte utilisateur à créer sur OPERAT pour la structure assujettie, interne ou mandaté.',
        },
    },
};
