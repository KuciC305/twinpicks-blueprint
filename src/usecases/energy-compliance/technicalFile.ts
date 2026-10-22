import { StellioTemplate } from 'src/interfaces';
import {
    getBooleanProp,
    getEnumProp,
    getIntegerProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'TechnicalFile';

export const TechnicalFileTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du dossier technique', friendlyAttributeName: 'Nom' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment concerné',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    technicalFileReference: {
        ...getSimpleTextProp({ title: 'Référence du dossier technique (30 caractères au plus)' }),
    },
    year: {
        ...getIntegerProp({ title: 'Année du dossier technique', minimum: 2020 }),
    },
    modulatedTarget2030: {
        ...getIntegerProp({ title: 'Objectif 2030 en valeur absolue modulé (kWh/m²/an)', minimum: 0 }),
    },
    hasTechnicalModulation: {
        ...getBooleanProp({ title: 'Modulation pour contraintes techniques' }),
    },
    hasArchitecturalModulation: {
        ...getBooleanProp({ title: 'Modulation pour contraintes architecturales ou patrimoniales' }),
    },
    hasEconomicModulation: {
        ...getBooleanProp({ title: 'Modulation pour disproportion économique' }),
    },
    architecturalConstraintType: {
        ...getSimpleTextProp({ title: 'Code du type de contrainte architecturale (CONTRAINTE_ARCHI_…)' }),
    },
    technicalConstraintType: {
        ...getSimpleTextProp({ title: 'Détail de la contrainte technique' }),
    },
    holder: {
        ...getEnumProp({
            title: "Porteur de l'élaboration du dossier",
            enum: ['PROPRIETAIRE_OCCUPANT', 'PRENEUR_A_BAIL', 'PROPRIETAIRE'],
        }),
    },
    energyPerformanceStudySiren: {
        ...getSimpleTextProp({ title: "SIREN de l'auteur de l'étude de performance énergétique et environnementale" }),
    },
    specificUsesStudySiren: {
        ...getSimpleTextProp({ title: "SIREN de l'auteur de l'étude sur les usages spécifiques" }),
    },
    isSamplingStudy: {
        ...getBooleanProp({ title: 'Études énergétiques réalisées par échantillonnage' }),
    },
    technicalNoteSiren: {
        ...getSimpleTextProp({ title: "SIREN de l'auteur de la note technique (modulation technique)" }),
    },
    paybackCalculationSiren: {
        ...getSimpleTextProp({
            title: "SIREN de l'auteur de la note de calcul du temps de retour (modulation économique)",
        }),
    },
    circumstantialOpinionSiren: {
        ...getSimpleTextProp({ title: "SIREN de l'auteur de l'avis circonstancié (modulation architecturale)" }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Dossier technique OPERAT',
            required: ['name', 'refBuilding', 'technicalFileReference', 'year', 'modulatedTarget2030', 'holder'],
            minimum: 0,
            description:
                "Dossier technique justifiant la modulation de l'objectif 2030 d'une EFA (contraintes techniques, architecturales ou disproportion économique).",
        },
    },
};
