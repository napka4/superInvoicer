export function formatMoney(number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(number);
}

export function cloneObject(source, modifiedData)
{
    // Voir https://devdocs.io/javascript/global_objects/object/assign
    return Object.assign({}, source, modifiedData);
}