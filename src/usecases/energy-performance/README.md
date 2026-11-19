# Energy Performance Blueprint

## Overall Description

This use case covers the "Piloter la performance (temps long)" journey of the energy and utilities offer: select a building or a portfolio, compare periods and similar buildings, normalise consumption (weather, surface), identify the buildings to improve, follow an action plan and measure its gains against targets.

It is one of the energy use cases, one per user journey. They share entities (`Building`, `DeliveryPoint`, `Usage`…) but each blueprint only declares what its journey needs.

The blueprint has two purposes, in this order:

1. Describe the entities and properties of the journey, so that the Performance dashboard knows what it deals with.
2. Let a user create action plans and targets by hand, and complete the building data the indicators need.

The target model is `data_model_v2.md` (Energies - Fluides SharePoint folder).

## Model

```text
EnergyAction ── refBuilding ──> Building ── hasWeatherInformation ──> WeatherInformation
     │ refEnergyTarget (0..n)      ^         ── hasUsage ──> Usage, isPartOf ──> Site (building-management)
     v                             │
EnergyTarget ── refBuilding ───────┤
                                   │
                    DeliveryPoint ─┘ controlledAsset (measured consumption, utility-management)
```

| Entity | Role |
|--------|------|
| `Building` | Light version: name, `floorArea` (kWh/m²), `hasWeatherInformation` (degree days). Created with full detail in building-management, same attribute names. |
| `WeatherInformation` | Weather station. Daily `temperature` instances, one `datasetId` per statistic: `urn:ngsi-ld:Dataset:{source}:temperatureMin:P1D` and `…:temperatureMax:P1D`. The dashboard computes the degree days from them. |
| `EnergyAction` | Improvement action on a building: category, status, priority, fluids, start and end dates, cost, estimated saving (kWh/year and/or %). The gain is measured by the dashboard (before `startDate` vs after `endDate`). `refEnergyTarget` (optional, several possible, one instance per target with its `datasetId`) names the targets the action is meant for: the target's action plan. The dashboard also shows, apart, the other actions of the target's building ending in its period. |
| `EnergyTarget` | Building target, all energies: reference year, target year, reduction in % and/or absolute intensity (kWh/m²/year), climate-adjusted or not. `targetSource` = `tertiaryDecree` marks the targets to connect with the Conformité use case later. |

Read, not declared here: `DeliveryPoint` (measured `consumption`, `controlledAsset`), `Usage` and `Site` (portfolio filters). There is no portfolio entity: a portfolio is a filter on site and usage.

Enum values are stable English codes (`lighting`, `inProgress`, `tertiaryDecree`…).

## Identifiers

| Entity | Id |
|--------|----|
| `EnergyAction` | `urn:ngsi-ld:EnergyAction:{uuid}` (typed in the form) |
| `EnergyTarget` | `urn:ngsi-ld:EnergyTarget:{uuid}` |

## Twin Picks limitations

- `schemaType: 'number'` has no input in the Digital Twin form yet: every number of this blueprint is an `integer` (euros, kWh/year, %, m²).

## Open points (data model, to do)

- Which surface: `floorArea` (building-management) vs `tertiaryFloorArea` (Conformité `RegulatoryQualification`).
- Attendance / activity normalisation: not modelled yet.
- `EnergyTarget` vs `RegulatoryQualification.referenceYear` / `absoluteTarget2030`: to connect when the Conformité blueprint is published.
- Where computed results go (normalised consumption, performance score): data model §6.
