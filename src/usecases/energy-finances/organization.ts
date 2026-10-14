import { StellioTemplate } from 'src/interfaces';
import { getEnumProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Organization';

/** One type for every party (D12), the role is a property and the relationship name. */
export const OrganizationTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de l'organisation", friendlyAttributeName: 'Nom' }),
    },
    roles: {
        ...getEnumProp({
            title: 'Rôles',
            enum: ['supplier', 'distributor', 'client', 'buyer'],
            allowMultiple: true,
        }),
    },
    siren: {
        ...getSimpleTextProp({ title: 'SIREN', pattern: '^[0-9]{9}$' }),
    },
    siret: {
        ...getSimpleTextProp({ title: 'SIRET', pattern: '^[0-9]{14}$' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Organisation',
            required: ['name', 'roles'],
            description:
                'Fournisseur, distributeur, client ou acheteur (groupement de commandes). Une même organisation peut avoir plusieurs rôles.',
            minimum: 0,
        },
    },
};
