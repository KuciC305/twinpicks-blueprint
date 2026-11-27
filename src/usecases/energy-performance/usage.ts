import { StellioTemplate } from 'src/interfaces';
import { getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Usage';

export const UsageTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: "Nom de l'usage", friendlyAttributeName: 'Nom' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Usage',
            required: ['name'],
            description: "Usage d'un bâtiment, issu d'une nomenclature de référence.",
            minimum: 0,
        },
    },
};
