# What is a blueprint ?
A blueprint is a global definition of a specific use case type. It is following an NGSI-LD data model of a specific use case type, to allow a Twin·Picks user to easily create one or several instances of said use case type, by simply following steps and enter data required information through dynamically generated forms.

# How to create a new blueprint

1. If you don't have it, install node (https://github.com/nvm-sh/nvm or for windows https://github.com/coreybutler/nvm-windows) and use version 24+
1. Clone repository `git clone https://github.com/easy-global-market/twinpicks-blueprint.git`
1. Do `npm install` 
    if any errors occured try:
    `npm audit fix`
1. Create a new directory in `/src/usecases/[NEW_USECASE_TYPE]`
    - Create a new file for each new defined entity type
        - See the next section for more information on how to define an entity type
    - Create a file named `index.ts` where each file/entity are imported to generate the blueprint. You can copy/paste the content from another existing `[NEW_USECASE_TYPE]/index.ts` file as an example.
1. Once ready, use this command `npx tsc` to transpile the code
1. cd to `/dist/usecases/[USECASE_TYPE]`
1. Use this command `node ./index.js` to generate the final blueprint
1. Find the json output of final blueprint in `/src/usecases/[USECASE_TYPE]/blueprint.json` file
1. Do a merge request with all your changes including the generated blueprint.json file.

# How to define entity types within the blueprint

- Each entity is define by a "Template" and has its own file within `/src/usecases/[NEW_USECASE_TYPE]`
- Then each file must export a "Template" entity. The next section describes helper functions that generate the same structure more easily (recommended). Consider for example the description of an entity of type "ParkingSpot" in the "Template" below:
    ```js
    const parkingSpotTemplate: StellioTemplate = {
        id: `urn:ngsi-ld:ParkingSpot:Template`,
        type: 'Template',
        name: {
            type: 'Property',
            value: 'Placeholder',
            jsonSchema: {
                type: 'Property',
                value: {
                    schemaType: 'string',
                    title: 'Name of the placce',
                    friendlyAttributeName: 'Name',
                },
            },
        },
        location: {
            type: 'GeoProperty',
            value: {
                type: 'Point',
                coordinates: [],
            },
            jsonSchema: {
                type: 'Property',
                value: {
                    schemaType: 'object',
                    title: 'Point the center of the place on the map',
                    friendlyAttributeName: 'Localisation',
                },
            },
        },
        isOccupied: {
            type: 'Property',
            value: false,
            jsonSchema: {
                type: 'Property',
                value: {
                    schemaType: 'boolean',
                    canSelfInit: true,
                    friendlyAttributeName: "Occupation status",
                },
            },
        },
        jsonSchema: {
            type: 'Property',
            value: {
                schemaType: "ParkingSpot",
                title: "Parking Spot",
                minimum: 1,
                required: ['name', 'location'],
                description: `This represents a parking spot`,
            },
        },
    };
    ```
    - As you can see in the above example, the information required to define a "ParkingSpot" entity type must be placed in the value object of the "jsonSchema" property. There are two supported levels for the "jsonSchema" property:
        - **Entity level** (`EntityLevelJsonSchema`) — high level information such as:
            - `schemaType`: the NGSI-LD entity type name (e.g. `"ParkingSpot"`)
            - `minimum` / `maximum`: limits on the number of entities of this type (to be created through Twin·Picks)
            - `required`: properties the user must fill before creating an entity of this type
            - `title`, `description`, `canEntityBeCreated`, `identifier`, …
        - **Property level** (`PropertyLevelJsonSchema`) — defines how Twin·Picks renders each attribute input:
            - `schemaType`: the value type — `"string"`, `"integer"`, `"number"`, `"boolean"`, `"date"`, `"enum"`, `"array"`, `"object"`, `"json"`
            - `title`: label displayed to the user
            - `friendlyAttributeName`: friendlier version of the attribute name
            - `canSelfInit`, `canBeEdited`, `order`, …
            - When `schemaType` is `"enum"`, the `enum` array is **required** (list of allowed string or number values). Use `allowMultiple: true` to allow several selections.
    - Sub attributes can also be defined with their own "jsonSchema" values
    - A simple relationship would be defined like this:
        ```json
        {
            "hasPart": {
                "type": "Relationship",
                "object": "urn:ngsi-ld:ParkingSpot:Template",
                "jsonSchema": {
                    "type": "Property",
                    "value": {
                        "schemaType": "string",
                        "title": "Which place is related?",
                        "friendlyAttributeName": "Related place"
                    }
                }
            }
        }
        ```
        > 📒 **Note:** The `object` id of the relationship must target a real Template id from the use case. 
    - Multi-attributes can be defined using the 'array' schemaType. See example below for a multi relationships attribute:
        ```json
        {
            "hasPart": {
                "type": "Relationship",
                "object": "urn:ngsi-ld:ParkingSpot:Template",
                "jsonSchema": {
                    "type": "Property",
                    "value": {
                        "schemaType": "array",
                        "title": "Which places are part of the group?",
                        "friendlyAttributeName": "Group of places",
                        "minItems": 2,
                        "items": {
                            "type": "Relationship",
                            "object": "urn:ngsi-ld:ParkingSpot:Template",
                            "jsonSchema": {
                                "type": "Property",
                                "value": {
                                    "schemaType": "string",
                                    "title": "Select a place"
                                }
                            }
                        }
                    }
                }
            }
        }
        ```
        - For multi attributes, the datasets definition must be placed under `items`

    >💡 **Tip:** See the full TypeScript documentation of supported jsonSchema options in `/src/interfaces/jsonSchema.ts`. Property-level and entity-level schemas are typed separately (`PropertyLevelJsonSchema` and `EntityLevelJsonSchema`).

