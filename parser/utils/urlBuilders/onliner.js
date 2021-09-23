const URL = 'https://r.onliner.by/sdapi/ak.api/search/apartments?bounds%5Blb%5D%5Blat%5D=53.74424420118154&bounds%5Blb%5D%5Blong%5D=27.30033874511719&bounds%5Brt%5D%5Blat%5D=54.05132662262108&bounds%5Brt%5D%5Blong%5D=27.823562622070316&v=0.995704903133233'

const build = (params) => {
    let url = []
    if (params.rent_type) {
        url.push(`rent_type[]=${params.rent_type}`)
    }
    if (params.rent_type) {
        url.push(`rent_type[]=${params.rent_type}`)
    }
    if (params.price) {
        url.push(`price[min]=${parseFloat(params.price[0]) < 50 ? 50 : params.price[0]}`)
        url.push(`price[max]=${params.price[1]}`)
    }
    if (params.currency) {
        url.push(`currency=${params.currency}`)
        url.push(`price[max]=${params.price[1]}`)
    } else {
        url.push('currency=usd')
    }

    if (params.only_owner) {
        url.push(`only_owner=${params.only_owner}`)
    }

    return URL + (url.length ? encodeURI(url.join('&')) : '')
}

module.exports = build