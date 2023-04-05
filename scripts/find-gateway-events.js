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

    for (const fileName of fs.readdirSync(constants.CONSTS_RESOLVER)) {
        const fileContent = fs.readFileSync(path.join(constants.CONSTS_RESOLVER, fileName));

        /////

        const $ = acorn.parse(fileContent, { ecmaVersion: "latest" });

        /////

        awalk.full($, (node) => {
            let isGatewayEventsNode = false;

            /////

            if (constants.COMPARER_RESOLVER(node)) {
                for (const stmt of node.argument.callee.body.body) {
                    if (constants.COMPARER_RGM_IN_GATEWAY_EVENTS(stmt)) {
                        isGatewayEventsNode = true;
                    }
                }
            }

            /////

            if (isGatewayEventsNode) {
                const result = [];

                /////

                for (const stmt of node.argument.callee.body.body) {
                    result.push([
                        stmt.expression.left.property.right.value,
                        stmt.expression.left.property.left.property.name
                    ]);
                }

                /////

                results.push(
                    result
                );
            }
        });
    }

    /////

    fs.mkdirSync(constants.CONSTS_RESULTS, { recursive: true });

    /////

    for (let i = 0; i < results.length; i++) {
        fs.writeFileSync(path.join(constants.CONSTS_RESULTS, `gateway-events-${i}.json`), JSON.stringify(results[i]));
    }    
}

///// ///// ///// ///// /////

main();
