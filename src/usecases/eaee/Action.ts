import { StellioTemplate } from '../../interfaces';
import * as Structures from './actionsDataStructures';
import { getDisplayNameProp, getClassificationJsonProp } from './utils';
import {
    getSimpleTextProp,
    getDateProp,
    getEnumProp,
    getMultiRelationshipProp,
    getGeoPropertyProp,
    getBooleanProp,
} from '../../utils/blueprintHelpers';

export const ActionTemplate: StellioTemplate = {
    id: 'urn:ngsi-ld:Action:Template',
    type: 'Template',
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'Action',
            title: 'Action',
            required: ['name'],
            minimum: 0,
            description: "Entité représentant une action de gestion de l'espèce",
        },
    },

    // #region GENERALITES
    name: {
        ...getSimpleTextProp({ title: "Nom de l'action" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Nom de l'action"),
    },
    objectifsDeLaction: {
        ...getSimpleTextProp({ title: "Objectifs de l'action" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Objectifs de l'action"),
    },
    description: {
        ...getSimpleTextProp({ title: "Description de l'action" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Description de l'action"),
    },
    dateDebut: {
        ...getDateProp({ title: 'Date de début' }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp('Date de début'),
    },
    dateFin: {
        ...getDateProp({ title: 'Date de fin' }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp('Date de fin'),
    },
    descriptionDetailleeDeLintervention: {
        ...getSimpleTextProp({ title: "Description détaillée de l'intervention" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Description détaillée de l'intervention"),
    },
    concertationAvecAutresActeursEtPartenaires: {
        ...getSimpleTextProp({ title: "Concertation avec d'autres acteurs et partenaires" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Concertation avec d'autres acteurs et partenaires"),
    },
    tempsAgentParMissionsEnHommeJour: {
        ...getSimpleTextProp({ title: 'Temps agent par missions en homme/jour' }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp('Temps agent par missions en homme/jour'),
    },
    financeurDeLoperation: {
        ...getSimpleTextProp({ title: "Financeur de l'opération" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Financeur de l'opération"),
    },
    coutDeLoperation: {
        ...getSimpleTextProp({ title: "Coût(s) de l'opération" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Coût(s) de l'opération"),
    },
    indicateurDeSuiviDeLactionDansLeTemps: {
        ...getSimpleTextProp({ title: "Indicateur(s) de suivi de l'action dans le temps" }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp("Indicateur(s) de suivi de l'action dans le temps"),
    },
    detailDuOuDesSuivis: {
        ...getSimpleTextProp({ title: 'Détail du ou des suivis' }),
        classification: getClassificationJsonProp(Structures.generalites),
        displayName: getDisplayNameProp('Détail du ou des suivis'),
    },
    // #endregion

    // #region PORTEURS DE PROJET
    nomStructurePilote: {
        ...getSimpleTextProp({ title: 'Nom de la structure pilote' }),
        classification: getClassificationJsonProp(Structures.structurePilote),
        displayName: getDisplayNameProp('Nom'),
    },
    structurePiloteType: {
        ...getEnumProp({
            title: 'Type de la structure pilote',
            enum: [
                'Association',
                'Collectivité',
                'Entreprise',
                'Etablissement scolaire',
                'Fondation',
                'Gestionnaire de milieux',
                'Autres',
            ],
        }),
        classification: getClassificationJsonProp(Structures.structurePilote),
        displayName: getDisplayNameProp('Type'),
    },
    missionPrincipaleDeLaStructurePilote: {
        ...getSimpleTextProp({ title: 'Mission principale de la structure pilote' }),
        classification: getClassificationJsonProp(Structures.structurePilote),
        displayName: getDisplayNameProp('Mission principale'),
    },
    territoireDintervention: {
        ...getSimpleTextProp({ title: "Territoire d'intervention de la structure pilote" }),
        classification: getClassificationJsonProp(Structures.structurePilote),
        displayName: getDisplayNameProp("Territoire d'intervention"),
    },
    siteInternetDeLaStructurePilote: {
        ...getSimpleTextProp({ title: 'Site internet de la structure pilote' }),
        classification: getClassificationJsonProp(Structures.structurePilote),
        displayName: getDisplayNameProp('Site internet'),
    },

    nomPersonneReferenteDeLaction: {
        ...getSimpleTextProp({ title: "Nom de la personne référente de l'action" }),
        classification: getClassificationJsonProp(Structures.personneReferente),
        displayName: getDisplayNameProp('Nom'),
    },
    prenomPersonneReferenteDeLaction: {
        ...getSimpleTextProp({ title: "Prénom de la personne référente de l'action" }),
        classification: getClassificationJsonProp(Structures.personneReferente),
        displayName: getDisplayNameProp('Prénom'),
    },
    structurePersonneReferenteDeLaction: {
        ...getSimpleTextProp({ title: "Structure de la personne référente de l'action" }),
        classification: getClassificationJsonProp(Structures.personneReferente),
        displayName: getDisplayNameProp('Structure'),
    },
    fonctionPersonneReferenteDeLaction: {
        ...getSimpleTextProp({ title: "Fonction de la personne référente de l'action" }),
        classification: getClassificationJsonProp(Structures.personneReferente),
        displayName: getDisplayNameProp('Fonction'),
    },
    email: {
        ...getSimpleTextProp({ title: "Email de la personne référente de l'action" }),
        classification: getClassificationJsonProp(Structures.personneReferente),
        displayName: getDisplayNameProp('Email'),
    },
    telephonePersonneReferenteDeLaction: {
        ...getSimpleTextProp({ title: "Téléphone de la personne référente de l'action" }),
        classification: getClassificationJsonProp(Structures.personneReferente),
        displayName: getDisplayNameProp('Téléphone'),
    },
    // #endregion

    // #region ESPÈCES LIÉES À L'ACTION
    relatedSpecies: {
        ...getMultiRelationshipProp({
            formLabel: "Espèces liées à l'action",
            formLabelPerItem: 'Sélectionner une espèce',
            listOfAllowedRelationships: ['urn:ngsi-ld:Species:Template'],
        }),
        classification: getClassificationJsonProp(Structures.especesCibles),
        displayName: getDisplayNameProp("Espèces liées à l'action"),
    },
    // #endregion

    // #region LIEU DE L'ACTION
    echelleTerritorialeDeLaction: {
        ...getEnumProp({
            title: "Échelle territoriale de l'action",
            enum: [
                'Bassin versant',
                'Commune',
                'Communauté de communes',
                "Communautés d'Agglomération ou urbaine",
                'Métrople',
                "Parc d'activités",
                'Pays / Parc régional / Parc national',
                'Département',
                'Région',
                'Etablissement',
                'Autre',
            ],
        }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp('Échelle territoriale'),
    },
    departementDinterventionDeLaction: {
        ...getEnumProp({ title: "Département d'intervention de l'action", enum: ['04', '05', '06', '13', '83', '84'] }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp("Département d'intervention"),
    },
    commune: {
        ...getSimpleTextProp({ title: 'Service(s) de la collectivité associé(s)' }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp('Service(s) de la collectivité associé(s)'),
    },
    nomDuSite: {
        ...getSimpleTextProp({ title: 'Nom du site' }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp('Nom du site'),
    },
    descriptionDuSite: {
        ...getSimpleTextProp({ title: 'Description du site' }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp('Description du site'),
    },
    localisationDuSite: {
        ...getGeoPropertyProp({ formLabel: 'Localisation du site', geometryType: 'Point' }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp('Localisation du site'),
    },
    surface: {
        ...getEnumProp({
            title: 'Surface du site',
            enum: ['< ou = à 10 m²', '11 à 100 m²', '101 à 1000 m²', '1001 à 10000 m²', '> à 10001 m²', 'Inconnue'],
        }),
        classification: getClassificationJsonProp(Structures.lieuDeLaction),
        displayName: getDisplayNameProp('Surface'),
    },
    // #endregion

    // #region TYPE D'ACTION
    documentDePlanification: {
        ...getBooleanProp({ title: 'Document de planification' }),
        classification: getClassificationJsonProp(Structures.typeDaction),
        displayName: getDisplayNameProp('Document de planification'),
    },
    veille: {
        ...getBooleanProp({ title: 'Veille' }),
        classification: getClassificationJsonProp(Structures.typeDaction),
        displayName: getDisplayNameProp('Veille'),
    },
    prospection: {
        ...getBooleanProp({ title: 'Prospection' }),
        classification: getClassificationJsonProp(Structures.typeDaction),
        displayName: getDisplayNameProp('Prospection'),
    },

    gestionObjectifsExperimentation: {
        ...getBooleanProp({ title: 'Expérimentation' }),
        classification: getClassificationJsonProp(Structures.objectifs),
        displayName: getDisplayNameProp('Expérimentation'),
    },
    gestionObjectifsControle: {
        ...getBooleanProp({ title: 'Contrôle' }),
        classification: getClassificationJsonProp(Structures.objectifs),
        displayName: getDisplayNameProp('Controle'),
    },
    gestionObjectifsEradication: {
        ...getBooleanProp({ title: 'Eradication' }),
        classification: getClassificationJsonProp(Structures.objectifs),
        displayName: getDisplayNameProp('Eradication'),
    },
    gestionObjectifsRegulation: {
        ...getBooleanProp({ title: 'Régulation' }),
        classification: getClassificationJsonProp(Structures.objectifs),
        displayName: getDisplayNameProp('Régulation'),
    },
    gestionObjectifsConfinement: {
        ...getBooleanProp({ title: 'Confinement' }),
        classification: getClassificationJsonProp(Structures.objectifs),
        displayName: getDisplayNameProp('Confinement'),
    },
    gestionObjectifsAutre: {
        ...getBooleanProp({ title: 'Autre' }),
        classification: getClassificationJsonProp(Structures.objectifs),
        displayName: getDisplayNameProp('Autre'),
    },

    gestionEtatDesLieuxAvantTravaux: {
        ...getBooleanProp({ title: 'Etat des lieux avant travaux' }),
        classification: getClassificationJsonProp(Structures.gestion),
        displayName: getDisplayNameProp('Etat des lieux avant travaux'),
    },

    gestionOperationsPiegeage: {
        ...getBooleanProp({ title: 'Piégeage' }),
        classification: getClassificationJsonProp(Structures.operations),
        displayName: getDisplayNameProp('Piégeage'),
    },

    gestionOperationsAbattage: {
        ...getBooleanProp({ title: 'Abattage' }),
        classification: getClassificationJsonProp(Structures.operations),
        displayName: getDisplayNameProp('Abattage'),
    },
    gestionOperationsLutteChimique: {
        ...getBooleanProp({ title: 'Lutte chimique' }),
        classification: getClassificationJsonProp(Structures.operations),
        displayName: getDisplayNameProp('Lutte chimique'),
    },
    gestionOperationsLutteBiologique: {
        ...getBooleanProp({ title: 'Lutte biologique' }),
        classification: getClassificationJsonProp(Structures.operations),
        displayName: getDisplayNameProp('Lutte biologique'),
    },
    gestionOperationsAutre: {
        ...getBooleanProp({ title: 'Autre' }),
        classification: getClassificationJsonProp(Structures.operations),
        displayName: getDisplayNameProp('Autre'),
    },

    gestionSuiviDesOperationAucun: {
        ...getBooleanProp({ title: 'Auncun suivi' }),
        classification: getClassificationJsonProp(Structures.suiviDesOperation),
        displayName: getDisplayNameProp('Auncun suivi'),
    },
    gestionSuiviDesOperationPartiel: {
        ...getBooleanProp({ title: 'Suivi partiel' }),
        classification: getClassificationJsonProp(Structures.suiviDesOperation),
        displayName: getDisplayNameProp('Suivi partiel'),
    },
    gestionSuiviDesOperationAvecRepasse: {
        ...getBooleanProp({ title: 'Suivi avec repasse' }),
        classification: getClassificationJsonProp(Structures.suiviDesOperation),
        displayName: getDisplayNameProp('Suivi avec repasse'),
    },
    gestionSuiviDesOperationDetail: {
        ...getBooleanProp({ title: 'Detail' }),
        classification: getClassificationJsonProp(Structures.suiviDesOperation),
        displayName: getDisplayNameProp('Detail'),
    },

    gestionDevenirDesEspecesMiseAMort: {
        ...getBooleanProp({ title: 'Mise à mort' }),
        classification: getClassificationJsonProp(Structures.devenirDesEspeces),
        displayName: getDisplayNameProp('Mise à mort'),
    },
    gestionDevenirDesEspecesTransfertDansUnRefuge: {
        ...getBooleanProp({ title: 'Transfert dans un refuge' }),
        classification: getClassificationJsonProp(Structures.devenirDesEspeces),
        displayName: getDisplayNameProp('Transfert dans un refuge'),
    },
    gestionDevenirDesEspecesAutre: {
        ...getBooleanProp({ title: 'Autre' }),
        classification: getClassificationJsonProp(Structures.devenirDesEspeces),
        displayName: getDisplayNameProp('Autre'),
    },

    communicationInformation: {
        ...getBooleanProp({ title: 'Information' }),
        classification: getClassificationJsonProp(Structures.communication),
        displayName: getDisplayNameProp('Information'),
    },
    communicationSensibilisation: {
        ...getBooleanProp({ title: 'Sensibilisation' }),
        classification: getClassificationJsonProp(Structures.communication),
        displayName: getDisplayNameProp('Sensibilisation'),
    },
    communicationFormation: {
        ...getBooleanProp({ title: 'Formation' }),
        classification: getClassificationJsonProp(Structures.communication),
        displayName: getDisplayNameProp('Formation'),
    },
    communicationAutre: {
        ...getBooleanProp({ title: 'Autre' }),
        classification: getClassificationJsonProp(Structures.communication),
        displayName: getDisplayNameProp('Autre'),
    },
    communicationLienVersRessources: {
        ...getSimpleTextProp({ title: 'Lien vers les ressources' }),
        classification: getClassificationJsonProp(Structures.communication),
        displayName: getDisplayNameProp('Lien vers les ressources'),
    },
    // #endregion

    // #region RESULTATS ET BILAN
    resultats: {
        ...getSimpleTextProp({ title: 'Résultats' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Résultats'),
    },
    bilan: {
        ...getSimpleTextProp({ title: 'Bilan' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Bilan'),
    },
    valorisationDesActions: {
        ...getSimpleTextProp({ title: 'Valorisation des actions' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Valorisation des actions'),
    },
    productionAssociée: {
        ...getSimpleTextProp({ title: 'Production(s) associée(s)' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Production(s) associée(s)'),
    },
    pointsDeVigilances: {
        ...getSimpleTextProp({ title: 'Points de vigilances' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Points de vigilances'),
    },
    enseignementDuProjet: {
        ...getSimpleTextProp({ title: 'Enseignement du projet' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Enseignement du projet'),
    },
    perspectives: {
        ...getSimpleTextProp({ title: 'Perspectives' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Perspectives'),
    },
    réglementation: {
        ...getSimpleTextProp({ title: 'Réglementation' }),
        classification: getClassificationJsonProp(Structures.resultatEtBilan),
        displayName: getDisplayNameProp('Réglementation'),
    },
    // #endregion

    // #region FICHE REX
    autorisationDePublicationSurLeSiteDeLARBE: {
        ...getBooleanProp({ title: "Autorisation de publication sur le site de l'ARBE" }),
        classification: getClassificationJsonProp(Structures.ficheRex),
        displayName: getDisplayNameProp("Autorisation de publication sur le site de l'ARBE"),
    },
    dateRedaction: {
        ...getDateProp({ title: 'Date rédaction' }),
        classification: getClassificationJsonProp(Structures.ficheRex),
        displayName: getDisplayNameProp('Date rédaction'),
    },
    nomRedacteur: {
        ...getSimpleTextProp({ title: 'Nom(s) rédacteur(s)' }),
        classification: getClassificationJsonProp(Structures.ficheRex),
        displayName: getDisplayNameProp('Nom(s) rédacteur(s)'),
    },
    nomRelecteur: {
        ...getSimpleTextProp({ title: 'Nom(s) relecteur' }),
        classification: getClassificationJsonProp(Structures.ficheRex),
        displayName: getDisplayNameProp('Nom(s) relecteur'),
    },
    fichePublieeSurLeSiteDeLARBE: {
        ...getSimpleTextProp({ title: "Fiche publiée sur le site de l'ARBE" }),
        classification: getClassificationJsonProp(Structures.ficheRex),
        displayName: getDisplayNameProp("Fiche publiée sur le site de l'ARBE"),
    },
    datePublication: {
        ...getDateProp({ title: 'Date publication' }),
        classification: getClassificationJsonProp(Structures.ficheRex),
        displayName: getDisplayNameProp('Date publication'),
    },
    // #endregion
};
