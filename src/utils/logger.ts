import pino from "pino";
import pretty from "pino-pretty";

const logger = (name: string) => pino({ name }, pretty({}));

export default logger;
