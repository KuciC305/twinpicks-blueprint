import { StellioTemplate } from 'src/interfaces';
import { getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Site';

export const SiteTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom du site', friendlyAttributeName: 'Nom' }),
    },
    postalAddress: {
        postalCode: {
            ...getSimpleTextProp({ title: 'Code postal' }),
        },
        addressLocality: {
            ...getSimpleTextProp({ title: 'Ville' }),
        },
        addressCountry: {
            ...getSimpleTextProp({ title: 'Pays' }),
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
            minimum: 1,
        },
    },
};
