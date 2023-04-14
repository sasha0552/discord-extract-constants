const messages = [];
const enums = [];

///// ///// ///// ///// /////

window.webpackChunkdiscord_app.push([ [ Math.random() ], {},
    (req) => {
        const cache = req.c;

        ///// ///// /////

        for (const cacheEntry of Object.values(cache)) {
            const { exports } = cacheEntry;

            /////

            if (typeof exports === "object") {
                for (const exportsEntry of Object.values(exports)) {
                    if (typeof exportsEntry === "object") {
                        if (exportsEntry !== null) {
                            if (typeof exportsEntry.typeName === "string") {
                                if (exportsEntry.typeName.startsWith("discord_protos")) {
                                    messages.push(exportsEntry);
                                }
                            }
                        }
                    }
                }
            }
        }

        ///// ///// /////

        for (const message of messages) {
            for (const field of message.fields) {
                if (field.kind === "message") {
                    const type = field.T();

                    /////

                    let alreadyPresent = false;

                    /////

                    for (const message of messages) {
                        if (type.typeName === message.typeName) {
                            alreadyPresent = true;
                        }
                    }

                    /////

                    if (!alreadyPresent) {
                        if (type.typeName.startsWith("discord_protos")) {
                            messages.push(type);
                        }
                    }
                }
            }
        }

        ///// ///// /////

        for (const message of messages) {
            for (const field of message.fields) {
                if (field.kind === "enum") {
                    enums.push(field.T());
                }
            }
        }
    }
]);
