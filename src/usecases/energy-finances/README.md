# Energy Finances Blueprint

## Overall Description

This use case covers the "Gérer les finances" journey of the energy and utilities offer: collect supplier invoices and credit notes, link them to contracts and delivery points, check them, and present the exceptions in a control queue.

It also covers **re-billing to a third party** (#8300): part of the consumption (electricity, water, gas, heat) measured by a sub-meter is billed on to someone else, an employee, an occupant or a company. It is the opposite direction from supplier invoices: the client is the seller, and the volumes come from its own sub-meters (`ConnectivityNode`, declared by `building-management`), not from a supplier.

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

Invoice ── supplier ──> Organization, billingAccount ──> BillingAccount
└── InvoiceDetail (isPartOf) ── relatedDeliveryPoint ──> DeliveryPoint
                             ── relatedContract ──> Contract
                             ── corrects ──> Invoice (credit notes, with correctionType)

RebillingContract ── customer ──> Organization | Person
└── volumeSource (one per product) ──> ConnectivityNode | DeliveryPoint
```

| Entity | Role |
|--------|------|
| `Organization` | Any party: supplier, distributor, client, buyer, re-billed customer (`rebillingCustomer`). One type with a `roles` property. |
| `FrameworkContract` | Public market or framework agreement, e.g. the MS1 electricity purchasing group. |
| `Lot` | Lot of a market, with its own dates and renewal status. |
| `Contract` | Supply contract as referenced on invoices. Covers one or several delivery points, which point to it. |
| `BillingAccount` | What an invoice is addressed to, with Chorus Pro routing (SIRET, EJ, service code). |
| `Invoice` | Invoice or credit note header: number, totals, source document. |
| `InvoiceDetail` | Part of an invoice for one delivery point. Invoice lines are multi-instance `amount` and `consumption` properties, one `datasetId` per line. On a credit note, `corrects` points to the invoice it corrects for that delivery point: one multi-site credit note can cancel a different invoice per delivery point. |
| `DeliveryPoint` | Light version: name, number, fluid, segment, distributor and contracts. Measured data and the link to the building belong to other use cases. |
| `RebillingContract` | Re-billing to a third party (D37): name, reference, customer, start and end dates, billing periodicity (`monthly` / `quarterly` / `yearly`), status (`active` / `archived`, never deleted). `volumeSource`: one instance per product, with sub-properties `product`, `measureType` (`index` or `consumption`), optional `referenceSource` (the D9 `{source}` to bill on when several systems measure the node, D39) and `validFrom` / `validTo`. Its target is a `ConnectivityNode` (or a `DeliveryPoint`) of the building management use case: `canSearchAllUseCases` lets the form picker search outside the energy finances use case. `unitPrice`: one instance per product and price change, with `product` and `validFrom`; optional. |
| `Person` | An individual re-billed customer (an employee, a housing occupant): name only. |

Re-billing statements are computed by the dashboard, not stored (D38): one table per contract, one row per period and product (start and end dates, start and end index, quantity, unit price, cost excluding VAT). The volumes are the `index` / `consumption` of the `ConnectivityNode` (D40), cut at each device change (`Device controlledAsset` with `validFrom` / `validTo`, D36).

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
- The `datasetId` of a multi-instance attribute is hidden outside developer mode and defaults to 1, 2…: the product of a `volumeSource` or `unitPrice` is therefore a sub-property, not the `datasetId`.

## Open points

- Codes and labels (D10): `renewalStatus` and `segment` values are drafts.
- Storage of control results (D17): only `reviewStatus` for now. It carries the reviewer (`reviewerId`, `reviewerName`, `reviewComment`) and the review time in `observedAt` (D20). The invoice header has no status: it is computed from its details.
- Storage of invoice PDFs (D18): `sourceDocument` is a plain link.
- Contracted prices (D15, proposal): `Lot.contractedPrice`, one value per price group, component, time class and year, and `Contract.pricingGroup` to pick the rows that apply. Modelled on published price schedules; to confirm on a real one.
- Line categories (D9, proposal): `{component}[-{timeClass}]`, e.g. `energy-HPH`, `turpe-fixed`, `excise` (list in the data model). Adjustment lines keep their component category and add `adjustment` (`estimateCancellation` / `regularisation`). Line `datasetId` = `urn:ngsi-ld:Dataset:{lineCategory}[:{adjustment}]`. Lines with the same `datasetId` and start date are summed at ingestion, with the supplier labels kept in `sourceLabel`.
- Credit notes (D21, decided): `InvoiceDetail.corrects` with `correctionType` (`cancellation` / `partialCorrection`), from Chorus `numeroFactureOrigine` or the PDF wording.
- Frozen re-billing statements (`RebillingStatement`, D38) if statements sent to a customer must not change after a data correction.
- Market reference: the Chorus `numeroMarche` of an invoice is not stored on `Invoice`. Ingestion parses it into `FrameworkContract.reference` + `Lot.lotNumber` to find the lot (EDF `252025S0301L02/MS1` → `252025S0301` / `L02`).
