import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const ScheduleSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
      index: true,
    },
    daytime: {
      type: String,
      required: true,
    },
    hall: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taken: {
      type: [String],
      required: false,
    },
  },
  { autoCreate: true, autoIndex: true },
);

// const Schedule = model('Schedule', ScheduleSchema);
export default ScheduleSchema;
