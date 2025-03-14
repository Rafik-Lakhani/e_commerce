import mongoose from 'mongoose';

const userAddresSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, default: 'home' },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    state: { type: String, required: true },
    country : { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    isDefault: { type: Boolean, required: true, default: false },
    updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model('UserAddress', userAddresSchema);