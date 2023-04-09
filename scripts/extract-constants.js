const fs = require("fs");
const path = require("path");

///// ///// /////

const acorn = require("acorn");
const awalk = require("acorn-walk");
const astring = require("astring");

///// ///// /////

const constants = require("../src/constants.js");

///// ///// ///// ///// /////

function main() {
    const object_freeze = [];
    const resolver = [];
    const switch_case = [];
    const protobuf = [];

    /////

    for (const fileName of fs.readdirSync("assets")) {
        const fileContent = fs.readFileSync(path.join("assets", fileName));

        /////

        const $ = acorn.parse(fileContent, { ecmaVersion: "latest" });

        /////

        awalk.full($, (node) => {
            if (constants.COMPARER_OBJECT_FREEZE(node)) {
                if (node.arguments.length === 1) {
                    object_freeze.push(astring.generate(node));
                } else {
                    console.debug("[%s] (object_freeze) warn: found %d arguments instead of 1, skipping!", fileName, node.arguments.length);
                }
            }

            /////

            if (constants.COMPARER_RESOLVER(node)) {
                resolver.push(astring.generate(node));
            }

            /////

            if (constants.COMPARER_SWITCH_CASE(node)) {
                switch_case.push(astring.generate(node));
            }

            if (constants.COMPARER_PROTOBUF(node)) {
                protobuf.push(astring.generate(node));
            }
        });
    }

    /////

    for (const [ pathName, array ] of
        [
            [ constants.CONSTS_OBJECT_FREEZE, object_freeze ],
            [ constants.CONSTS_RESOLVER, resolver ],
            [ constants.CONSTS_SWITCH_CASE, switch_case ],
            [ constants.CONSTS_PROTOBUF, protobuf ],
        ]
    ) {
        fs.mkdirSync(pathName, { recursive: true });

        /////

        for (let i = 0; i < array.length; i++) {
            fs.writeFileSync(path.join(pathName, `${i}.js`), array[i]);
        }    
    }
}

///// ///// ///// ///// /////

main();
