function getProtoName(object, fullPackage) {
    let _ = "";

    /////

    if (Array.isArray(object)) {
        _ = object[0]
    } else {
        _ = object["typeName"]
    }

    /////

    if (fullPackage) {
        return _;
    } else {
        return _
            .split(".")
            .at(-1);
    }
}

///// ///// /////

// https://github.com/timostamm/protobuf-ts/blob/c559c0d920ee50b9b54d2f8fff6a7d59b46a3f50/packages/runtime/src/reflection-info.ts#L309
function getScalarType(T) {
    return (
        {
            1: "double",
            2: "float",
            3: "int64",
            4: "uint64",
            5: "int32",
            6: "fixed64",
            7: "fixed32",
            8: "bool",
            9: "string",
            12: "bytes",
            13: "uint32",
            15: "sfixed32",
            16: "sfixed64",
            17: "sint32",
            18: "sint64",
        }
    )[T];
}

///// ///// /////

// https://github.com/timostamm/protobuf-ts/blob/c559c0d920ee50b9b54d2f8fff6a7d59b46a3f50/packages/runtime/src/reflection-info.ts#L402
function getFieldPrefix(field) {
    const prefixes = [];

    switch (field.repeat) {
        case 1: {
            prefixes.push("repeated");
        } break;

        case 2: {
            prefixes.push("repeated");
        } break;
    }

    return prefixes.join(" ");
}

// https://github.com/timostamm/protobuf-ts/blob/c559c0d920ee50b9b54d2f8fff6a7d59b46a3f50/packages/runtime/src/reflection-info.ts#L147
function getFieldType(field) {
    switch (field.kind) {
        case "scalar": {
            return getScalarType(field.T);
        }

        case "message": {
            return getProtoName(field.T(), true);
        }

        case "enum": {
            return getProtoName(field.T(), true);
        }

        case "map": {
            const K = getScalarType(field.K);
            const V = getFieldType(field.V);

            return `map<${K}, ${V}>`;
        }

        default: {
            console.error("unknown kind: %s", field.kind);
        } break;
    }
}

// https://github.com/timostamm/protobuf-ts/blob/c559c0d920ee50b9b54d2f8fff6a7d59b46a3f50/packages/runtime/src/reflection-info.ts#L402
function getFieldSuffix(field) {
    const suffixes = [];

    switch (field.repeat) {
        case 2: {
            suffixes.push("[packed = false]");
        } break;
    }

    return suffixes.join(" ");
}
