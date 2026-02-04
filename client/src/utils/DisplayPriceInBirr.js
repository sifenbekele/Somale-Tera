export const DisplayPriceInBirr = (price)=>{
    return new Intl.NumberFormat('en-ET',{
        style : 'currency',
        currency : 'ETB'
    }).format(price)
}
