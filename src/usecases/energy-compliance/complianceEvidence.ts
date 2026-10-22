import { StellioTemplate } from 'src/interfaces';
import { getDateProp, getEnumProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'ComplianceEvidence';

export const ComplianceEvidenceTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du justificatif', friendlyAttributeName: 'Nom' }),
    },
    refBuilding: {
        ...getRelationshipProp({
            formLabel: 'Bâtiment concerné',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    regulation: {
        ...getEnumProp({
            title: 'Réglementation (tertiaryDecree : décret tertiaire, bacs : décret BACS, dpe : DPE)',
            enum: ['tertiaryDecree', 'bacs', 'dpe'],
        }),
    },
    evidenceType: {
        ...getEnumProp({
            title: 'Type de justificatif',
            enum: [
                'bacsInspectionReport',
                'bacsExemptionCertificate',
                'efficiencyAudit',
                'operatCertificate',
                'dpeReport',
                'other',
            ],
        }),
    },
    issuedAt: {
        ...getDateProp({ title: "Date d'émission" }),
    },
    validUntil: {
        ...getDateProp({ title: 'Date de fin de validité' }),
    },
    documentUrl: {
        ...getSimpleTextProp({ title: 'Lien vers le document' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Justificatif réglementaire',
            required: ['name', 'refBuilding', 'regulation', 'evidenceType'],
            minimum: 0,
            description:
                "Preuve archivée de la conformité d'un bâtiment : compte-rendu d'inspection, certificat d'exemption, audit, attestation, DPE.",
        },
    },
};
