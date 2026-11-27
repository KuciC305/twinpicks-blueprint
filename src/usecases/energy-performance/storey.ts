import { StellioTemplate } from 'src/interfaces';
import { getNumericProp, getRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Storey';

export const StoreyTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: 'Nom', friendlyAttributeName: 'Nom' }),
    },
    // Without a height on the building, the top of its highest storey gives it
    elevation: {
        ...getNumericProp({ title: 'Altitude du sol (m, relative au rez-de-chaussée)' }, 'MTR'),
    },
    height: {
        ...getNumericProp({ title: 'Hauteur sous plafond (m)' }, 'MTR'),
    },
    isPartOf: {
        ...getRelationshipProp({
            formLabel: 'Appartient au bâtiment',
            targetTemplateObjectId: 'urn:ngsi-ld:Building:Template',
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Niveau',
            required: ['name', 'isPartOf'],
            minimum: 0,
            description: "Facultatif. Étage d'un bâtiment : donne sa hauteur sur la carte et rattache ses espaces.",
        },
    },
};
