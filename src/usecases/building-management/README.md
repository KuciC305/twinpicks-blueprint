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

| Entity | Relationship | Target | Notes |
|--------|--------------|--------|--------|
| `Site` | `hasPart` | `Building` | One or more buildings per site |
| `Building` | `hasUsage` | `Usage` | Optional classification of building use (nomenclature) |
| `Storey` | `isPartOf` | `Building` | Floor / level within a building (`level` integer for ordering) |
| `Space` | `isPartOf` | `Storey` | One or more storeys per space (array relationship) |

BOT often expresses containment with `bot:hasStorey` / `bot:hasSpace` on the parent. This blueprint uses the inverse `isPartOf` on children (and `Site.hasPart` on the site) as an NGSI-LD-oriented pattern consistent across spatial and electrical entities.

A `Building` may also reference one or more `Usage` entities through `hasUsage`, for example to describe the primary activity or nomenclature code of the building without duplicating usage definitions on each space.

A `Room` is represented as a particular kind of `Space`. BOT and SAREF4BLDG do not define `Room` as a separate core class, while IFC represents rooms through `IfcSpace` and its attributes or classifications.

> **Compatibility note:** This approach differs from the current `Room` representation used in QAI. The mapping or migration strategy between QAI `Room` entities and blueprint `Space` entities must therefore be defined.

## Electricity Network

The initial implementation focuses on the electricity network while remaining as generic as possible so that the approach can later be adapted to water, gas, and other utility networks.

The objective is to describe the delivery tree starting from a `DeliveryPoint`. For electricity networks, the IEC Common Information Model (CIM) is used as the main reference. SAREF may complement this model when representing devices and appliances.

The supply network of a site or building starts with a `DeliveryPoint`, which supplies an `ElectricalCabinet`. The cabinet is located in a `Space` (`ElectricalCabinet.isPartOf` → `Space`) and groups breakers, timers, meters, and related equipment. Electrical outlets are modeled as `ConnectivityNode` entities linked to the cabinet through `ConnectivityNode.isPartOf` → `ElectricalCabinet`.

IEC CIM distinguishes between the physical asset view and the electrical connectivity view. A cabinet may be represented as a physical `AssetContainer`, whereas connectivity is represented through equipment, terminals, and connectivity nodes. Linking `ConnectivityNode` to `ElectricalCabinet` (and optionally onward to `Terminal` or `ACLineSegment`) is a useful NGSI-LD simplification, but it is not a strict inheritance of the complete CIM model.

A more complete approach would introduce an `EquipmentContainer` associated with the `ElectricalCabinet`, with the `EquipmentContainer` containing one or more `ConnectivityNode` entities. This intermediate entity could be introduced later.

For the first version, the following simplified model is retained:

```text
DeliveryPoint (PDL)
        │
        │ isFedBy (parent may be DeliveryPoint or upstream ElectricalCabinet)
        ▼
ElectricalCabinet ──isPartOf──► Space
        ▲
        │ isPartOf
ConnectivityNode (phaseCode: AN, BN, CN, …)
```

A `ConnectivityNode` may later be connected, through terminals and conducting equipment where appropriate, to an `ACLineSegment`, another `ElectricalCabinet`, or other components of the electrical network.

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

### Usage

The `Usage` entity holds nomenclature fields (`code`, `source`, etc.). Buildings reference usages through `hasUsage`; spaces do not embed usage types in this version of the blueprint.

`Usage.thresholds` (JsonProperty, `{}` at creation) holds the detection thresholds of the building management dashboard for the buildings of this usage, set from the dashboard "Thresholds" menu. It is partial: a missing threshold keeps its default value, and a building with several usages applies the strictest one. Keys: `co2Watch`, `co2Action` (ppm), `comfortTolerance`, `comfortMin`, `comfortMax` (°C), `closedConsumptionPercent`, `consumptionDriftPercent` (%), `sensorSilentAfterHours` (hours), `deliveryPointSilentAfterDays`, `subMeterSilentAfterDays` (days).

### WeatherInformation

`Building.hasWeatherInformation` points to a `WeatherInformation` entity (weather station, not created through the blueprint forms) whose outdoor `temperature` is used for the degree days (DJU) and the building timelines. Preferably the Météo-France station used by OPERAT.

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
| Entité            | Description courte                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Site              | Ensemble immobilier regroupant un ou plusieurs bâtiments, identifié par son nom et son adresse.                   |
| Building          | Jumeau numérique d’un bâtiment, localisé géographiquement et éventuellement associé au RNB et à plusieurs usages. |
| Storey            | Niveau ou étage appartenant à un bâtiment.                                                                        |
| Space             | Espace, pièce ou local rattaché à un ou plusieurs niveaux.                                                        |
| Usage             | Type d’utilisation normalisé d’un bâtiment ou d’un équipement, défini par un nom et un code.                      |
| DeliveryPoint     | Point de livraison d’eau, de gaz ou d’électricité, avec ses relevés d’index.                                      |
| ElectricalCabinet | Armoire électrique située dans un espace et alimentée par un point de livraison ou une autre armoire.             |
| ConnectivityNode  | Sortie électrique d’une armoire, caractérisée notamment par son phasage.                                          |
| WeatherInformation | Station météo fournissant la température extérieure (DJU, chronologies), alimentée hors formulaires.             |

**Relations principales**
Building → Site : un bâtiment isPartOf un site.
Building → Usage : un bâtiment hasUsage un ou plusieurs usages.
Storey → Building : un niveau isPartOf un bâtiment.
Space → Storey : un espace isPartOf un ou plusieurs niveaux.
DeliveryPoint → Site ou Building : un point de livraison isObserving le site ou le bâtiment dont il mesure la consommation.
DeliveryPoint → ElectricalCabinet : un point de livraison isFeeding une armoire électrique.
ElectricalCabinet → DeliveryPoint ou ElectricalCabinet : une armoire isFedBy un point de livraison ou une autre armoire.
ElectricalCabinet → Space : une armoire isPartOf l’espace dans lequel elle est installée.
ConnectivityNode → ElectricalCabinet : une sortie électrique isPartOf une armoire.
Building → WeatherInformation : un bâtiment hasWeatherInformation la station météo qui lui sert de référence.

La structure générale est donc : Site → Bâtiment → Niveau → Espace → Armoire électrique → Sortie électrique, avec en parallèle les usages et les points de livraison énergétique
