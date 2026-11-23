# Building Management Blueprint

## Overall Description

This use case targets building managers who need to monitor building usage and operational performance.

The blueprint aims to consolidate information related to:

- Water, electricity, gas, and other utility consumption, in order to monitor current status and produce regular reports.
- Room and space usage or occupancy, potentially linked to calendar systems.
- Overall building performance, including energy efficiency and occupant comfort.
- Alerts and notifications related to building facilities and equipment.

## Building Model

The building model is based on the W3C Building Topology Ontology (BOT), IFC classes, and SAREF4BLDG.

A `Site`, used as the top-level entity in this blueprint, may contain one or more `Building` entities. Each `Building` may contain `Storey` entities, and each `Storey` may contain `Space` entities.

```text
Site
└── Building
    └── Storey
        └── Space
```

Relationships in the blueprint (NGSI-LD attribute names):

| Entity     | Relationship  | Target           | Notes                                                           |
| ---------- | ------------- | ---------------- | --------------------------------------------------------------- |
| `Site`     | `hasPart`     | `Building`       | One or more buildings per site                                  |
| `Building` | `hasUsage`    | `Usage`          | Uses of the building, chosen among a list of general uses       |
| `Building` | `hasSchedule` | `WeeklySchedule` | Opening hours of the building                                   |
| `Space`    | `hasSchedule` | `WeeklySchedule` | Opening hours of the space: when it is open, so is the building |
| `Storey`   | `isPartOf`    | `Building`       | Floor / level within a building (`level` integer for ordering)  |
| `Space`    | `isPartOf`    | `Storey`         | One or more storeys per space (array relationship)              |

BOT often expresses containment with `bot:hasStorey` / `bot:hasSpace` on the parent. This blueprint uses the inverse `isPartOf` on children (and `Site.hasPart` on the site) as an NGSI-LD-oriented pattern consistent across spatial and electrical entities.

A `Building` may also reference one or more `Usage` entities through `hasUsage`, for example to describe the primary activity of the building (a general use) without duplicating usage definitions on each space.

A `Room` is represented as a particular kind of `Space`. BOT and SAREF4BLDG do not define `Room` as a separate core class, while IFC represents rooms through `IfcSpace` and its attributes or classifications.

> **Compatibility note:** This approach differs from the current `Room` representation used in QAI. The mapping or migration strategy between QAI `Room` entities and blueprint `Space` entities must therefore be defined.

## Utility Networks

The supply network of a site or building is described as a tree of `ConnectivityNode` entities, whatever the fluid (electricity, water, gas, heat). The electricity side follows the IEC Common Information Model (CIM) as the main reference; SAREF may complement it for devices and appliances.

- A `DeliveryPoint` (PDL, PCE, water meter of the distributor…) is the root of the tree.
- A `ConnectivityNode` is a point of the network that may be counted: the input of a cabinet, an output (breaker, pipe), a virtual meter. The link is carried by the node: `ConnectivityNode.isFedBy` → the `DeliveryPoint` or the upstream `ConnectivityNode` that feeds it.
- A `Cabinet` is only the physical box (electrical cabinet, water or gas dispatch…). It carries the location (`isPartOf` → `Space`, and a `location` point) of the nodes it contains (`ConnectivityNode.isPartOf` → `Cabinet`), and no supply link.

```text
DeliveryPoint (PDL)
     ▲
     │ isFedBy
ConnectivityNode "input of cabinet A" ──isPartOf──► Cabinet A ──isPartOf──► Space
     ▲
     │ isFedBy
ConnectivityNode "output A1" ──isPartOf──► Cabinet A      (sub-metered: index / consumption)
     ▲
     │ isFedBy
ConnectivityNode "input of cabinet B" ──isPartOf──► Cabinet B
     ▲          ▲
     │ isFedBy  │ isFedBy
   "B1"       "B2"                                         (isPartOf Cabinet B)
```

Why the link is on the node and not on the cabinet:

