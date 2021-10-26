import mongoose from 'mongoose';

const item = new mongoose.Schema({
    itemName: String,
    description: String,
    itemAmount: {
        type: Number,
        default: 1
    },
    purchased: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Items", item); //('Collection Name', Collection Object / Defined as);