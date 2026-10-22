# Energy Compliance Blueprint

## Overall Description

This use case targets energy managers and regulatory officers who need to check the regulatory
compliance of a building portfolio:

- Buildings subject to the tertiary decree (décret tertiaire, décret n° 2019-771): one use case
  gathers the subject buildings of one legal entity, after which it is named. Quality control of
  the data used for the declarations.
- Reduction targets of the tertiary decree (−40 % in 2030, −50 % in 2040, −60 % in 2050 compared
  with a reference year), declared every year on the OPERAT platform (ADEME).
- Building automation and control systems (BACS decree, décret n° 2020-887 modified by
  n° 2023-259 and n° 2025-1343): mandatory above 290 kW of heating and cooling power since 2025, above 70 kW from 2030.
- DPE labels: the official DPE of each building is read from the BDNB with its RNB id.
- Archiving of the evidences of compliance (inspection reports, certificates, audits).

It does not cover the analysis of real-time overconsumption, the detail of action plans or works,
budgets, or the edition of the building register.

## Model

```text
Site ◄──isPartOf── Building ◄──refBuilding── RegulatoryQualification (EFA of OPERAT)
                      ▲  ▲                    EnergyDeclaration (one per year)
                      │  └──refBuilding────── BuildingAutomationSystem
                      │                       ComplianceEvidence
                      │                       TechnicalFile
                      └──isObserving───────── DeliveryPoint

OperatStructure (one per use case)            OperatAccount
```

The compliance entities point to the building (`refBuilding`) so that the building itself, shared
with other use cases, is never modified by the compliance work. `OperatStructure` is the legal
entity of the use case as declared in OPERAT, and `OperatAccount` the user accounts to create for
it: neither is linked to a building.

The dashboard exports the OPERAT import files from these entities, in the format of the official
templates (Imports CSV of the OPERAT resources): EFA (V6.0), consumptions of a year and of the
reference year (V9.0), technical files (V11.0) and user accounts (V4.9). Multi-attributes hold the
repeated rows: the premises of an EFA (`buildingUnits`, one IUB each), its activity sub-categories
(`operatActivities`, OPERAT `SCAP…` codes), its linked EFAs, and, by declaration, the consumption
of each energy and distribution (`consumptions`) and the usage intensity indicators
(`usageIndicators`).

## Model overview

### French

