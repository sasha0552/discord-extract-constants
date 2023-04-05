const fs = require("fs");
const path = require("path");

///// ///// /////

const acorn = require("acorn-loose");
const awalk = require("acorn-walk");
const astring = require("astring");

///// ///// /////

const constants = require("../src/constants.js");

///// ///// ///// ///// /////

function main() {
    const results = [];

    /////

    for (const fileName of fs.readdirSync(constants.CONSTS_SWITCH_CASE)) {
        const fileContent = fs.readFileSync(path.join(constants.CONSTS_SWITCH_CASE, fileName));

        /////

        const $ = acorn.parse(fileContent, { ecmaVersion: "latest" });

        /////

        awalk.full($, (node) => {
            let isGatewayDispatchEventsNode = false;

            /////

            if (constants.COMPARER_SWITCH_CASE(node)) {
                for (const _case of node.cases) {
                    if (constants.COMPARER_RS_IN_DISPATCH_EVENTS(_case)) {
                        isGatewayDispatchEventsNode = true;
                    }
                }
            }

            /////

            if (isGatewayDispatchEventsNode) {
                const result = [];

                /////

                for (const _case of node.cases) {
                    result.push(
                        _case.test.value
                    );
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
        fs.writeFileSync(path.join(constants.CONSTS_RESULTS, `gateway-dispatch-events-${i}.json`), JSON.stringify(results[i]));
    }    
}

///// ///// ///// ///// /////

main();
