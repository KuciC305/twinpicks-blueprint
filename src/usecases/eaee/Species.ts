import { StellioTemplate } from '../../interfaces';
import {
    getDisplayNameProp,
    getClassificationJsonProp,
    presenceAbsenceEnumValues,
    filtreXEnumValues,
    incertitudeEnumValues,
    probabiliteEnumValues,
} from './utils';
import {
    getSimpleTextProp,
    getDateProp,
    getEnumProp,
    getNumericProp,
    getGeoPropertyProp,
    getMultiAttributeProp,
} from '../../utils/blueprintHelpers';
import * as Structures from './speciesDataStructures';

export const SpeciesTemplate: StellioTemplate = {
    id: 'urn:ngsi-ld:Species:Template',
    type: 'Template',
    jsonSchema: {
        type: 'Property',
        value: {
            schemaType: 'Species',
            title: 'Espèce',
            required: ['nomValide'],
            minimum: 1,
            description:
                "Entité représentant une espèce animale exotique envahissante et regroupant toutes les informations connues sur l'espèce",
        },
    },

    // #region FICHE ESPÈCE
    affichageSurSiteArbe: {
        ...getEnumProp({ title: "Affichage sur site de l'ARBE", enum: ['Oui', 'Non', 'En cours', 'A faire', 'NA'] }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp("Affichage sur site de l'ARBE"),
    },
    datePremierePublication: {
        ...getDateProp({ title: 'Date de première publication' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Date de première publication'),
    },
    version: {
        ...getSimpleTextProp({ title: 'Version' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Version'),
    },
    dateDerniereMiseAJour: {
        ...getDateProp({ title: 'Date de dernière mise à jour' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Date de dernière mise à jour'),
    },
    auteur: {
        ...getSimpleTextProp({ title: 'Auteur' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Auteur'),
    },
    relecteur: {
        ...getSimpleTextProp({ title: 'Relecteur(s)' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Relecteur(s)'),
    },
    structuresIntervenantSurLEspece: {
        ...getSimpleTextProp({ title: "Structures intervenant sur l'espèce" }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp("Structures intervenant sur l'espèce"),
    },
    signaler: {
        ...getSimpleTextProp({ title: 'Signaler' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Signaler'),
    },
    actionEnRegion: {
        ...getSimpleTextProp({ title: 'Action en région' }),
        classification: getClassificationJsonProp(Structures.ficheEspece),
        displayName: getDisplayNameProp('Action en région'),
    },
    // #endregion

    // #region TAXONOMIE
    taxon: {
        ...getEnumProp({
            title: "Taxon de l'espèce",
            enum: [
                'Mammifere',
                'Oiseau',
                'Reptile',
                'Amphibien',
                'Poisson',
                'Crustace',
                'Mollusque',
                'Arthropode',
                'Autres',
            ],
        }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Taxon'),
    },
    liste: {
        ...getEnumProp({ title: 'Liste', enum: [...filtreXEnumValues, 'A mettre à jour'] }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Liste'),
    },
    ordre: {
        ...getSimpleTextProp({ title: 'Ordre' }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Ordre'),
    },
    famille: {
        ...getSimpleTextProp({ title: 'Famille' }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Famille'),
    },
    cdRef: {
        ...getNumericProp({ title: 'Code de référence', minimum: 0, maximum: 999999 }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('CD Ref'),
    },
    nomValide: {
        ...getSimpleTextProp({ title: 'Nom valide' }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Nom valide'),
    },
    nomVernaculaire: {
        ...getSimpleTextProp({ title: 'Nom vernaculaire' }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Nom vernaculaire'),
    },
    rang: {
        ...getEnumProp({
            title: 'Rang',
            enum: ['OR', 'FN', 'SBFM', 'GN', 'SSGN', 'ES', 'SSES', 'FO', 'RACE', 'Autre'],
        }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Rang'),
    },
    hybride: {
        ...getSimpleTextProp({ title: 'Hybride' }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Hybride'),
    },
    especeProtegee: {
        ...getEnumProp({ title: 'Est-ce une espèce protégée ?', enum: ['Oui', 'Non'] }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Espèce protégée'),
    },
    filtreTaxonomique: {
        ...getEnumProp({ title: 'Filtre taxonomique', enum: filtreXEnumValues }),
        classification: getClassificationJsonProp(Structures.taxonomie),
        displayName: getDisplayNameProp('Filtre taxonomique'),
    },
    // #endregion

    // #region PRESENCE / ABSENCE
    source: {
        ...getSimpleTextProp({ title: 'Source' }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('Source'),
    },
    region: {
        ...getEnumProp({ title: 'Région', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('Région'),
    },
    '04': {
        ...getEnumProp({ title: '04', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('04'),
    },
    '05': {
        ...getEnumProp({ title: '05', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('05'),
    },
    '06': {
        ...getEnumProp({ title: '06', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('06'),
    },
    '13': {
        ...getEnumProp({ title: '13', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('13'),
    },
    '83': {
        ...getEnumProp({ title: '83', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('83'),
    },
    '84': {
        ...getEnumProp({ title: '84', enum: presenceAbsenceEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('84'),
    },
    remarquesPresenceAbsence: {
        ...getSimpleTextProp({ title: 'Remarques sur la présence/absence' }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('Remarques'),
    },
    filtreDePresence: {
        ...getEnumProp({ title: 'Filtre de présence', enum: filtreXEnumValues }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('Filtre de présence'),
    },
    observationSpace: {
        ...getGeoPropertyProp({ formLabel: "Zone d'observation", geometryType: 'Polygon' }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp("Zone d'observation"),
    },
    location: {
        ...getMultiAttributeProp({
            formLabel: 'Points de localisation',
            propertySchemaDefinition: getGeoPropertyProp({ formLabel: 'Point', geometryType: 'Point' }),
            subProps: [['city', getSimpleTextProp({ title: 'Ville' })]],
        }),
        classification: getClassificationJsonProp(Structures.presenceAbsence),
        displayName: getDisplayNameProp('Points de localisation'),
    },
    // #endregion

    // #region INDIGENAT
    statutPresenceREG: {
        ...getSimpleTextProp({ title: 'Statut de présence REG' }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Statut présence REG'),
    },
    statutBiologique: {
        ...getSimpleTextProp({ title: 'Statut biologique' }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Statut biologique'),
    },
    indigenat: {
        ...getEnumProp({ title: 'Indigénat', enum: ['Indigène', 'Exogène', 'Cryptogène', 'Inconnu', 'A évaluer'] }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Indigénat'),
    },
    categorie: {
        ...getEnumProp({ title: 'Catégorie', enum: ['Archéozoaire', 'Néozoaire', 'Inconnu', 'A évaluer', 'NA'] }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Catégorie'),
    },
    sourceIndigenat: {
        ...getSimpleTextProp({ title: 'Source indigénat' }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Source indigénat'),
    },
    periodeEtLieuDIntroduction: {
        ...getSimpleTextProp({ title: "Période et lieu d'introduction (France et région)" }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp("Période et lieu d'introduction (France et région)"),
    },
    sourcePeriodeEtLieuDIntroduction: {
        ...getSimpleTextProp({ title: "Source période et lieu d'introduction (France et région)" }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp("Source période et lieu d'introduction (France et région)"),
    },
    aireDorigine: {
        ...getSimpleTextProp({ title: "Aire d'origine" }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp("Aire d'origine"),
    },
    sourceAireDorigine: {
        ...getSimpleTextProp({ title: "Source aire d'origine" }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp("Source aire d'origine"),
    },
    datePremiereEntreeSileneRegionSud: {
        ...getDateProp({ title: 'Date de la première entrée Silène en région Sud' }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Date première entrée Silène région Sud'),
    },
    remarquesIndigenat: {
        ...getSimpleTextProp({ title: "Remarques sur l'indigénat" }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp('Remarques'),
    },
    filtreIndigenat: {
        ...getEnumProp({ title: "Filtre d'indigénat", enum: filtreXEnumValues }),
        classification: getClassificationJsonProp(Structures.indigenat),
        displayName: getDisplayNameProp("Filtre d'indigénat"),
    },

    // #endregion

    // #region AUTONOMIE
    spontaneite: {
        ...getEnumProp({
            title: 'Spontanéité',
            enum: ['Taxon sauvage', 'Taxon féral', 'Taxon domestiqué', 'Inconnu', 'NA'],
        }),
        classification: getClassificationJsonProp(Structures.autonomie),
        displayName: getDisplayNameProp('Spontanéité'),
    },
    sourceSpontaneite: {
        ...getSimpleTextProp({ title: 'Source spontanéité' }),
        classification: getClassificationJsonProp(Structures.autonomie),
        displayName: getDisplayNameProp('Source spontanéité'),
    },
    autonomie: {
        ...getEnumProp({
            title: 'Autonomie',
            enum: ['Captif', 'Autonome', 'Accidentel', 'Acclimaté', 'Etabli', 'Inconnu', 'A évaluer'],
        }),
        classification: getClassificationJsonProp(Structures.autonomie),
        displayName: getDisplayNameProp('Autonomie'),
    },
    sourceAutonomie: {
        ...getSimpleTextProp({ title: 'Source autonomie' }),
        classification: getClassificationJsonProp(Structures.autonomie),
        displayName: getDisplayNameProp('Source autonomie'),
    },
    remarquesAutonomie: {
        ...getSimpleTextProp({ title: "Remarques sur l'autonomie" }),
        classification: getClassificationJsonProp(Structures.autonomie),
        displayName: getDisplayNameProp('Remarques'),
    },
    filtreDAutonomie: {
        ...getEnumProp({ title: "Filtre d'autonomie", enum: filtreXEnumValues }),
        classification: getClassificationJsonProp(Structures.autonomie),
        displayName: getDisplayNameProp("Filtre d'autonomie"),
    },

    // #endregion

    // #region INFORMATION SUPPLEMENTAIRES
    habitat: {
        ...getEnumProp({
            title: 'Habitat',
            enum: [
                'Marin',
                'Eau douce',
                'Terrestre',
                'Marin et eau douce',
                'Marin et terrestre',
                'Eau saumâtre',
                'Continental',
                'A évaluer',
                'Inconnu',
            ],
        }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Habitat'),
    },
    statutBiogeographiqueEnFrance: {
        ...getEnumProp({
            title: 'Statut biogéographique en France',
            enum: [
                'Présent (indigène ou indéterminé)',
                'Endémique',
                'Subendémique',
                'Cryptogène',
                'Introduit',
                'Introduit envahissant',
                'Introduit non établi (dont cultivé / domestique)',
                'Occasionnel',
                'Douteux',
                'Mentionné par erreur',
                'Absent',
                'Disparu',
                'Eteint',
                'Introduit éteint',
                'Inconnu',
                'A évaluer',
            ],
        }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Statut biogéographique en France'),
    },
    interditDintroduction: {
        ...getSimpleTextProp({ title: "Interdit d'introduction" }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp("Interdit d'introduction"),
    },
    arreteMinisterielle: {
        ...getEnumProp({ title: 'Arrêté ministériel', enum: ['Oui', 'Non', 'A évaluer'] }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Arrêté ministériel'),
    },
    listeOccitanie: {
        ...getSimpleTextProp({ title: "Liste d'Occitanie" }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Liste Occitanie'),
    },
    auvergneRhoneAlpes: {
        ...getSimpleTextProp({ title: 'Auvergne-Rhône-Alpes' }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Auvergne-Rhône-Alpes'),
    },
    italieRegionsLimitrophes: {
        ...getSimpleTextProp({ title: 'Italie - Régions limitrophes' }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Italie - Régions limitrophes'),
    },
    lienCentreDeRessource: {
        ...getSimpleTextProp({ title: 'Lien vers centre de ressource' }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Lien centre de ressource'),
    },
    lienINPN: {
        ...getSimpleTextProp({ title: 'Lien vers INPN' }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Lien INPN'),
    },
    complementsInfo: {
        ...getSimpleTextProp({ title: "Compléments d'information" }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp("Compléments d'information"),
    },
    descriptionEtBiologie: {
        ...getSimpleTextProp({ title: 'Description et biologie' }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Description et biologie'),
    },
    listeDeTravail: {
        ...getEnumProp({ title: 'Liste de travail', enum: [...filtreXEnumValues, 'A mettre à jour'] }),
        classification: getClassificationJsonProp(Structures.informationsSupplementaires),
        displayName: getDisplayNameProp('Liste de travail'),
    },

    // #endregion

    // #region ANALYSE DE L'INTENSITE DES IMPACTS ENVIRONNEMENTAUX
    scorePotentielDeProliferation: {
        ...getNumericProp({ title: 'Score du potentiel de prolifération', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.potentielDeProliferation),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudePotentielDeProliferation: {
        ...getEnumProp({ title: "Niveau d'incertitude du potentiel de prolifération", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.potentielDeProliferation),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesPotentielDeProliferation: {
        ...getSimpleTextProp({ title: 'Commentaires sur le potentiel de prolifération' }),
        classification: getClassificationJsonProp(Structures.potentielDeProliferation),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreColonisationHabitatsNaturels: {
        ...getNumericProp({ title: 'Score de colonisation des habitats naturels', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.colonisationHabitatsNaturels),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeColonisationHabitatsNaturels: {
        ...getEnumProp({
            title: "Niveau d'incertitude de colonisation des habitats naturels",
            enum: incertitudeEnumValues,
        }),
        classification: getClassificationJsonProp(Structures.colonisationHabitatsNaturels),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesColonisationHabitatsNaturels: {
        ...getSimpleTextProp({ title: 'Commentaires sur la colonisation des habitats naturels' }),
        classification: getClassificationJsonProp(Structures.colonisationHabitatsNaturels),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scorePredation: {
        ...getNumericProp({ title: 'Score de prédation', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.predation),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudePredation: {
        ...getEnumProp({ title: "Niveau d'incertitude de prédation", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.predation),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesPredation: {
        ...getSimpleTextProp({ title: 'Commentaires sur la prédation' }),
        classification: getClassificationJsonProp(Structures.predation),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreCompetition: {
        ...getNumericProp({ title: 'Score de compétition', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.competition),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeCompetition: {
        ...getEnumProp({ title: "Niveau d'incertitude de compétition", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.competition),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesCompetition: {
        ...getSimpleTextProp({ title: 'Commentaires sur la compétition' }),
        classification: getClassificationJsonProp(Structures.competition),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreMaladies: {
        ...getNumericProp({ title: 'Score de maladies', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.maladies),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeMaladies: {
        ...getEnumProp({ title: "Niveau d'incertitude de maladies", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.maladies),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesMaladies: {
        ...getSimpleTextProp({ title: 'Commentaires sur les maladies' }),
        classification: getClassificationJsonProp(Structures.maladies),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreHybridation: {
        ...getNumericProp({ title: "Score d'hybridation", minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.hybridation),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeHybridation: {
        ...getEnumProp({ title: "Niveau d'incertitude de hybridation", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.hybridation),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesHybridation: {
        ...getSimpleTextProp({ title: "Commentaires sur l'hybridation" }),
        classification: getClassificationJsonProp(Structures.hybridation),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreCyclesNaturels: {
        ...getNumericProp({ title: 'Score de cycles naturels', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.cyclesNaturels),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeCyclesNaturels: {
        ...getEnumProp({ title: "Niveau d'incertitude de cycles naturels", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.cyclesNaturels),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesCyclesNaturels: {
        ...getSimpleTextProp({ title: 'Commentaires sur les cycles naturels' }),
        classification: getClassificationJsonProp(Structures.cyclesNaturels),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreAlterationsPhysiques: {
        ...getNumericProp({ title: 'Score alterations physiques', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.alterationsPhysiques),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeAlterationsPhysiques: {
        ...getEnumProp({ title: "Niveau d'incertitude alterations physiques", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.alterationsPhysiques),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesAlterationsPhysiques: {
        ...getSimpleTextProp({ title: 'Commentaires sur alterations physiques' }),
        classification: getClassificationJsonProp(Structures.alterationsPhysiques),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreSuccessionEcologiques: {
        ...getNumericProp({ title: 'Score succession écologiques', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.successionEcologiques),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeSuccessionEcologiques: {
        ...getEnumProp({ title: "Niveau d'incertitude succession écologiques", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.successionEcologiques),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesSuccessionEcologiques: {
        ...getSimpleTextProp({ title: 'Commentaires sur succession écologiques' }),
        classification: getClassificationJsonProp(Structures.successionEcologiques),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreReseauxTrophiques: {
        ...getNumericProp({ title: 'Score réseaux trophiques', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.reseauxTrophiques),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeReseauxTrophiques: {
        ...getEnumProp({ title: "Niveau d'incertitude réseaux trophiques", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.reseauxTrophiques),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesReseauxTrophiques: {
        ...getSimpleTextProp({ title: 'Commentaires sur réseaux trophiques' }),
        classification: getClassificationJsonProp(Structures.reseauxTrophiques),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreISEIA: {
        ...getNumericProp({ title: 'Score ISEIA', minimum: 0, maximum: 12 }),
        classification: getClassificationJsonProp(Structures.analyseIntensiteImpactsEnvironnementaux),
        displayName: getDisplayNameProp('Score ISEIA'),
    },
    impactsDocumentesISEIA: {
        ...getEnumProp({ title: 'Impacts documentés', enum: ['Oui', 'Non', 'A faire', 'NA'] }),
        classification: getClassificationJsonProp(Structures.analyseIntensiteImpactsEnvironnementaux),
        displayName: getDisplayNameProp('Impacts documentés'),
    },
    intensiteImpactsNegatifsEnvironnement: {
        ...getSimpleTextProp({ title: "Intensité des impacts négatifs sur l'environnement" }),
        classification: getClassificationJsonProp(Structures.analyseIntensiteImpactsEnvironnementaux),
        displayName: getDisplayNameProp("Intensité des impacts négatifs sur l'environnement"),
    },

    // #endregion

    // #region ANALYSE DE L'INTENSITE DES IMPACTS SOCIO-ECONOMIQUES SANITAIRES
    scoreImpactsSurEconomie: {
        ...getNumericProp({ title: "Score impacts sur l'économie", minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.impactsSurEconomie),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeImpactsSurEconomie: {
        ...getEnumProp({ title: "Niveau d'incertitude impacts sur l'économie", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.impactsSurEconomie),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesImpactsSurEconomie: {
        ...getSimpleTextProp({ title: "Commentaires sur impacts sur l'économie" }),
        classification: getClassificationJsonProp(Structures.impactsSurEconomie),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreImpactsSanitaires: {
        ...getNumericProp({ title: 'Score impacts sanitaires', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.impactsSanitaires),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeImpactsSanitaires: {
        ...getEnumProp({ title: "Niveau d'incertitude impacts sanitaires", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.impactsSanitaires),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesImpactsSanitaires: {
        ...getSimpleTextProp({ title: 'Commentaires sur impacts sanitaires' }),
        classification: getClassificationJsonProp(Structures.impactsSanitaires),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreAgriculture: {
        ...getNumericProp({ title: 'Score agriculture', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.agriculture),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeAgriculture: {
        ...getEnumProp({ title: "Niveau d'incertitude agriculture", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.agriculture),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesAgriculture: {
        ...getSimpleTextProp({ title: 'Commentaires sur agriculture' }),
        classification: getClassificationJsonProp(Structures.agriculture),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreForesterie: {
        ...getNumericProp({ title: 'Score foresterie', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.foresterie),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeForesterie: {
        ...getEnumProp({ title: "Niveau d'incertitude foresterie", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.foresterie),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesForesterie: {
        ...getSimpleTextProp({ title: 'Commentaires sur foresterie' }),
        classification: getClassificationJsonProp(Structures.foresterie),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreAquaculture: {
        ...getNumericProp({ title: 'Score aquaculture', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.aquaculture),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeAquaculture: {
        ...getEnumProp({ title: "Niveau d'incertitude aquaculture", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.aquaculture),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesAquaculture: {
        ...getSimpleTextProp({ title: 'Commentaires sur aquaculture' }),
        classification: getClassificationJsonProp(Structures.aquaculture),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreIndustrie: {
        ...getNumericProp({ title: 'Score industrie', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.industrie),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeIndustrie: {
        ...getEnumProp({ title: "Niveau d'incertitude industrie", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.industrie),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesIndustrie: {
        ...getSimpleTextProp({ title: 'Commentaires sur industrie' }),
        classification: getClassificationJsonProp(Structures.industrie),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scorePatrimoine: {
        ...getNumericProp({ title: 'Score patrimoine', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.patrimoine),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudePatrimoine: {
        ...getEnumProp({ title: "Niveau d'incertitude patrimoine", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.patrimoine),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesPatrimoine: {
        ...getSimpleTextProp({ title: 'Commentaires sur patrimoine' }),
        classification: getClassificationJsonProp(Structures.patrimoine),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreSecurite: {
        ...getNumericProp({ title: 'Score sécurité', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.securite),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeSecurite: {
        ...getEnumProp({ title: "Niveau d'incertitude sécurité", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.securite),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesSecurite: {
        ...getSimpleTextProp({ title: 'Commentaires sur sécurité' }),
        classification: getClassificationJsonProp(Structures.securite),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreLoisirs: {
        ...getNumericProp({ title: 'Score loisirs', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.loisirs),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeLoisirs: {
        ...getEnumProp({ title: "Niveau d'incertitude loisirs", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.loisirs),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesLoisirs: {
        ...getSimpleTextProp({ title: 'Commentaires sur loisirs' }),
        classification: getClassificationJsonProp(Structures.loisirs),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreAmenites: {
        ...getNumericProp({ title: 'Score aménities', minimum: 0, maximum: 3 }),
        classification: getClassificationJsonProp(Structures.amenites),
        displayName: getDisplayNameProp('Score'),
    },
    niveauIncertitudeAmenites: {
        ...getEnumProp({ title: "Niveau d'incertitude aménities", enum: incertitudeEnumValues }),
        classification: getClassificationJsonProp(Structures.amenites),
        displayName: getDisplayNameProp("Niveau d'incertitude"),
    },
    commentairesAmenites: {
        ...getSimpleTextProp({ title: 'Commentaires sur aménities' }),
        classification: getClassificationJsonProp(Structures.amenites),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreISSIA: {
        ...getNumericProp({ title: 'Score ISSIA', minimum: 0, maximum: 12 }),
        classification: getClassificationJsonProp(Structures.impactSurBienEtreHumain),
        displayName: getDisplayNameProp('Score ISSIA'),
    },
    impactsDocumentesISSIA: {
        ...getEnumProp({ title: 'Impacts documentés', enum: ['Oui', 'Non', 'A faire', 'NA'] }),
        classification: getClassificationJsonProp(Structures.impactSurBienEtreHumain),
        displayName: getDisplayNameProp('Impacts documentés'),
    },

    intensiteImpactsSocioEconomiquesSanitaires: {
        ...getEnumProp({
            title: 'Intensité des impacts négatifs socio-économiques sanitaires',
            enum: ['Élevée', 'Modérée', 'Faible'],
        }),
        classification: getClassificationJsonProp(Structures.analyseIntensiteImpactsSocioEconomiquesSanitaires),
        displayName: getDisplayNameProp('Intensité des impacts négatifs'),
    },

    // #endregion

    // #region ANALYSE DE RISQUES DES TAXONS EVALUES
    probabiliteIntroductionVolontaire: {
        ...getEnumProp({ title: "Probabilité d'introduction volontaire", enum: probabiliteEnumValues }),
        classification: getClassificationJsonProp(Structures.introductionVolontaire),
        displayName: getDisplayNameProp('Probabilité'),
    },
    commentairesIntroductionVolontaire: {
        ...getSimpleTextProp({ title: "Commentaires sur l'introduction volontaire" }),
        classification: getClassificationJsonProp(Structures.introductionVolontaire),
        displayName: getDisplayNameProp('Commentaires'),
    },

    probabiliteIntroductionInvolontaire: {
        ...getEnumProp({ title: "Probabilité d'introduction involontaire", enum: probabiliteEnumValues }),
        classification: getClassificationJsonProp(Structures.introductionInvolontaire),
        displayName: getDisplayNameProp('Probabilité'),
    },
    commentairesIntroductionInvolontaire: {
        ...getSimpleTextProp({ title: "Commentaires sur l'introduction involontaire" }),
        classification: getClassificationJsonProp(Structures.introductionInvolontaire),
        displayName: getDisplayNameProp('Commentaires'),
    },

    probabiliteLimitrophe: {
        ...getEnumProp({ title: 'Probabilité limitrophe', enum: probabiliteEnumValues }),
        classification: getClassificationJsonProp(Structures.limitrophe),
        displayName: getDisplayNameProp('Limitrophe'),
    },
    commentairesLimitrophe: {
        ...getSimpleTextProp({ title: 'Commentaires sur la limitrophe' }),
        classification: getClassificationJsonProp(Structures.limitrophe),
        displayName: getDisplayNameProp('Commentaires'),
    },

    probaMax: {
        ...getEnumProp({ title: 'Probabilité MAX', enum: probabiliteEnumValues }),
        classification: getClassificationJsonProp(Structures.analyseRisquesDesTaxonsEvalues),
        displayName: getDisplayNameProp('Proba Max'),
    },

    // #endregion

    // #region CRITERES INFORMATIFS
    scoreDistributionSpatiale: {
        ...getEnumProp({
            title: 'Score distribution spatiale',
            enum: ['Absente', 'Rare', 'Répandue', 'Très répandue', 'NA'],
        }),
        classification: getClassificationJsonProp(Structures.distributionSpatiale),
        displayName: getDisplayNameProp('Score'),
    },
    commentairesDistributionSpatiale: {
        ...getSimpleTextProp({ title: 'Commentaires sur distribution spatiale' }),
        classification: getClassificationJsonProp(Structures.distributionSpatiale),
        displayName: getDisplayNameProp('Commentaires'),
    },

    scoreCoefficientDabondance: {
        ...getEnumProp({
            title: "Score coefficient d'abondance",
            enum: ['Absente', 'Peu abondante', 'Abondante', 'Très abondante', 'NA'],
        }),
        classification: getClassificationJsonProp(Structures.coefficientDabondance),
        displayName: getDisplayNameProp('Score'),
    },
    commentairesCoefficientDabondance: {
        ...getSimpleTextProp({ title: "Commentaires sur coefficient d'abondance" }),
        classification: getClassificationJsonProp(Structures.coefficientDabondance),
        displayName: getDisplayNameProp('Commentaires'),
    },
    // #endregion

    // #region ANALYSE FINALE
    impactsIrreversibles: {
        ...getSimpleTextProp({ title: 'Impacts irréversibles' }),
        classification: getClassificationJsonProp(Structures.analyseFinale),
        displayName: getDisplayNameProp('Impacts irréversibles'),
    },
    analyseDesRisquesDesTaxonsEvalues: {
        ...getSimpleTextProp({ title: 'Analyse des risques des taxons évalués' }),
        classification: getClassificationJsonProp(Structures.analyseFinale),
        displayName: getDisplayNameProp('Analyse des risques des taxons évalués'),
    },
    consequence: {
        ...getSimpleTextProp({ title: 'Conséquence' }),
        classification: getClassificationJsonProp(Structures.analyseFinale),
        displayName: getDisplayNameProp('Conséquence'),
    },

    categorieFinale: {
        ...getSimpleTextProp({ title: 'Catégorie' }),
        classification: getClassificationJsonProp(Structures.analyseFinale),
        displayName: getDisplayNameProp('Catégorie'),
    },
    categorieAjustee: {
        ...getEnumProp({
            title: 'Catégorie ajustée',
            enum: [
                'Majeure',
                'Modérée',
                'Emergente',
                'Alerte',
                'Prévention',
                'Exotique non envahissante',
                'NA',
                'A évaluer',
            ],
        }),
        classification: getClassificationJsonProp(Structures.analyseFinale),
        displayName: getDisplayNameProp('Catégorie ajustée'),
    },
    categorieAffichee: {
        ...getEnumProp({
            title: 'Catégorie affichée',
            enum: [
                'Majeure',
                'Modérée',
                'Emergente',
                'Alerte',
                'Prévention',
                'Exotique non envahissante',
                'NA',
                'A évaluer',
            ],
        }),
        classification: getClassificationJsonProp(Structures.analyseFinale),
        displayName: getDisplayNameProp('Catégorie affichée'),
    },
    // #endregion
};
