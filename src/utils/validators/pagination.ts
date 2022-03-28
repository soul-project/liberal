import Joi from "joi";

export const paginationSchema = Joi.object<{
  page: number;
  numItemsPerPage: number;
}>({
  page: Joi.number().min(1).default(1),
  numItemsPerPage: Joi.number().min(1).default(20),
});
