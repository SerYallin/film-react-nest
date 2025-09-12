import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const TicketSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: uuidv4,
      index: true,
    },
    film: {
      type: String,
      required: true,
      ref: 'Film',
    },
    session: {
      type: String,
      required: true,
      ref: 'Schedule',
    },
    daytime: {
      type: String,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { autoCreate: true, autoIndex: true },
);
export default TicketSchema;
