import mongoose, { Schema, Types } from 'mongoose';

export interface IAuditLog {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  action: string; // e.g., USER_LOGIN, QUIZ_SUBMIT
  metadata?: Record<string, any>;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
