import Joi from 'joi'

// [PUT] /user/cart
export const schemaUpdateCart = Joi.object({
  userId: Joi.string().required(),
  isDeleted: Joi.boolean(),
})
