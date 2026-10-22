import { StellioTemplate } from 'src/interfaces';
import {
    getBooleanProp,
    getDateProp,
    getEnumProp,
    getIntegerProp,
    getMultiAttributeProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'RegulatoryQualification';

/** Identifier of a structure in OPERAT: type, name of an "AUTRE" identifier, value */
const getOperatIdentifierProps = (prefix: string, label: string, identifierTypes: string[]) => ({
    [`${prefix}IdentifierType`]: {
        ...getEnumProp({ title: `Type d'identifiant ${label}`, enum: identifierTypes }),
    },
    [`${prefix}OtherIdentifierName`]: {
        ...getSimpleTextProp({ title: `Nom de l'identifiant ${label} (type AUTRE, ou PP pour un particulier)` }),
    },
    [`${prefix}Identifier`]: {
        ...getSimpleTextProp({ title: `Identifiant ${label}` }),
    },
});

export const RegulatoryQualificationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la qualification', friendlyAttributeName: 'Nom' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment qualifié',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    tertiaryFloorArea: {
        ...getIntegerProp({ title: 'Surface de plancher tertiaire (m²)', minimum: 0 }, 'MTK'),
    },
    activityCategory: {
        ...getEnumProp({
            title: "Catégorie d'activité simplifiée (comparaisons du tableau de bord)",
            enum: ['offices', 'education', 'health', 'retail', 'hospitality', 'logistics', 'sport', 'culture', 'other'],
        }),
    },
    occupants: {
        ...getIntegerProp({ title: 'Effectif (personnes)', minimum: 0 }),
    },
    weeklyOpeningHours: {
        ...getIntegerProp({ title: "Heures d'ouverture par semaine", minimum: 0, maximum: 168 }),
    },
    operatId: {
        ...getSimpleTextProp({ title: "Référence OPERAT de l'entité fonctionnelle assujettie (EFA)" }),
    },
    operatSubjectQuality: {
        ...getEnumProp({
            title: "Qualité de l'assujetti (PROP_OCCUPANT : propriétaire occupant, PROP : propriétaire non occupant, PRENEUR_BAIL : preneur à bail ou occupant, COPRO : syndicat de copropriété)",
            enum: ['PROP_OCCUPANT', 'PROP', 'PRENEUR_BAIL', 'COPRO'],
        }),
    },
    operatSubjectCase: {
        ...getEnumProp({
            title: "Cas d'assujettissement (1A : bâtiment tertiaire mono-occupant, 1B : multi-occupant, 2 : parties d'un bâtiment mixte, 3 : ensemble de bâtiments d'un site)",
            enum: ['1A', '1B', '2', '3'],
        }),
    },
    reportingStartMonth: {
        ...getIntegerProp({ title: 'Mois de début de la période de déclaration (1 à 12)', minimum: 1, maximum: 12 }),
    },
    reportingStartDay: {
        ...getIntegerProp({ title: 'Jour de début de la période de déclaration (1 à 31)', minimum: 1, maximum: 31 }),
    },
    isEstablishmentWithoutSiret: {
        ...getBooleanProp({ title: 'Établissement sans SIRET (État, collectivité ou entreprise sans SIRET)' }),
    },
    ...getOperatIdentifierProps('establishment', "de l'établissement assujetti", ['SIRET', 'RNA', 'REF_ETAT', 'AUTRE']),
    ...getOperatIdentifierProps('owner1', 'du propriétaire', ['SIREN', 'RNA', 'REF_ETAT', 'AUTRE']),
    owner1OwnershipStartDate: {
        ...getDateProp({ title: 'Date de début de propriété du propriétaire' }),
    },
    ...getOperatIdentifierProps('owner2', 'du second propriétaire', ['SIREN', 'RNA', 'REF_ETAT', 'AUTRE']),
    owner2OwnershipStartDate: {
        ...getDateProp({ title: 'Date de début de propriété du second propriétaire' }),
    },
    isVacant: {
        ...getBooleanProp({ title: 'Locaux vacants (propriétaire non occupant ou copropriété)' }),
    },
    ...getOperatIdentifierProps('occupant', "de l'occupant", ['SIREN', 'SIRET', 'RNA', 'REF_ETAT', 'AUTRE']),
    occupantName: {
        ...getSimpleTextProp({ title: "Dénomination de l'occupant (établissement sans SIRET)" }),
    },
    ...getOperatIdentifierProps('syndicate', 'du syndicat de copropriété', ['SIRET', 'RNA', 'REF_ETAT', 'AUTRE']),
    ...getOperatIdentifierProps('mandatedProvider', 'du prestataire mandaté', ['SIRET', 'RNA', 'REF_ETAT', 'AUTRE']),
    buildingUnits: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getSimpleTextProp({ title: 'Dénomination du local' }),
            formLabel: "Locaux de l'EFA (identifiant unique bâtimentaire, IUB)",
            subProps: [
                ['cadastralPrefix', getSimpleTextProp({ title: 'Préfixe cadastral' })],
                ['cadastralSection', getSimpleTextProp({ title: 'Section cadastrale' })],
                ['cadastralParcelNumber', getSimpleTextProp({ title: 'Numéro de parcelle' })],
                ['lotNumber', getSimpleTextProp({ title: 'Numéro de lot (0 sans lot)' })],
            ],
        }),
    },
    linkedEfas: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getSimpleTextProp({ title: "Référence OPERAT de l'EFA liée" }),
            formLabel: 'EFA liées (3 au plus)',
            subProps: [['allocatedFloorArea', getIntegerProp({ title: 'Surface allouée (m²)', minimum: 0 }, 'MTK')]],
        }),
    },
    operatActivities: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getSimpleTextProp({
                title: "Code de la sous-catégorie d'activité OPERAT (SCAP…)",
            }),
            formLabel: "Sous-catégories d'activité OPERAT",
            subProps: [
                [
                    'floorArea',
                    getIntegerProp(
                        {
                            title: "Surface de plancher de l'activité (m², facultative pour une seule activité)",
                            minimum: 0,
                        },
                        'MTK'
                    ),
                ],
            ],
        }),
    },
    weatherStation: {
        ...getSimpleTextProp({ title: 'Code Météo-France de la station météo la plus représentative (8 chiffres)' }),
    },
    referenceYear: {
        ...getIntegerProp({ title: 'Année de référence (2010 à 2022)', minimum: 2010, maximum: 2022 }),
    },
    absoluteTarget2030: {
        ...getIntegerProp({ title: 'Objectif 2030 en valeur absolue (kWh/m²/an)', minimum: 0 }),
    },
    deviationJustification: {
        ...getSimpleTextProp({ title: 'Justification des écarts et spécificités du site' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Qualification réglementaire',
            required: ['name', 'refBuilding'],
            minimum: 0,
            description:
                'Entité fonctionnelle assujettie (EFA) au décret tertiaire : surface, activités, effectif, identification OPERAT (assujetti, propriétaires, occupant, locaux), année de référence et objectifs.',
        },
    },
};