| Entité                   | Description courte                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Site                     | Site regroupant un ou plusieurs bâtiments.                                                                                                 |
| Building                 | Bâtiment localisé (emprise) et rattaché au RNB ; son DPE est recherché dans la BDNB à partir de l'identifiant RNB.                          |
| RegulatoryQualification  | Entité fonctionnelle assujettie (EFA) au décret tertiaire : surface tertiaire, activités (sous-catégories OPERAT), effectif, heures d'ouverture, référence OPERAT, qualité et cas d'assujettissement, établissement, propriétaires, occupant, locaux (IUB), station météo, année de référence, objectif en valeur absolue, justification des écarts. |
| EnergyDeclaration        | Consommations annuelles par énergie (dans son unité) et par répartition, dont chauffage et refroidissement, recharge des véhicules électriques, indicateurs d'intensité d'usage, consommation ajustée (climat, activité), sources des données et statut de transmission à OPERAT. |
| BuildingAutomationSystem | Système d'automatisation et de contrôle (BACS) : puissance CVC, statut, fonctions présentes, inspections.                                  |
| ComplianceEvidence       | Justificatif archivé : compte-rendu d'inspection, certificat d'exemption, audit, attestation OPERAT, DPE.                                  |
| DeliveryPoint            | Compteur rattaché à un bâtiment ou à un site, source des consommations déclarées.                                                          |
| TechnicalFile            | Dossier technique OPERAT modulant l'objectif 2030 d'une EFA : types de modulation, objectif modulé, porteur, auteurs des études.           |
| OperatStructure          | Structure assujettie (entité juridique du cas d'usage) déclarée sur OPERAT : nature, identifiant, adresse, représentant légal.             |
| OperatAccount            | Compte utilisateur OPERAT de la structure assujettie, interne ou mandaté : identité, profil, structure mandatée.                           |

**Relations principales**
Building → Site : un bâtiment isPartOf un site.
RegulatoryQualification, EnergyDeclaration, BuildingAutomationSystem, ComplianceEvidence, TechnicalFile → Building : refBuilding.
DeliveryPoint → Building ou Site : isObserving.

### Enumerations

Enumerated values are codes, translated by the dashboard:

- `activityCategory`: `offices`, `education`, `health`, `retail`, `hospitality`, `logistics`, `sport`, `culture`, `other`
- `dataSource`: `meters`, `invoices`, `manual`
- `transmissionStatus`: `draft`, `readyToSend`, `sent`, `accepted`, `rejected`
- `bacsStatus`: `toQualify`, `compliant`, `toEquip`, `exempt`
- `automationFunctions`: `regulation`, `scheduling`, `continuousMonitoring`, `benchmarking`, `lossDetection`, `interoperability`, `manualOverride`
  (the last five are required by article R175-3 of the French building code)
- `regulation`: `tertiaryDecree`, `bacs`, `dpe`
- `evidenceType`: `bacsInspectionReport`, `bacsExemptionCertificate`, `efficiencyAudit`, `operatCertificate`, `dpeReport`, `other`
- `consumptions.energyType`: `electricity`, `naturalGas`, `liquefiedNaturalGas`, `propaneKg`, `propaneM3`, `butaneKg`, `butaneM3`,
  `heatingOil`, `coalBriquettes`, `hardCoal`, `woodIndustrialChips`, `woodForestChips`, `woodPellets`, `woodLogs`, `districtHeating`,
  `districtCooling`, `nonRoadDiesel` (the 17 energies of OPERAT, quantities in their unit)
- `consumptions.distribution`: `individual`, `distributed`, `common`

The OPERAT enumerations keep the codes of the OPERAT referentials, written as is in the import
files: `operatSubjectQuality` (`PROP_OCCUPANT`, `PROP`, `PRENEUR_BAIL`, `COPRO`), `operatSubjectCase`
(`1A`, `1B`, `2`, `3`), the identifier types (`SIRET`, `SIREN`, `RNA`, `REF_ETAT`, `AUTRE`,
`PARTICULIER`), `structureNature` (`ET_MINISTERE` … `PROP_COPRO`), `profile` (`REP_STRUCT`,
`REFERENT`, `COR_STRUCT`, `GEST_TECH`, `GEST_IMMO`, `EXPLOITANT`, `OBSERVATEUR`), `holder`
(`PROPRIETAIRE_OCCUPANT`, `PRENEUR_A_BAIL`, `PROPRIETAIRE`) and `operatStatus`, status of a
declaration submitted through the OPERAT API (`A_COMPLETER`, `PRETE_A_VALIDER`, `VALIDEE`).

## Publication

The use case config id is `urn:ngsi-ld:UseCaseConfig:EnergyCompliance`: the Twin Picks dashboard is
selected by this id.

1. Generate the blueprint: `npm run energyCompliance`.
2. Create the `UseCaseConfig` entity once per tenant (see the root README), with
   `"imageSource"` an image URL and `"contextString"` the context of the terms. Until a dedicated
   context is published in `ngsild-api-data-models`, the core context
   `https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context-v1.8.jsonld` can be used, as for
   building management.
3. Then update the blueprint with `npm run energyComplianceUpdate`.

## References

- [Décret tertiaire – OPERAT (ADEME)](https://operat.ademe.fr)
- Décret BACS: articles R175-1 to R175-6 of the French building code (code de la construction et de l'habitation)
- [RNB – Référentiel national des bâtiments](https://rnb.beta.gouv.fr)
- [BDNB – Base de données nationale des bâtiments](https://bdnb.io)
