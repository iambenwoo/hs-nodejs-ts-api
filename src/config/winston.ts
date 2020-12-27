import { createLogger, transports, format, Logger } from 'winston';

import path from 'path';

// Return the last folder name in the path and the calling
// module's filename.
const getLabel = function (callingModule: any) {
    const parts = callingModule.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
};

export default function (callingModule: any): Logger {
    return createLogger({
        format: format.combine(
            format.label({ label: getLabel(callingModule) }),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json(),
        ),
        transports: [new transports.Console()],
    });
}
