import Joi from 'joi'

// [PUT] /user/cart
export const schemaUpdateCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string(),
  count: Joi.number().min(1),
  action: Joi.string().required(),
})