# Using helper functions (recommended)

Helper functions in `/src/utils/blueprintHelpers.ts` generate the NGSI-LD property / relationship / geo-property boilerplate for you. They are **recommended** to make blueprint creation easier and more consistent, but they are **not mandatory** — you can still write templates by hand as in the examples above.

Import them from a template file like this:

```js
import {
    getSimpleTextProp,
    getEnumProp,
    getNumericProp,
    getBooleanProp,
    getDateProp,
    getGeoPropertyProp,
    getRelationshipProp,
    getMultiRelationshipProp,
    getMultiAttributeProp,
} from '../../utils/blueprintHelpers';
```

Then spread the result onto each attribute of the `StellioTemplate`:

```js
name: {
    ...getSimpleTextProp({ title: 'Name of the place', friendlyAttributeName: 'Name' }),
},
location: {
    ...getGeoPropertyProp('Point the center of the place on the map', 'Point'),
},
```

Most helpers accept extra `jsonSchema` options (`friendlyAttributeName`, `canSelfInit`, `canBeEdited`, …) via the remaining object fields. Those are forwarded into the generated schema. Each helper is typed to accept only the fields relevant to the schema variant it produces.

> 📒 **Note:** Each helper call increments a shared `order` counter, so input fields appear in Twin·Picks in the same order as they are declared in the template file.

## Available helpers

- **`getSimpleTextProp({ title, ...rest })`** — string Property.
    ```js
    name: {
        ...getSimpleTextProp({ title: 'Name of the place', friendlyAttributeName: 'Name' }),
    },
    ```
- **`getEnumProp({ title, enum, allowMultiple, ...rest })`** — enum Property (`schemaType: 'enum'`). The `enum` array is required. Set `allowMultiple: true` to let the user pick several values.
    ```js
    status: {
        ...getEnumProp({
            title: 'General status',
            enum: ['ok', 'defectiveLamp', 'columnIssue'],
        }),
    },
    ```
- **`getNumericProp({ title, schemaType, minimum, maximum, ...rest }, unitCode?)`** — number Property with optional min/max bounds. `schemaType` is `'integer'` (default) for whole numbers or `'number'` for decimals (amounts, prices, kWh…).
    ```js
    duration: {
        ...getNumericProp({ title: 'Duration (minutes)', minimum: 1, maximum: 120 }),
    },
    unitPrice: {
        ...getNumericProp({ title: 'Unit price', schemaType: 'number', minimum: 0 }, 'EUR'),
    },
    ```
- **`getBooleanProp({ title, ...rest })`** — boolean Property (`schemaType: 'boolean'`, default value `false`).
    ```js
    isOccupied: {
        ...getBooleanProp({ title: 'Occupation status' }),
    },
    ```
- **`getDateProp({ title, dateMode })`** — date Property. `dateMode` defaults to `'date'`; use `'time'` for a time picker.
    ```js
    dateServiceStarted: {
        ...getDateProp({ title: 'Commissioning date' }),
    },
    startTime: {
        ...getDateProp({ title: 'Start time', dateMode: 'time' }),
    },
    ```
- **`getGeoPropertyProp(title, geometryType)`** — GeoProperty. `geometryType` must be one of `'Point'`, `'LineString'`, `'MultiLineString'`, `'Polygon'`, `'MultiPolygon'`.
    ```js
    location: {
        ...getGeoPropertyProp('Geographical representation of the combined sewer', 'LineString'),
    },
    ```
- **`getRelationshipProp(formLabel, targetTemplateObjectId)`** — single Relationship towards another Template in the same use case.
    ```js
    irrigationArea: {
        ...getRelationshipProp("Target irrigation area", 'urn:ngsi-ld:IrrigationArea:Template'),
    },
    ```