- A cabinet fed by "an output of an upstream cabinet" does not say which output: the sub-meters of the downstream cabinet cannot be placed under their meter, and they are subtracted twice from the remainder of the delivery point. With a delivery point of 1000 kWh and an output A1 of 600 kWh feeding a cabinet B whose outputs B1 and B2 are 350 and 200 kWh, subtracting every sub-meter gives 1000 − (600 + 350 + 200) = −150 kWh, whereas only A1 is directly below the delivery point (remainder 1000 − 600 = 400 kWh, and 600 − (350 + 200) = 50 kWh for A1).
- The tree stays the same for water, gas and heat: a garden-hose dispatch is one node for the incoming pipe and N nodes for the outgoing ones, all in the same `Cabinet`.
- Two meters one below the other in the same cabinet are told apart, and a virtual meter (sum or difference of other meters, e.g. a substation) belongs to no cabinet: `isPartOf` is optional.
- Putting the input node inside the cabinet keeps room for equipment between two meters, and each node feeds as many nodes as needed.

The remainder of a node is its own measure minus the measures of the nearest counted nodes below it: a node without `index` nor `consumption` is only crossed, and its children count for the first counted ancestor.

A `ConnectivityNode` may later be connected, through terminals and conducting equipment where appropriate, to an `ACLineSegment` or other components of the electrical network. IEC CIM distinguishes the physical asset view from the connectivity view: `Cabinet` plays the role of the container (`EquipmentContainer`) and `ConnectivityNode` the one of the connectivity node; the links are a useful NGSI-LD simplification, not the complete CIM model.

## Model Alignment

### Storey

The blueprint `Storey` entity is aligned with:

- IFC `IfcBuildingStorey`.
- W3C BOT `bot:Storey`.

### Space

The blueprint `Space` entity is aligned with:

- IFC `IfcSpace`, representing a space, room, or area (`Espace`, `Pièce`, or `Local`).
- SAREF4BLDG `s4bldg:BuildingSpace`.
- W3C BOT `bot:Space`.

Spaces are attached to storeys via `isPartOf`, not directly to the building, so the spatial tree matches BOT’s building → storey → space hierarchy.

### Geometry

`Building.location` is the footprint of the building and `Space.location` the outline of a space (GeoProperty, Polygon, WGS84 coordinates, e.g. from a georeferenced plan). `Storey.elevation` (height of the floor above the ground floor, m) and `Storey.height` (floor to ceiling height, m) stack the storeys. Together they let the dashboard draw the spaces on a map and on a pseudo-3D model; a space without a usable outline is not drawn.

### Utility network

`ConnectivityNode.isFedBy` points to a `DeliveryPoint` or to the upstream `ConnectivityNode`. `ConnectivityNode.isPartOf` (a `Cabinet`) is optional, as is the `phaseCode` (electricity only). `ConnectivityNode.controlledAsset` is what the node feeds (a `Space`, a `Building` or a `Site`), like `DeliveryPoint.controlledAsset` (a `Building`, or a `Site`): the form accepts every allowed target (`listOfAllowedRelationships`), while the graph of the blueprint only draws the main one (`targetTemplateObjectId`: the delivery point for `isFedBy`, the space for the node's `controlledAsset`, the building for the delivery point's one). A node carries a `fluidType` (`electricity`, `gas`, `water`, `heat`), a `serviceDomain` (`heatingCooling`, `ventilation`, `lighting`, `water`, `plugs`, `business`, `production`), a `communicationStatus` (`communicating`, `interrupted`) and the `index` or `consumption` of its meter when it is counted (see below). `Cabinet` replaces the former `ElectricalCabinet`, which carried an `isFedBy` and was electricity only.

### Usage

`Usage.name` is chosen among general uses (`Bureaux`, `Enseignement`, `Commerce`, `Santé`, `Hébergement`, `Logement`, `Restauration`, `Sport et loisirs`, `Culture`, `Laboratoire`, `Industrie et ateliers`, `Entrepôt et logistique`, `Parking`, `Autre`), inspired by the OPERAT activity categories but without their codes: the list is not tied to a French regulation. `description` gives optional details. Thresholds are stored on the `Usage` entity (shared by the buildings of this use). Buildings reference usages through `hasUsage`; spaces do not embed usage types in this version of the blueprint.

