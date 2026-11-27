import { StellioTemplate } from 'src/interfaces';
import { getMultiRelationshipProp, getNumericProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

const entityType = 'Space';

export const SpaceTemplate: StellioTemplate = {
    id: `urn:ngsi-ld:${entityType}:Template`,
    type: 'Template',
    name: {
        ...getSimpleTextProp({ title: `Nom de l'espace`, friendlyAttributeName: 'Nom' }),
    },
    floorArea: {
        ...getNumericProp({ title: 'Surface (m²)' }, 'MTK'),
    },
    isPartOf: {
        ...getMultiRelationshipProp({
            formLabel: "Niveaux de l'espace",
            formLabelPerItem: 'Choisir un niveau',
            listOfAllowedRelationships: ['urn:ngsi-ld:Storey:Template'],
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Espace',
            minimum: 0,
            required: ['name', 'isPartOf'],
            description: 'Facultatif. Espace d’un bâtiment, dont un scénario peut changer la consigne de chauffage.',
        },
    },
};
