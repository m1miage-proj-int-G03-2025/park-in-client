export const getTypeVoitureByKey = (key: string) => {
    switch(key) {
        case "VOITURE": return "Voiture"
        case "VOIT_ELECT": return "Voiture Electrique"
        case "AUTO_PARTAGE": return "Auto Partage"
        case "VELO": return "Velo"
        case "DEUX_REL": return "2R EL"
        case "DEUX_ROUES_MOTRICE": return "2 Roues Motrices"
        case "COVOITURAGE": return "Covoiturage"
        default: return key
    }
}