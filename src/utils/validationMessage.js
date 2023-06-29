import { message } from "antd";

export const validationMessage = (text) => message.error(`Silahkan isi ${text} terlebih dahulu`);
