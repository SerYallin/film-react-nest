import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleSchema } from '../../schedule/schema/schedule.schema';
export const FilmSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    schedule: [ScheduleSchema],
  },
  {
    autoCreate: true,
    autoIndex: true,
  },
);

const Film = model('Film', FilmSchema);
export default Film;
