import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { TicketSchema } from '../../ticket/schema/ticket.schema';

export const OrderSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: uuidv4,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    tickets: [TicketSchema],
  },
  { autoCreate: true, autoIndex: true },
);

const Order = model('Order', OrderSchema);
export default Order;
