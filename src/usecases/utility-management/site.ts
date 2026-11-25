import { StellioTemplate } from 'src/interfaces';
import { getMultiRelationshipProp, getSimpleTextProp } from '../../utils/blueprintHelpers';

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
    hasPart: {
        ...getMultiRelationshipProp({
            formLabel: 'Bâtiments du site',
            formLabelPerItem: 'Sélectionner un bâtiment',
            listOfAllowedRelationships: ['urn:ngsi-ld:Building:Template'],
            minimum: 0,
        }),
    },
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: entityType,
            title: 'Site',
            required: ['name'],
            description: 'Site de consommation regroupant un ou plusieurs bâtiments ou assets.',
            minimum: 0,
            identifier: 'name',
        },
    },
};
