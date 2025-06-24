import vine from '@vinejs/vine'
import { customErrorReporter } from "./customErrorReporter.js";

vine.errorReporter =()=> new customErrorReporter();

export const newsSchemaValidator = vine.object({
    title :vine.string().maxLength(190).minLength(5),
    content :vine.string().minLength(16),

})