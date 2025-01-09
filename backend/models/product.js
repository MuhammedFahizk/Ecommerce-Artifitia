import { Schema, model } from "mongoose";

const productSchema = new Schema({
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    variants: [
      {
        ram: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true }, 
      },
    ],
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export default model('Product', productSchema);
  