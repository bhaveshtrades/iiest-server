const { fboModel } = require('../models/fboSchema');
const { recipientValidationSchema, shopValidationSchema } = require('../models/recipientSchema');

// Controller for adding shop or recipient data
exports.addRecipient = async (req, res) => {
    try {
        const objId = req.params.id;
        let success = false;
        let recipientData;

        const selectedFbo = await fboModel.findById(objId);

        if (!selectedFbo) {
            return res.status(404).json({ success, message: 'FBO not found' });
        }

        if (selectedFbo.product_name === 'Foscos Training') {
            const { name, phoneNo, aadharNo } = req.body;
            let shopData = await shopValidationSchema.validateAsync({ name, phoneNo, aadharNo });
            recipientData = { type: 'shop', data: shopData };
        } else {
            const { operatorName, address, eBill } = req.body;
            let recipientDataObject = await recipientValidationSchema.validateAsync({ operatorName, address, eBill });
            recipientData = { type: 'recipient', data: recipientDataObject };
        }

        selectedFbo.recipientDetails.push(recipientData);

        const updatedFboData = await selectedFbo.save();

        if (!updatedFboData) {
            return res.status(404).json({ success, message: 'FBO not found' });
        }

        success = true;
        return res.status(200).json({ success, message: 'Recipient added successfully', data: updatedFboData.recipientDetails });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
