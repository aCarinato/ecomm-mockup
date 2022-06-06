import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    nameEN: { type: String, required: true },
    slugEN: { type: String, required: true, unique: true },
    categoryEN: { type: String, required: true },
    descriptionEN: { type: String, required: true },
    nameIT: { type: String, required: true },
    slugIT: { type: String, required: true, unique: true },
    categoryIT: { type: String, required: true },
    descriptionIT: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
