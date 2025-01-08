import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null, 
  },
});

export default model('Category', categorySchema);
