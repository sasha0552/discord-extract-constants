module.exports = function createAstComparer(object) {
    const statements = [];
 
    /////

    function walk(object, path = "node", isArray = false) {
        for (const key in object) {
            const newPath = isArray ? path + "[" + key + "]" : path + "." + key;
            const value = object[key];

            /////

            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    statements.push(
                        `if (!Array.isArray(${newPath})) {\n` +
                        "    return false;\n"                 +
                        "}\n"
                    )

                    statements.push(
                        `if (${newPath}.length !== ${value.length}) {\n` +
                        "    return false;\n"                            +
                        "}\n"
                    )
                } else {
                    if (value === null) {
                        statements.push(
                            `if (${newPath} !== null) {\n` +
                            "    return false;\n"          +
                            "}\n"
                        )
                    } else {
                        statements.push(
                            `if (${newPath} === null) {\n` +
                            "    return false;\n"          +
                            "}\n"
                        )

                        /////

                        statements.push(
                            `if (typeof ${newPath} !== "object") {\n` +
                            "    return false;\n"                     +
                            "}\n"
                        )
                    }
                }

                /////

                walk(value, newPath, Array.isArray(value));
            }

            if (typeof value === "string") {
                statements.push(
                    `if (${newPath} !== "${value}") {\n` +
                    "    return false;\n"                +
                    "}\n"
                )
            }

            if (typeof value === "number" || typeof value === "boolean") {
                statements.push(
                    `if (${newPath} !== ${value}) {\n` +
                    "    return false;\n"              +
                    "}\n"
                )
            }

            if (typeof value === "undefined") {
                statements.push(
                    `if (${newPath} !== undefined) {\n` +
                    "    return false;\n"               +
                    "}\n"
                )
            }
        }
    }

    /////

    walk(object);

    /////

    statements.push("return true;\n");

    /////

    return new Function("node", statements.join("\n"));
}
