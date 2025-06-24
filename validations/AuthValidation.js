import vine from '@vinejs/vine'
import { customErrorReporter } from "./customErrorReporter.js";

vine.errorReporter =()=> new customErrorReporter();
// vine.errorReporter =new customErrorReporter();

export const AuthSchemaValidator = vine.object({
    name: vine.string().minLength(3).maxLength(191),
    email : vine.string().email(),
    password :vine.string().minLength(6).confirmed(),
})

export const LoginSchemaValidator = vine.object({
    email : vine.string().email(),
    password :vine.string().minLength(6),
})


