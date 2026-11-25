import { StellioTemplateGeoProp, StellioTemplateProp, StellioTemplateRelationship } from 'src/interfaces';

/**
 * This JsonSchema type use this gist as a base:
 * https://gist.github.com/michiel/f3883b9d0554779a78b6d1c8d79b4a66
 *
 * It has been modified to match Twin Picks needs
 *
 */

/** Property-level schema types understood by Twin Picks */
export type JsonSchemaPropertyType =
    'string' | 'integer' | 'number' | 'json' | 'array' | 'object' | 'date' | 'boolean' | 'enum';

/**
 * Fields shared across all schema variants
 */
export type JsonSchemaCommon = {
    /**
     * At the entity level: is used to show a friendly title for the entity instead of a NGSI-LD type \
     * At the property level: is used as label for the property input
     */
    title?: string;
    /**
     * At the entity level: is used to show a friendly description of the entity and its purpose \
     * At the property level: has no effects
     */
    description?: string;
};

/**
 * Fields specific to entity-level schemas
 */
export type EntityLevelJsonSchema = JsonSchemaCommon & {
    /**
     * At the entity level: the NGSI-LD entity type name (e.g. "StreetlightControlCabinet").
     */
    schemaType: string;
    /**
     * At the entity level: input fields of properties referenced in the array will have to be filled to create the entity \
     */
    required?: string[];
    /**
     * At the entity level: is used to limit to a specific number of entities before provisioning is allowed \
     */
    maximum?: number;
    /**
     * At the entity level: is used to force a minimum number of entities before provisioning is allowed (1 by default if omitted) \
     */
    minimum?: number;
    /**
     * At the entity level: Decides if an entity can be created in Twin Picks
     *  Default "undefined" value type is considered as "true"
     *  If "false", user will be forced to pick an existing entity \
     * At the property level: has no effects
     */
    canEntityBeCreated?: boolean;
    /**
     * At the entity level: The value of the designated property will be used to create the entity's unique identifier \
     * At the property level: has no effects
     */
    identifier?: string;
};

type JsonSchemaString = JsonSchemaCommon & {
    schemaType: 'string';
    /**
     * At the property level: limit max number of chars
     */
    maxLength?: number;
    /**
     * At the property level: force a minimum number of chars
     */
    minLength?: number;
    /**
     * At the property level: a regex string that the value must conform to
     */
    pattern?: string;
};

type JsonSchemaInteger = JsonSchemaCommon & {
    schemaType: 'number' | 'integer';
    /**
     * At the property level: limit to a minimum value
     */
    minimum?: number;
    /**
     * At the property level: limit to a maximum value
     */
    maximum?: number;
};

type JsonSchemaEnum = JsonSchemaCommon & {
    schemaType: 'enum';
    /**
     * At the property level: restrict the property possible values
     */
    enum: string[] | number[];
    /**
     * At the property level: if true, the property can have multiple values -- false by default
     */
    allowMultiple?: boolean;
};

type JsonSchemaBoolean = JsonSchemaCommon & {
    schemaType: 'boolean';
};

type JsonSchemaDate = JsonSchemaCommon & {
    schemaType: 'date';
    /**
     * At the entity level: has no effects \
     * At the property level: set the date mode
     *  "date" by default, "time" to display the date as a time picker
     */
    dateMode?: 'time' | 'date';
};

type JsonSchemaArray = JsonSchemaCommon & {
    schemaType: 'array';
    /**
     * At the entity level: has no effects \
     * At the property level: allows to define the schema for each item of the array.
     */
    items?: StellioTemplateProp | StellioTemplateGeoProp | StellioTemplateRelationship;
    /**
     * At the entity level: has no effects \
     * At the property level: allows to limit a specific number of items.
     */
    maxItems?: number;
    /**
     * At the entity level: has no effects \
     * At the property level: allows to force a specific number of items.
     */
    minItems?: number;
    /**
     * At the property level: is used to limit to a maximum number of relationships before entity can be created
     */
    maximum?: number;
    /**
     * At the entity level: has no effects \
     * At the property level: is used to force a minimum number of relationships before entity can be created
     */
    minimum?: number;
};

type JsonSchemaObject = JsonSchemaCommon & {
    schemaType: 'object';
};

type JsonSchemaJson = JsonSchemaCommon & {
    schemaType: 'json';
};

type JsonSchemaRelationship = JsonSchemaCommon & {
    schemaType: 'relationship';
    /**
     * When a relationship can be towards more than only one type,
     * Use this array of ids to accept more than one
     * The string id contained in "object" will be ignored
     */
    listOfAllowedRelationships?: string[];
    /**
     * At the entity level: has no effects
     * At the property level: the picker searches the entities of every use case,
     *  not only those of the selected one
     *  Default "undefined" value is considered as "false"
     */
    canSearchAllUseCases?: boolean;
};

export type PropertySchemaVariant =
    | JsonSchemaString
    | JsonSchemaInteger
    | JsonSchemaEnum
    | JsonSchemaBoolean
    | JsonSchemaDate
    | JsonSchemaArray
    | JsonSchemaObject
    | JsonSchemaJson
    | JsonSchemaRelationship;

type JsonSchemaOtherPropertyFields = {
    /**
     * At the property level: show a different attribute name than raw NGSI-LD
     */
    friendlyAttributeName?: string;
    /**
     * At the property level: if true, the prop won't appear in the
     *  guided provisioning form, but Twin Picks will still
     *  create the property with init values
     *  If false or undefined, the prop will have
     *  To be set manually on Twin Picks
     */
    canSelfInit?: boolean;
    /**
     * At the property level: allows to set a date in the observedAt sub core property
     */
    canSetObservedAt?: boolean;
    /**
     * At the property level: allows to set a unitCode
     */
    canSetUnitCode?: boolean;
    /**
     * At the property level: enforce a property permission to be edited (true by default)
     */
    canBeEdited?: boolean;
    /**
     * At the property level: used to order input fields in Twin Picks from top to bottom (1, 2 , 3, ...)
     */
    order?: number;
};

export type PropertyLevelJsonSchema = PropertySchemaVariant & JsonSchemaOtherPropertyFields;

export type PropertyStringJsonSchema = JsonSchemaString & JsonSchemaOtherPropertyFields;
export type PropertyEnumJsonSchema = JsonSchemaEnum & JsonSchemaOtherPropertyFields;
export type PropertyIntegerJsonSchema = JsonSchemaInteger & JsonSchemaOtherPropertyFields;
export type PropertyDateJsonSchema = JsonSchemaDate & JsonSchemaOtherPropertyFields;
export type PropertyBooleanJsonSchema = JsonSchemaBoolean & JsonSchemaOtherPropertyFields;
export type PropertyArrayJsonSchema = JsonSchemaArray & JsonSchemaOtherPropertyFields;
export type PropertyGeoJsonSchema = JsonSchemaObject & JsonSchemaOtherPropertyFields;
export type PropertyJsonJsonSchema = JsonSchemaJson & JsonSchemaOtherPropertyFields;
export type PropertyRelationshipJsonSchema = JsonSchemaRelationship & JsonSchemaOtherPropertyFields;
