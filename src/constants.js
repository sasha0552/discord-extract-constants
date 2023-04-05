const path = require("path");

///// ///// /////

const createAstComparer = require("./utils/ast-comparer.js");

///// ///// ///// ///// /////

const COMPARER_OBJECT_FREEZE  = createAstComparer(require("./ast/object-freeze.json"));
const COMPARER_RESOLVER       = createAstComparer(require("./ast/resolver.json"));
const COMPARER_SWITCH_CASE    = createAstComparer(require("./ast/switch-case.json"));

///// ///// /////

const COMPARER_USER_IN_ROUTES           = createAstComparer(require("./ast/partial/user-in-routes.json"));
const COMPARER_SPEAKING_IN_VOICE_EVENTS = createAstComparer(require("./ast/partial/speaking-in-voice-events.json"));
const COMPARER_RGM_IN_GATEWAY_EVENTS    = createAstComparer(require("./ast/partial/rgm-in-gateway-events.json"));
const COMPARER_RS_IN_DISPATCH_EVENTS    = createAstComparer(require("./ast/partial/rs-in-dispatch-events.json"));

///// ///// /////

const CONSTS_OBJECT_FREEZE = path.resolve(__dirname, "..", "out", "constants", "object_freeze");
const CONSTS_RESOLVER      = path.resolve(__dirname, "..", "out", "constants", "resolver");
const CONSTS_SWITCH_CASE   = path.resolve(__dirname, "..", "out", "constants", "switch_case");

///// ///// /////

const CONSTS_RESULTS       = path.resolve(__dirname, "..", "out", "results");

///// ///// ///// ///// /////

module.exports = {
    COMPARER_OBJECT_FREEZE,
    COMPARER_RESOLVER,
    COMPARER_SWITCH_CASE,
    COMPARER_USER_IN_ROUTES,
    COMPARER_SPEAKING_IN_VOICE_EVENTS,
    COMPARER_RGM_IN_GATEWAY_EVENTS,
    COMPARER_RS_IN_DISPATCH_EVENTS,
    CONSTS_OBJECT_FREEZE,
    CONSTS_RESOLVER,
    CONSTS_SWITCH_CASE,
    CONSTS_RESULTS,
}
