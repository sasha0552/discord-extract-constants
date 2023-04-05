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
    const results = [];

    /////

    for (const fileName of fs.readdirSync(constants.CONSTS_OBJECT_FREEZE)) {
        const fileContent = fs.readFileSync(path.join(constants.CONSTS_OBJECT_FREEZE, fileName));

        /////

        const $ = acorn.parse(fileContent, { ecmaVersion: "latest" });

        /////

        awalk.full($, (node) => {
            let isRoutesNode = false;

            /////

            if (constants.COMPARER_OBJECT_FREEZE(node)) {
                if (node.arguments[0].type !== "ObjectExpression") {
                    return;
                }

                for (const property of node.arguments[0].properties) {
                    if (constants.COMPARER_USER_IN_ROUTES(property)) {
                        isRoutesNode = true;
                    }
                }
            }

            /////

            if (isRoutesNode) {
                results.push(
                    astring.generate(node)
                );
            }
        });
    }

    /////

    fs.mkdirSync(constants.CONSTS_RESULTS, { recursive: true });

    /////

    for (let i = 0; i < results.length; i++) {
        fs.writeFileSync(path.join(constants.CONSTS_RESULTS, `routes-${i}.js`), results[i]);
    }    
}

///// ///// ///// ///// /////

main();
