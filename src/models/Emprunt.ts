
import mongoose, { Document, Schema } from 'mongoose';

export interface IEmprunt extends Document {
  livre: mongoose.Types.ObjectId;
  utilisateur: mongoose.Types.ObjectId;
  dateEmprunt: Date;
  dateRetourPrevue: Date;
  dateRetourEffective?: Date;
  statut: 'emprunte' | 'rendu' | 'en_retard';
  createdAt: Date;
  updatedAt: Date;
}

const EmpruntSchema: Schema = new Schema(
  {
    livre: { type: Schema.Types.ObjectId, ref: 'Livre', required: true },
    utilisateur: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    dateEmprunt: { type: Date, default: Date.now },
    dateRetourPrevue: { type: Date, required: true },
    dateRetourEffective: Date,
    statut: { type: String, enum: ['emprunte', 'rendu', 'en_retard'], default: 'emprunte' }
  },
  { timestamps: true }
);

EmpruntSchema.pre<IEmprunt>('save', function(next) {
  if (this.statut === 'rendu') return next();
  const now = new Date();
  this.statut = now > this.dateRetourPrevue ? 'en_retard' : 'emprunte';
  next();
});

EmpruntSchema.index({ livre: 1, utilisateur: 1, statut: 1 });

export default mongoose.model<IEmprunt>('Emprunt', EmpruntSchema);