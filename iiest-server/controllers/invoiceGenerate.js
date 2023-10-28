const easyinvoice = require('easyinvoice')
const fs = require('fs');


async function generateInvoice(idNumber ,data){
    try {
        const result = await easyinvoice.createInvoice(data);

        const pdfPath = `${__dirname}/invoice/invoice_${idNumber}.pdf`;
        fs.writeFileSync(pdfPath, result.pdf, 'base64')

    } catch (error) {
        console.error(error);
    }
}

module.exports = { generateInvoice }