`Usage.thresholds` (JsonProperty, `{}` at creation) holds the detection thresholds of the building management dashboard for the buildings of this usage, set from the dashboard "Thresholds" menu. It is partial: a missing threshold keeps its default value, and a building with several usages applies the strictest one. Keys: `co2Watch`, `co2Action` (ppm), `comfortTolerance`, `comfortMin`, `comfortMax` (°C), `closedConsumptionPercent`, `consumptionDriftPercent` (%), `sensorSilentAfterHours` (hours), `deliveryPointSilentAfterDays`, `subMeterSilentAfterDays` (days).

### Opening hours

`Building.hasSchedule` and `Space.hasSchedule` point to a `WeeklySchedule` (`name`, `timeSlots`). Each time slot is an instance of the multi-attribute `timeSlots` with the sub-properties `days` (1 = Monday … 7 = Sunday), `startTime` and `endTime` (HH:mm, local time). Each instance needs its own `datasetId` (e.g. `urn:ngsi-ld:Dataset:timeSlot:1`): the broker refuses several default instances. A building is open as soon as it or one of its spaces is, which the dashboard computes from the union of their slots. The template is the same as the one of the air quality blueprint (`air-quality-monitoring/weeklySchedule.ts`): keep both identical so that the schedules are shared between the dashboards. The former `openingHours` JsonProperty of `Building` and `Space` was removed; the dashboard still reads it on older entities.

### Measures of the meters

`DeliveryPoint` and `ConnectivityNode` (meter) report their readings in one of these multi-attributes, the unit being the `unitCode` of each reading (e.g. `KWH`, `WHR`, `LTR`):

| Attribute     | On                                  | Meaning                                                                                                                                     |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `index`       | `DeliveryPoint`, `ConnectivityNode` | Cumulative index. The building management dashboard prefers it: consumption of a period = difference of index.                              |
| `consumption` | `DeliveryPoint`, `ConnectivityNode` | Energy (or volume) of each period, for meters without index (e.g. Linky `daily_consumption`). The dashboard sums the values of each period. |
| `maxPower`    | `DeliveryPoint`                     | Maximum power of each period. Written for the energy finances dashboard; not read by the building management one.                           |

The `datasetId` names the series, as the energy finances dashboard reads them: `urn:ngsi-ld:Dataset:Enedis:energy:P1D` (daily energy, electricity), `urn:ngsi-ld:Dataset:GRDF:energy:P1D` (gas), `urn:ngsi-ld:Dataset:Enedis:maxPower:P1D` (daily maximum power). A meter must report a given period in a single series: the building management dashboard adds up every series of `consumption`. None of these attributes is required (`required` of the entity).

### WeatherInformation

`Building.hasWeatherInformation` points to a `WeatherInformation` entity (weather station, not created through the blueprint forms) whose outdoor `temperature` is used for the degree days (DJU) and the building timelines. Preferably the Météo-France station used by OPERAT: `operatStationCode` (8 digits) identifies it, and the dashboard uses the one of the department of the building (postal code of its `Site`) when the building has no `hasWeatherInformation`.

## References

### Building

