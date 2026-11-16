import {
    PropertyBooleanJsonSchema,
    PropertyDateJsonSchema,
    PropertyEnumJsonSchema,
    PropertyIntegerJsonSchema,
    PropertyLevelJsonSchema,
    PropertyStringJsonSchema,
    PropertyArrayJsonSchema,
    PropertyGeoJsonSchema,
    PropertyJsonJsonSchema,
    PropertyRelationshipJsonSchema,
} from 'src/interfaces/jsonSchema';
import {
    StellioTemplateGeoProp,
    StellioTemplateJsonProp,
    StellioTemplateProp,
    StellioTemplateRelationship,
} from 'src/interfaces';

let order = 0;

type StringWithoutSchemaType = Omit<PropertyStringJsonSchema, 'schemaType'>;
type EnumWithoutSchemaType = Omit<PropertyEnumJsonSchema, 'schemaType'>;
type NumericWithOptionalSchemaType = Omit<PropertyIntegerJsonSchema, 'schemaType'> &
    Partial<Pick<PropertyIntegerJsonSchema, 'schemaType'>>;
type BooleanWithoutSchemaType = Omit<PropertyBooleanJsonSchema, 'schemaType'>;
type DateWithoutSchemaType = Omit<PropertyDateJsonSchema, 'schemaType'>;
type ArrayWithoutSchemaType = Omit<PropertyArrayJsonSchema, 'schemaType'>;
type GeoPropertyWithoutSchemaType = Omit<PropertyGeoJsonSchema, 'schemaType'>;
type JsonPropertyWithoutSchemaType = Omit<PropertyJsonJsonSchema, 'schemaType'>;
type RelationshipWithoutSchemaType = Omit<PropertyRelationshipJsonSchema, 'schemaType'>;

export const getSimpleTextProp = ({ title, ...rest }: StringWithoutSchemaType): StellioTemplateProp => {
    order++;
    return {
        type: 'Property',
        value: title,
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType: 'string',
                title,
                order,
            },
        },
    };
};

export const getEnumProp = ({
    title,
    enum: enumValues,
    allowMultiple,
    ...rest
}: EnumWithoutSchemaType): StellioTemplateProp => {
    order++;
    return {
        type: 'Property',
        value: enumValues?.[0],
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType: 'enum',
                enum: enumValues,
                title: title,
                order: order,
                allowMultiple,
            },
        },
    };
};

/** Number Property: `schemaType` 'integer' (default) for counts, 'number' for decimals (amounts, kWh, prices...) */
export const getNumericProp = (
    { title, schemaType = 'integer', minimum, maximum, ...rest }: NumericWithOptionalSchemaType,
    unitCode?: string
): StellioTemplateProp => {
    order++;
    return {
        type: 'Property',
        value: 0,
        unitCode,
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType,
                minimum: minimum,
                maximum: maximum,
                title: title,
                order: order,
            },
        },
    };
};

export const getBooleanProp = ({ title, ...rest }: BooleanWithoutSchemaType): StellioTemplateProp => {
    order++;
    return {
        type: 'Property',
        value: false,
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType: 'boolean',
                title: title,
                order: order,
            },
        },
    };
};

export const getDateProp = ({ title, dateMode = 'date', ...rest }: DateWithoutSchemaType): StellioTemplateProp => {
    order++;
    return {
        type: 'Property',
        value: new Date(),
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType: 'date',
                title: title,
                order: order,
                dateMode,
            },
        },
    };
};

type GetMultiAttributePropParams = {
    formLabel: string;
    propertySchemaDefinition: StellioTemplateProp | StellioTemplateGeoProp;
    subProps?: [string, StellioTemplateProp][];
};
export const getMultiAttributeProp = ({
    formLabel,
    subProps,
    propertySchemaDefinition,
}: GetMultiAttributePropParams): StellioTemplateProp => {
    order++;
    return {
        ...(subProps ? Object.fromEntries(subProps) : {}),
        type: 'Property',
        value: 'placeholder',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'array',
                title: formLabel,
                order: order,
                items: propertySchemaDefinition,
            },
        },
    };
};

type GetMultiRelationshipPropParams = {
    formLabel: string;
    formLabelPerItem: string;
    targetTemplateObjectId: string;
    minimum?: number;
    maximum?: number;
} & ArrayWithoutSchemaType;
export const getMultiRelationshipProp = ({
    formLabel,
    formLabelPerItem,
    targetTemplateObjectId,
    minimum,
    maximum,
    ...rest
}: GetMultiRelationshipPropParams): StellioTemplateRelationship => {
    order++;
    return {
        type: 'Relationship',
        object: targetTemplateObjectId,
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType: 'array',
                order: order,
                title: formLabel,
                minimum: minimum,
                maximum: maximum,
                items: {
                    type: 'Relationship',
                    object: targetTemplateObjectId,
                    jsonSchema: {
                        type: 'Property',
                        value: {
                            schemaType: 'string',
                            title: formLabelPerItem,
                        },
                    },
                },
            },
        },
    };
};

type GetRelationshipPropParams = {
    formLabel: string;
    targetTemplateObjectId?: string;
    listOfAllowedRelationships?: string[];
} & RelationshipWithoutSchemaType;
export const getRelationshipProp = ({
    formLabel,
    targetTemplateObjectId,
    listOfAllowedRelationships,
    ...rest
}: GetRelationshipPropParams): StellioTemplateRelationship => {
    order++;
    return {
        type: 'Relationship',
        object: targetTemplateObjectId ?? 'urn:ngsi-ld',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'relationship',
                title: formLabel,
                order: order,
                listOfAllowedRelationships,
                ...rest,
            },
        },
    };
};

type GetGeoPropertyPropParams = {
    formLabel: string;
    geometryType: 'Point' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon';
} & GeoPropertyWithoutSchemaType;
export const getGeoPropertyProp = ({
    formLabel,
    geometryType,
    ...rest
}: GetGeoPropertyPropParams): StellioTemplateGeoProp => {
    order++;
    return {
        type: 'GeoProperty',
        value: {
            type: geometryType,
            coordinates: [],
        },
        jsonSchema: {
            type: 'Property',
            value: {
                ...rest,
                schemaType: 'object',
                order: order,
                title: formLabel,
            },
        },
    };
};

type GetJsonPropertyPropParams = {
    formLabel: string;
    json?: object;
} & JsonPropertyWithoutSchemaType;
export const getJsonPropertyProp = ({
    formLabel,
    json,
    ...rest
}: GetJsonPropertyPropParams): StellioTemplateJsonProp => {
    order++;
    return {
        type: 'JsonProperty',
        json: json || '{}',
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: 'json',
                order: order,
                title: formLabel,
                ...rest,
            },
        },
    };
};
