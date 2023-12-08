function formatPrice(num, fraction = 2){
    return new Intl.NumberFormat('en-BN', {
        currency: 'BDT',
        minimumFractionDigits: fraction
    }).format(Number(num))
}

export default formatPrice