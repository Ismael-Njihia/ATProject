import converter from 'currency-exchanger-js'

const convertUSDToKES = async () => {
    const usdToKesRate = await converter.convert(1, 'USD', 'KES');
    return usdToKesRate
}
export default convertUSDToKES;