- **`getMultiRelationshipProp({ formLabel, formLabelPerItem, targetTemplateObjectId, minimum, maximum })`** — multi Relationship (`schemaType: 'array'`). `formLabel` is the group label; `formLabelPerItem` is the label for each item. Optional `minimum` / `maximum` limit how many relations can be set.
    ```js
    dischargesTo: {
        ...getMultiRelationshipProp({
            formLabel: 'List of rivers that receive flows from the combined sewer',
            formLabelPerItem: 'Select a river',
            targetTemplateObjectId: 'urn:ngsi-ld:River:Template',
        }),
    },
    ```
- **`getMultiAttributeProp({ formLabel, formLabelPerItem, propertySchemaDefinition, subProps })`** — multi Property (`schemaType: 'array'`). `propertySchemaDefinition` is a full property-level schema describing each item (e.g. `{ schemaType: 'string' }` or `{ schemaType: 'enum', enum: [0, 1] }`). `subProps` is an optional list of `[attributeName, helperResult]` pairs for nested sub-attributes on each item.
    ```js
    observation: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: { schemaType: 'string' },
            formLabel: 'Observations',
            formLabelPerItem: 'Enter an observation',
            subProps: [['observationDate', getDateProp({ title: 'Observation date' })]],
        }),
    },
    digitalInput: {
        ...getMultiAttributeProp({
            propertySchemaDefinition: { schemaType: 'enum', enum: [0, 1] },
            formLabel: 'Door open/close status',
            formLabelPerItem: 'Enter door status (0: open, 1: closed)',
        }),
    },
    ```

>💡 **Tip:** See existing use cases such as `/src/usecases/street-lighting` or `/src/usecases/water-management-urbaquantum` for complete templates built with these helpers.

# How to make a blueprint available into Twin·Picks
1. A context needs to be created with all the terms used in the blueprint. See https://github.com/easy-global-market/ngsild-api-data-models
1. Create a UseCaseConfig entity which holds the blueprint JsonProperty
    ```js
    POST "/ngsi-ld/v1/entities"
    ```
    With the following body (example from AirQuality):
    ```json
    {
        "id": "urn:ngsi-ld:UseCaseConfig:AirQuality",
        "type": "UseCaseConfig",
        "name": {
            "type": "Property",
            "value": "Air Quality"
        },
        "description": {
            "type": "Property",
            "value": "An air quality use case pre-configuration with its context and blueprints"
        },
        "imageSource": {
            "type": "Property",
            "value": "airIcon"
        },
        "contextString": {
            "type": "Property",
            "value": "https://easy-global-market.github.io/ngsild-api-data-models/airQuality/jsonld-contexts/airQuality-compound.jsonld"
        },
        "blueprint": {
            "type": "JsonProperty",
            "json": "[COPY_PASTE_THE_JSON_OUTPUT_HERE]"
        },
        "specificAccessPolicy": {
            "type": "Property",
            "value": "AUTH_READ"
        }
    }
    ```
> 📒 **Note:** The `contextString` value must be the direct URL to the context's raw JSON 

That's it!

Twin·Picks' users will be able to instantiate a new use case and create entities based on this Blueprint. 

# How to update a blueprint

You will probably need to frequently update your blueprint (at least at the begining). This is optional, but if you want to make the process smoother, follow instructions below:

Add a `.env` file (see `.env.example` for variables definition). `BLUEPRINT_UPDATE_REALM_CONFIG` is a JSON **array of realms** (credentials, gateway, realm, tenant URN). List each realm once. A single object is still accepted for backward compatibility.

The update command supplies the local blueprint folder, the UseCaseConfig entity id (**which is expected to be the same id in each tenant database**), and the realms to PATCH (comma-separated `realm` values, for example `tenantA,tenantB,tenantC`):

Then adapt the commands below depending on the use case directory name:

- For 'smart-irrigation' blueprint generation:

        ```sh
        npx tsc && cd ./dist/usecases/smart-irrigation && node index.js && cd ../../..
        ```
    
- For 'smart-irrigation' UseCaseConfig entity update (one realm):

        ```sh
        npx tsc && node --env-file=.env ./dist/utils/updateUseCaseConfig.js \
          --directoryName=smart-irrigation \
          --useCaseConfigId=urn:ngsi-ld:UseCaseConfig:SmartIrrigation \
          --realms=egm-showcase
        ```

- For 'smart-irrigation' UseCaseConfig entity update (several realms):

        ```sh
        npx tsc && node --env-file=.env ./dist/utils/updateUseCaseConfig.js \
          --directoryName=smart-irrigation \
          --useCaseConfigId=urn:ngsi-ld:UseCaseConfig:SmartIrrigation \
          --realms=tenantA,tenantB,tenantC
        ```