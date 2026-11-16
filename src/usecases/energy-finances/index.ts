import { OrganizationTemplate } from './organization';
import { DeliveryPointTemplate } from './deliveryPoint';
import { FrameworkContractTemplate } from './frameworkContract';
import { LotTemplate } from './lot';
import { BillingAccountTemplate } from './billingAccount';
import { ContractTemplate } from './contract';
import { InvoiceTemplate } from './invoice';
import { InvoiceDetailTemplate } from './invoiceDetail';

import { generateBlueprintFile } from '../../utils';

const blueprint = [
    OrganizationTemplate,
    DeliveryPointTemplate,
    FrameworkContractTemplate,
    LotTemplate,
    BillingAccountTemplate,
    ContractTemplate,
    InvoiceTemplate,
    InvoiceDetailTemplate,
];

const usecasePathName = __dirname.split(/dist[\\/]/)[1];

generateBlueprintFile(blueprint, usecasePathName);
