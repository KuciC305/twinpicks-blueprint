import { StellioTemplate } from 'src/interfaces';
import { getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Site';

export const SiteTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du site', friendlyAttributeName: 'Nom' }),
    },
    // The postal code gives the climate zone of the scenarios
    postalAddress: {
        postalCode: {
            ...getSimpleTextProp({ title: 'Code postal' }),
        },
        ...getSimpleTextProp({ title: 'Adresse postale' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Site',
            required: ['name'],
            description: 'Site regroupant un ou plusieurs bâtiments.',
            minimum: 0,
        },
    },
};
