import Joi from "joi";

const task = {
  project_id: Joi.string().allow(null).optional().empty(null).messages({
    "string.base": "Project ID must be a string",
  }),
  name: Joi.string().min(1).max(255).required().messages({
    "string.base": "Task name must be a string.",
    "string.empty": "Task name cannot be empty.",
    "string.min": "Task name must be at least 1 character long.",
    "string.max": "Task name must not exceed 255 characters.",
    "any.required": "Task name is required.",
  }),
  description: Joi.string()
    .allow(null)
    .optional()
    .max(1000)
    .empty("")
    .messages({
      "string.base": "Description must be a string.",
      "string.max": "Description must not exceed 1000 characters.",
    }),
  due_date: Joi.date()
    .iso()
    .greater("now")
    .allow(null)
    .optional()
    .empty(null)
    .messages({
      "date.base": "Due date must be a valid date.",
      "date.format": "Due date must be in ISO 8601 format.",
      "date.greater": "Due date must be in the future.",
    }),
  completed_on: Joi.date()
    .iso()
    .max("now")
    .allow(null)
    .optional()
    .empty(null)
    .messages({
      "date.base": "Completed on date must be a valid date or null.",
      "date.format": "Completed on date must be in ISO 8601 format.",
      "date.max": "Completed on date must be in the past.",
    }),
};

export const createTaskSchema = Joi.object(task);

export const updateTaskSchema = Joi.object({
  ...task,
  name: Joi.string().min(1).max(255).optional().messages({
    "string.base": "Task name must be a string.",
    "string.empty": "Task name cannot be empty.",
    "string.min": "Task name must be at least 1 character long.",
    "string.max": "Task name must not exceed 255 characters.",
  }),
}).or("project_id", "name", "description", "due_date", "completed_on");
