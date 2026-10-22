import { StellioTemplate } from 'src/interfaces';
import {
    getDateProp,
    getEnumProp,
    getIntegerProp,
    getMultiAttributeProp,
    getRelationshipProp,
    getSimpleTextProp,
} from '../../utils/blueprintHelpers';

const entityType = 'EnergyDeclaration';

export const EnergyDeclarationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom de la déclaration', friendlyAttributeName: 'Nom' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment déclaré',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    declarationYear: {
        ...getIntegerProp({ title: 'Année des consommations déclarées', minimum: 2010 }),
    },
    declaredFloorArea: {
        ...getIntegerProp({ title: 'Surface déclarée (m²)', minimum: 0 }, 'MTK'),
    },
    consumptions: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getIntegerProp({
                title: "Quantité consommée, dans l'unité de l'énergie (kWh, kg, litres, m³ ou stères)",
                minimum: 0,
            }),
            formLabel: 'Consommations par énergie',
            subProps: [
                [
                    'energyType',
                    getEnumProp({
                        title: 'Énergie',
                        enum: [
                            'electricity',
                            'naturalGas',
                            'liquefiedNaturalGas',
                            'propaneKg',
                            'propaneM3',
                            'butaneKg',
                            'butaneM3',
                            'heatingOil',
                            'coalBriquettes',
                            'hardCoal',
                            'woodIndustrialChips',
                            'woodForestChips',
                            'woodPellets',
                            'woodLogs',
                            'districtHeating',
                            'districtCooling',
                            'nonRoadDiesel',
                        ],
                    }),
                ],
                [
                    'distribution',
                    getEnumProp({
                        title: 'Répartition (individual : individuelle, distributed : répartie, common : parties communes)',
                        enum: ['individual', 'distributed', 'common'],
                    }),
                ],
                ['heatingQuantity', getIntegerProp({ title: 'Dont chauffage', minimum: 0 })],
                ['coolingQuantity', getIntegerProp({ title: 'Dont refroidissement', minimum: 0 })],
            ],
        }),
    },
    evChargingPoints: {
        ...getIntegerProp({ title: 'Nombre de bornes de recharge de véhicules électriques', minimum: 0 }),
    },
    evChargingConsumption: {
        ...getIntegerProp(
            { title: "Consommation d'électricité des bornes de recharge (IRVE, kWh)", minimum: 0 },
            'KWH'
        ),
    },
    usageIndicators: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: getIntegerProp({ title: "Valeur de l'indicateur", minimum: 0 }),
            formLabel: "Indicateurs d'intensité d'usage OPERAT",
            subProps: [
                ['indicator', getSimpleTextProp({ title: "Code de l'indicateur (NB_H_OUVREES, T_OCC…)" })],
                [
                    'subCategory',
                    getSimpleTextProp({
                        title: "Sous-catégorie d'activité concernée (SCAP…, facultative pour une seule activité)",
                    }),
                ],
            ],
        }),
    },
    adjustedConsumption: {
        ...getIntegerProp({ title: 'Consommation ajustée climat et activité (kWh)', minimum: 0 }, 'KWH'),
    },
    dataSource: {
        ...getEnumProp({
            title: 'Sources des données (meters : compteurs Stellio, invoices : factures, manual : saisie manuelle)',
            enum: ['meters', 'invoices', 'manual'],
            allowMultiple: true,
        }),
    },
    transmissionStatus: {
        ...getEnumProp({
            title: 'Statut de transmission OPERAT',
            enum: ['draft', 'readyToSend', 'sent', 'accepted', 'rejected'],
        }),
    },
    transmittedAt: {
        ...getDateProp({ title: 'Date de transmission' }),
    },
    validationMessage: {
        ...getSimpleTextProp({ title: 'Retour de validation OPERAT' }),
    },
    certificateUrl: {
        ...getSimpleTextProp({ title: "Lien vers l'attestation OPERAT" }),
    },
    operatDeclarationId: {
        ...getIntegerProp({
            title: 'Identifiant de la déclaration dans OPERAT (renseigné par la soumission API)',
            minimum: 1,
        }),
    },
    operatStatus: {
        ...getEnumProp({
            title: 'Statut de la déclaration dans OPERAT (A_COMPLETER : à compléter, PRETE_A_VALIDER : prête à valider, VALIDEE : validée)',
            enum: ['A_COMPLETER', 'PRETE_A_VALIDER', 'VALIDEE'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Déclaration annuelle OPERAT',
            required: ['name', 'refBuilding', 'declarationYear', 'transmissionStatus'],
            minimum: 0,
            description:
                "Consommations annuelles d'un bâtiment par énergie et par répartition, indicateurs d'intensité d'usage et suivi de leur transmission à la plateforme OPERAT.",
        },
    },
};
