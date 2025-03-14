import AddressModel from "../models/userAddress.models.js";


export const getUserAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) return res.status(404).json({ message: "User id not available" });
        const addresses = await AddressModel.find({ userId });
        res.status(200).json({ address: addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export const addUserAddress = async (req, res) => {
    const { userId, type, street, city, state, country, zipCode, isDefault } = req.body;
    console.log(req.body);
    
    try {
        if (!userId || !type || !street || !city || !state || !country || !zipCode || isDefault==undefined) {
            return res.status(400).json({ message: "Invalid Credintails" });
        }
        const newAddress = new AddressModel({ userId, type, street, city, state, country, zipCode, isDefault });
        await newAddress.save();
        res.status(201).json({ address: newAddress });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateUserAddress = async (req, res) => {

    const { userId, type, street, city, state, country, zipCode, isDefault, addressId } = req.body;
    try {
        if (!userId || !type || !street || !city || !state || !country || !zipCode || isDefault==undefined || !addressId) {
            return res.status(400).json({ message: "Invalid Credintails" });
        }
        const address = await AddressModel.findOneAndUpdate({ userId, _id: addressId }, {
            type, street, city, state, country, zipCode, isDefault, updatedAt: new Date
        });
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.status(200).json({ address });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteUserAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) return res.status(400).json({ message: "Invalid Credintails" });
        const address = await AddressModel.findOneAndDelete({ userId, _id: addressId });
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}