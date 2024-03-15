import converter from 'currency-exchanger-js';
const convertUSDToKES = async () => {
    try {
        const usdToKesRate = await converter.convert(1,'USD', 'KES');
       return usdToKesRate;
    } catch (error) {
        console.error('Error:', error);
    }
}
export default convertUSDToKES;