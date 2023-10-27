const { foscosModel, fostacModel, fboModel } = require('../models/fboSchema');
const pastFboSchema = require('../models/pastFboSchema');
const { generateFssaiID } = require('./empGenerator');
const { generateInvoice } = require('./invoiceGenerate')


//Controller for FBO Registration
exports.fboRegister = async (req, res) => {
  try {
    let success = false;
    let isUnique = false;

    // Fields to be used for FBO form
    const { fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, client_type, recipient_no, water_test_fee, payment_mode, createdBy, license_category, license_duration, total_amount } = req.body;

    // To check if fbo name is already in use
    const existing_fbo = await fboModel.findOne({ fbo_name });
    if (existing_fbo) {
      return res.status(401).json({ success, message: "This fbo is already in use." });
    }

    // To check if owner name is already in use
    const existing_owner_name = await fboModel.findOne({ owner_name });
    if (existing_owner_name) {
      return res.status(401).json({ success, message: "This owner name is already in use." });
    }

    // To check if owner contact is already in use
    const existing_owner_contact = await fboModel.findOne({ owner_contact });
    if (existing_owner_contact) {
      return res.status(401).json({ success, message: "This owner contact is already in use." });
    }

    // To check if email is already in use
    const existing_email = await fboModel.findOne({ email });
    if (existing_email) {
      return res.status(401).json({ success, message: "This email is already in use." });
    }

    let idNumber;

    while (!isUnique) {
      idNumber = Math.floor(10000 + Math.random() * 90000);
      const existingNumber = await fboModel.findOne({ id_num: idNumber });
      if (!existingNumber) {
        isUnique = true;
      }
    }

    // Calling function for generating FSSAI id
    const generatedFssaiId = generateFssaiID(idNumber, product_name);

    let date = new Date();

    // Determine the model based on the product_name
    let selectedModel;
    if (product_name === 'Foscos Training') {
      selectedModel = foscosModel;
    } else {
      selectedModel = fostacModel;
    }
    // Create a document using the selected model
    await selectedModel.create({
      id_num: idNumber, fbo_name, owner_name, owner_contact, email, state, district, address, product_name, processing_amount, service_name, fssai_id: generatedFssaiId, client_type, recipient_no, water_test_fee, createdAt: date, payment_mode, createdBy, license_category, license_duration, total_amount
    });

    const invoiceData = {
      "currency": "INR", 
      "taxNotation": "gst",
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "sender": {
        "company": "Sample Company",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
      },
      "client": {
        "company": fbo_name,
        "address": address,
        "zip": "5678 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
      },
      "invoiceNumber": idNumber,
      "invoiceDate": date.toISOString(),
      "products": [
        {
          "quantity": 1,
          "description": product_name,
          "tax": 0,
          "price": total_amount
        }
      ],
      "bottomNotice": "Kindly pay your invoice within 15 days.",
    }

    await generateInvoice(idNumber, invoiceData);

    success = true;
    return res.status(201).json({ success, message: "FBO Registration Successful" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Controller for deleting FBO
exports.deleteFbo = async(req, res)=>{
    const objId =  req.params.id;
    let success = false;

    let date = new Date();

    try {
        const deletedFbo = await fboModel.findByIdAndDelete(objId);
        if(deletedFbo){

            const {_id, ...pastFbo} = deletedFbo.toObject();
            const{ deletedBy } = req.body;

            await pastFboSchema.create({...pastFbo, deletedAt: date, deletedBy: deletedBy}) //Adding deleted fbo to past fbo data

            success = true;
            return res.status(200).json({success, deletedFbo});
        }else{
            success = false;
            return res.status(401).json({success, message: "Fbo Not Found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

//Controller for editing FBO data
exports.editFbo = async(req, res)=>{

    try {

        let objId = req.params.id;
        let success = false;

        const updatedFboData = req.body;
        const editedBy = req.body.editedBy

        const updatedFbo = await fboModel.findByIdAndUpdate(objId, {...updatedFboData, lastEdit: editedBy}, {new: true});

        if(!updatedFbo){
            success = false;
            return res.status(401).json({success, message: "Employee Not Found"});
        }

        success = true;
        return res.status(201).json({success, updatedFbo})

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

//Controller to get all FBO Data
exports.allFBOData  = async(req, res)=>{
    try {
        const fboData = await fboModel.find({createdBy: `${req.user.employee_name}(${req.user.employee_id})`});
        return res.status(200).json({fboData});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

