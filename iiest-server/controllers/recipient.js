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
            const shopDataArray = req.body;
            const shopDataObjects = await Promise.all(shopDataArray.map(async (shopData) => {
                return await shopValidationSchema.validateAsync(shopData);
            }));
            recipientData = shopDataObjects;
        } else {
            const recipientDataArray = req.body;
            const recipientDataObjects = await Promise.all(recipientDataArray.map(async (recipientData) => {
                return await recipientValidationSchema.validateAsync(recipientData);
            }));
            recipientData = recipientDataObjects;
        }

        await selectedFbo.recipientDetails.push(...recipientData);
        
        const updatedFboData = await selectedFbo.save();
        

        if (!updatedFboData) {
            return res.status(404).json({ success, message: 'FBO not found' });
        }

        success = true;
        return res.status(200).json({ success, message: 'Recipients added successfully', data: updatedFboData.recipientDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
