
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUtilisateur extends Document {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: 'utilisateur' | 'bibliothecaire' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UtilisateurSchema: Schema = new Schema(
  {
    nom: { type: String, required: true, trim: true, maxlength: 50 },
    prenom: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['utilisateur', 'bibliothecaire', 'admin'], default: 'utilisateur' }
  },
  { timestamps: true }
);

UtilisateurSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UtilisateurSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUtilisateur>('Utilisateur', UtilisateurSchema);