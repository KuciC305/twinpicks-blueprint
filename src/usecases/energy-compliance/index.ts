import { SiteTemplate } from './site';
import { BuildingTemplate } from './building';
import { RegulatoryQualificationTemplate } from './regulatoryQualification';
import { EnergyDeclarationTemplate } from './energyDeclaration';
import { BuildingAutomationSystemTemplate } from './buildingAutomationSystem';
import { ComplianceEvidenceTemplate } from './complianceEvidence';
import { DeliveryPointTemplate } from './deliveryPoint';
import { OperatStructureTemplate } from './operatStructure';
import { OperatAccountTemplate } from './operatAccount';
import { TechnicalFileTemplate } from './technicalFile';

import { generateBlueprintFile } from '../../utils';

const blueprint = [
    SiteTemplate,
    BuildingTemplate,
    RegulatoryQualificationTemplate,
    EnergyDeclarationTemplate,
    BuildingAutomationSystemTemplate,
    ComplianceEvidenceTemplate,
    DeliveryPointTemplate,
    OperatStructureTemplate,
    OperatAccountTemplate,
    TechnicalFileTemplate,
];

const usecasePathName = __dirname.split(/dist[\\/]/)[1];

generateBlueprintFile(blueprint, usecasePathName);
