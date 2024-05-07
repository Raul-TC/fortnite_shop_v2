export const URL_SHOP = 'https://fortniteapi.io/v2/shop?lang=es'
export const URL_ITEM = (id) => `https://fortniteapi.io/v2/items/get?id=${id}&lang=es`
export const URL_COSMETICS = 'https://fortniteapi.io/v2/items/list?lang=es'
export const URL_RARITIES = 'https://fortniteapi.io/v2/rarities?lang=es'
export const URL_BPASS = 'https://fortniteapi.io/v2/battlepass?lang=es&season=current'
export const URL_STATS = (user, type) => `https://fortnite-api.com/v2/stats/br/v2/?name=${user}&accountType=${type}&image=all&timeWindow=lifetime`
export const URL_STATS_SEASON = (user, type) => `https://fortnite-api.com/v2/stats/br/v2/?name=${user}&accountType=${type}&image=all&timeWindow=season`
