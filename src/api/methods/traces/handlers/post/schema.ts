import Joi from "joi";

export const schema = Joi.object({
  ip: Joi.string()
    .required()
    .min(1)
    .when("type", {
      is: "ip",
      then: Joi.string().ip({
        version: ["ipv4"],
      }),
    }),
});