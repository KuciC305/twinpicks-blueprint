# Energy Finances Blueprint

## Overall Description

This use case covers the "Gérer les finances" journey of the energy and utilities offer: collect supplier invoices and credit notes, link them to contracts and delivery points, check them, and present the exceptions in a control queue.

It is one of the energy use cases, one per user journey. They share entities (`DeliveryPoint`, `Organization`…) but each blueprint only declares what its journey needs.

The blueprint has two purposes, in this order:

1. Describe the entities and properties of the journey, so that the Finances dashboard knows what it deals with.
2. Let a user create these entities by hand. In practice, most of them come from ingestion flows (Chorus Pro, supplier APIs), and delivery points are picked from the ones already created by the patrimoine use case.

The target model is the commercial layer (§5) of `data_model_v2.md` (Energies - Fluides SharePoint folder).

## Model

```text
FrameworkContract ── supplier, buyer ──> Organization
└── Lot (isPartOf)
    └── Contract (isPartOf) ── billingAccount ──> BillingAccount ── holder ──> Organization
        ^
        └── DeliveryPoint (relatedContract, 0..*: successive contracts)

Invoice ── supplier ──> Organization, billingAccount ──> BillingAccount, corrects ──> Invoice
└── InvoiceDetail (isPartOf) ── relatedDeliveryPoint ──> DeliveryPoint
                             ── relatedContract ──> Contract
```

| Entity | Role |
|--------|------|
| `Organization` | Any party: supplier, distributor, client, buyer. One type with a `roles` property. |
| `FrameworkContract` | Public market or framework agreement, e.g. the MS1 electricity purchasing group. |
| `Lot` | Lot of a market, with its own dates and renewal status. |
| `Contract` | Supply contract as referenced on invoices. Covers one or several delivery points, which point to it. |
| `BillingAccount` | What an invoice is addressed to, with Chorus Pro routing (SIRET, EJ, service code). |
| `Invoice` | Invoice or credit note header: number, totals, source document. |
| `InvoiceDetail` | Part of an invoice for one delivery point. Invoice lines are multi-instance `amount` and `consumption` properties, one `datasetId` per line. |
| `DeliveryPoint` | Light version: name, number, fluid, segment, distributor and contracts. Measured data and the link to the building belong to other use cases. |

Relationships always go from child to parent, i.e. from the many side: a contract can cover hundreds of delivery points, so each delivery point points to its contracts. Every entity has a required `name`, because the Twin Picks relationship picker searches existing entities by `name`. Enum values are stable English codes (`electricity`, `creditNote`, `toReview`…).

## Identifiers

Expected ids, applied by the ingestion flows:

| Entity | Id |
|--------|----|
| `DeliveryPoint` | `urn:ngsi-ld:DeliveryPoint:{fluidType}:{number}`, e.g. `…:electricity:25438060712186` |
| `Invoice` | `urn:ngsi-ld:Invoice:{supplier}:{invoiceNumber}` |
| `InvoiceDetail` | `urn:ngsi-ld:InvoiceDetail:{supplier}:{invoiceNumber}:{deliveryPointNumber}` |

`identifier` is set on the templates, but the Twin Picks Digital Twin form doesn't use it yet: the id suffix is typed by hand (a UUID by default). Only device provisioning builds ids from `identifier`.

## Twin Picks limitations found while testing

- `schemaType: 'number'` has no input in the Digital Twin form yet (only `integer` is rendered), so amounts and quantities can't be typed by hand. Ingestion flows are not affected.
- `identifier` is not used by the Digital Twin form: the id suffix is typed by hand.

## Open points

- Naming of line `datasetId`s and the list of `lineCategory` codes (data model D9).
- Codes and labels (D10): `renewalStatus` and `segment` values are drafts.
- Storage of control results (D17): only `reviewStatus` for now. It carries the reviewer (`reviewerId`, `reviewerName`, `reviewComment`) and the review time in `observedAt` (D20). The invoice header has no status: it is computed from its details.
- Storage of invoice PDFs (D18): `sourceDocument` is a plain link.
- Contracted prices (D15, proposal): `Lot.contractedPrice`, one value per price group, component, time class and year, and `Contract.pricingGroup` to pick the rows that apply. Modelled on published price schedules; to confirm on a real one.
- Line categories (D9, proposal): `{component}[-{timeClass}]`, e.g. `energy-HPH`, `turpe-fixed`, `excise` (list in the data model).
