"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertStatusTransition = assertStatusTransition;
const domain_exceptions_1 = require("../exceptions/domain.exceptions");
function assertStatusTransition(transitions, from, to, entity = 'resource') {
    const allowed = transitions[from] || [];
    if (!allowed.includes(to)) {
        throw new domain_exceptions_1.InvalidStatusTransitionException(from, to, entity);
    }
}
//# sourceMappingURL=status-transition.util.js.map