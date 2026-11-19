import { StellioTemplate } from 'src/interfaces';
import {
    getBooleanProp,
    getEnumProp,
    getNumericProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'EnergyTarget';

/**
 * Consumption target of a building, all energies: a reduction compared with a reference year
 * and/or an absolute intensity. `targetSource` = `tertiaryDecree` marks the targets the
 * Conformité use case will own (to connect with RegulatoryQualification later).
 */
export const EnergyTargetTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de l'objectif", friendlyAttributeName: 'Nom' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment concerné',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    targetSource: {
        ...getEnumProp({ title: "Origine de l'objectif", enum: ['internal', 'tertiaryDecree'] }),
    },
    referenceYear: {
        ...getNumericProp({ title: 'Année de référence', minimum: 2010, maximum: 2100 }),
    },
    targetYear: {
        ...getNumericProp({ title: 'Année cible', minimum: 2010, maximum: 2100 }),
    },
    reductionPercent: {
        ...getNumericProp(
            { title: "Réduction visée par rapport à l'année de référence (%)", minimum: 0, maximum: 100 },
            'P1'
        ),
    },
    absoluteTarget: {
        ...getNumericProp({ title: 'Objectif en valeur absolue (kWh/m²/an)', minimum: 0 }),
    },
    climateAdjusted: {
        ...getBooleanProp({ title: 'Comparer à la consommation corrigée du climat (DJU)' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Objectif de consommation',
            required: ['name', 'refBuilding', 'referenceYear', 'targetYear'],
            minimum: 0,
            description:
                "Objectif de consommation d'un bâtiment (toutes énergies) : réduction par rapport à une année de référence et/ou intensité maximale.",
        },
    },
};
