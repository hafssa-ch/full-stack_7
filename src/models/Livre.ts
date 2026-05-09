
import mongoose, { Document, Schema } from 'mongoose';

export interface ILivre extends Document {
  titre: string;
  auteur: mongoose.Types.ObjectId;
  isbn: string;
  anneePublication: number;
  genre: string[];
  resume?: string;
  disponible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LivreSchema: Schema = new Schema(
  {
    titre: { type: String, required: true, trim: true, maxlength: 100 },
    auteur: { type: Schema.Types.ObjectId, ref: 'Auteur', required: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    anneePublication: { type: Number, required: true, min: 1000, max: new Date().getFullYear() },
    genre: {
      type: [String],
      required: true,
      enum: ['Roman', 'Science-Fiction', 'Fantastique', 'Policier', 'Biographie', 'Histoire', 'Philosophie', 'Poésie', 'Théâtre', 'Jeunesse', 'Autre']
    },
    resume: { type: String, trim: true, maxlength: 2000 },
    disponible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

LivreSchema.index({ titre: 1 });
LivreSchema.index({ isbn: 1 });
LivreSchema.index({ auteur: 1 });

export default mongoose.model<ILivre>('Livre', LivreSchema);