import { promises as fs } from 'fs';
import XLSX from 'xlsx';

(async () => {
    let scrapedData = [];

    try {
        // Read the Excel file
        const workbook = XLSX.readFile('/home/red/Desktop/scraped_data.xlsx');
        const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert the Excel data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Process the JSON data to match the expected format
        scrapedData = jsonData.map(row => ({
            date: row[0],
            code: row[1],
            low_12_months: row[2],
            high_12_months: row[3],
            low_days_trading: row[4],
            high_days_trading: row[5],
            price: row[6],
            previous: row[7],
            change: row[8],
            change_percentage: row[9],
            change_symbol: row[10],
            volume: row[11],
            adjusted_price: row[12]
        }));

        console.log('Scraped data:', scrapedData);

        // Write the scraped data to a JSON file
        await fs.writeFile('scrapedData.json', JSON.stringify(scrapedData, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
})();
