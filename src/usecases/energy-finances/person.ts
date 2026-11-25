import { StellioTemplate } from 'src/interfaces';
import { getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Person';

/** Individual a contract is re-billed to: an employee, a housing occupant (D37) */
export const PersonTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom', friendlyAttributeName: 'Nom' }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Personne',
            required: ['name'],
            description: 'Personne physique à qui des consommations sont refacturées.',
            minimum: 0,
        },
    },
};