- [W3C Building Topology Ontology (BOT)](https://w3c-lbd-cg.github.io/bot/) — the primary reference for the building topology model. The initial blueprint does not include the generic `bot:Zone` class.
- [BOT tutorial](https://w3c-lbd-cg.github.io/bot/tutorial/) — examples of relationships among sites, buildings, storeys, and spaces.
- [SAREF4BLDG](https://saref.etsi.org/saref4bldg/) — SAREF extension for the building domain.
- [IFC classes](https://bimstandards.fr/data-bim/objets-ifc/).
- [IfcSpace description and 2D/3D views — IFC 2x3](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcproductextension/lexical/ifcspace.htm).
- [IfcSpace documentation — IFC 4.3](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcSpace.htm).
- [IfcSite documentation](https://bim.tech.fr/ifc2x3/IfcSite.html#IfcP).
- [IfcBuilding documentation](https://bim.tech.fr/ifc2x3/IfcBuilding.html#IfcP).
- [IfcBuildingStorey documentation](https://bim.tech.fr/ifc2x3/IfcBuildingStorey.html#IfcP).

#### Note on `bot:Zone`

BOT defines `Site`, `Building`, `Storey`, and `Space` as subclasses of `Zone`. A generic `Zone` can group spatial areas according to a shared criterion. Examples include:

- A category of zones, such as office buildings.
- A specification of zones, such as office buildings with an energy-efficiency rating above A.
- An actual zone, such as the kitchen in a home.

The current blueprint does not yet include `Zone`. Its future representation must be evaluated: it could remain a dedicated entity, be expressed through multiple NGSI-LD types, or be represented by a classification or scope linked through relationships.

### Energy and Electrical Networks

IEC CIM is the main reference for the electricity-network model. SAREF is used to a lesser extent and is probably more relevant for devices and appliances.

- [IEC CIM — Line](https://zepben.github.io/evolve/docs/cim/cim100/TC57CIM/IEC61970/Base/Wires/Line).
- [IEC CIM glossary](https://ontology.tno.nl/IEC_CIM/all-Glossary.html).
- [IEC CIM — ConnectivityNodeContainer](https://ontology.tno.nl/IEC_CIM/cim_ConnectivityNodeContainer.html).

## Model overview

### French

| Entité             | Description courte                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Site               | Ensemble immobilier regroupant un ou plusieurs bâtiments, identifié par son nom et son adresse.                               |
| Building           | Jumeau numérique d’un bâtiment, localisé géographiquement et éventuellement associé au RNB et à plusieurs usages.             |
| Storey             | Niveau ou étage appartenant à un bâtiment.                                                                                    |
| Space              | Espace, pièce ou local rattaché à un ou plusieurs niveaux.                                                                    |
| Usage              | Usage d’un bâtiment, choisi parmi une liste d’usages généraux (nom), avec des seuils de détection optionnels.                 |
| DeliveryPoint      | Point de livraison d’eau, de gaz ou d’électricité, avec ses relevés (index, consommations par période, puissances maximales). |
| Cabinet            | Armoire ou coffret (électrique, eau, gaz…) situé dans un espace, qui localise les points de connexion qu’il contient.          |
| ConnectivityNode   | Point de connexion d’un réseau (entrée ou sortie d’armoire, compteur virtuel), alimenté par un point de livraison ou un autre point, avec ses relevés s’il est compté. |
| WeeklySchedule     | Planning hebdomadaire (créneaux par jours de la semaine), utilisé pour les horaires d’ouverture.                              |
| WeatherInformation | Station météo fournissant la température extérieure (DJU, chronologies), alimentée hors formulaires.                          |

**Relations principales**
Building → Site : un bâtiment isPartOf un site.
Building → Usage : un bâtiment hasUsage un ou plusieurs usages.
Storey → Building : un niveau isPartOf un bâtiment.
Space → Storey : un espace isPartOf un ou plusieurs niveaux.
DeliveryPoint → Site ou Building : un point de livraison a pour controlledAsset le site ou le bâtiment dont il mesure la consommation.
ConnectivityNode → DeliveryPoint ou ConnectivityNode : un point de connexion isFedBy le point de livraison ou le point de connexion amont qui l’alimente (l’entrée d’une armoire aval est alimentée par une sortie de l’armoire amont).
ConnectivityNode → Cabinet : un point de connexion isPartOf l’armoire qui le contient (facultatif : absent pour un compteur virtuel).
ConnectivityNode → Space, Building ou Site : un point de connexion a pour controlledAsset ce qu’il alimente.
Cabinet → Space : une armoire isPartOf l’espace dans lequel elle est installée.
Building → WeeklySchedule, Space → WeeklySchedule : hasSchedule, les horaires d’ouverture (un bâtiment est ouvert dès qu’un de ses espaces l’est).
Building → WeatherInformation : un bâtiment hasWeatherInformation la station météo qui lui sert de référence.

La structure générale est donc : Site → Bâtiment → Niveau → Espace → Armoire → Point de connexion, avec en parallèle les usages et les points de livraison énergétique
