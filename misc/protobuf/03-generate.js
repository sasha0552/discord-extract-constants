const lines = [];

///// ///// ///// ///// /////

lines.push('syntax = "proto3";');
lines.push("package discord_protos.discord_users.v1;");
lines.push("");
lines.push('import "google/protobuf/timestamp.proto";');
lines.push('import "google/protobuf/wrappers.proto";');
lines.push("");

///// ///// /////

for (const enum0 of enums) {
    if (enum0[0].startsWith("discord_protos.discord_users.v1")) {
        const enumName = getProtoName(enum0, false);

        /////

        lines.push(`enum ${enumName} {`);

        /////

        for (const field of Object.entries(enum0[1])) {
            if (typeof field[1] === "number") {
                lines.push(`    ${field[0]} = ${field[1]};`);
            };
        }

        /////

        lines.push("}");
        lines.push("");
    } else {
        console.warn("unknown enum [0]: %s", enum0[0]);
    }
}

///// ///// /////

for (const message of messages) {
    if (message.typeName.startsWith("discord_protos.discord_users.v1")) {
        const messageName = getProtoName(message, false);

        /////

        lines.push(`message ${messageName} {`);

        /////

        for (const field of message.fields) {
            let prefix = getFieldPrefix(field), type = getFieldType(field), suffix = getFieldSuffix(field);

            /////

            prefix = prefix !== "" ? (prefix + " ") : prefix;
            suffix = suffix !== "" ? (" " + suffix) : suffix;

            /////

            lines.push(`    ${prefix}${type} ${field.name} = ${field.no}${suffix};`);
        }

        /////

        lines.push("}");
        lines.push("");
    } else {
        console.warn("unknown message typeName: %s", message.typeName);
    }
}

///// ///// /////

console.log(lines.join("\n"));