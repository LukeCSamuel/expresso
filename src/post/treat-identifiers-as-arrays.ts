import { JsonLogicSome, JsonLogicVar, RulesLogic } from 'json-logic-js';

function isIdentifierRule (rule: RulesLogic): rule is JsonLogicVar {
  return !!rule && typeof rule === 'object' && 'var' in rule;
}

function isSuitableParent (rule: RulesLogic): boolean {
  return typeof rule === 'object' && (
    '==' in rule
    || '===' in rule
    || '!=' in rule
    || '!==' in rule
    || '<' in rule
    || '<=' in rule
    || '>' in rule
    || '>=' in rule
    || 'in' in rule
  );
}

/**
 * Transforms the logic tree to wrap identifiers with `some` rules to allow identifiers to alias an array of values.
 * 
 * *This transform is experimental!*  It may not work correctly for all expressions.
*/
export function treatIdentifiersAsArrays (rule: RulesLogic, parent?: RulesLogic & object) {
  // TODO: this won't work correctly if multiple identifiers are used in the same operation
  if (parent && isIdentifierRule(rule) && isSuitableParent(parent)) {
    // transform to use `some` rule
    const parentCopy = { ...parent };
    // we need to change the parent rule to a "some" rule
    for (const key of Object.keys(parent)) {
      delete parent[key];
    }
    (parent as JsonLogicSome).some = [
      rule,
      parentCopy,
    ];
    // finally, replace the identifier rule in the parent copy with a scoped identifier
    for (const [key, value] of Object.entries(parentCopy)) {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] === rule) {
            parentCopy[key][i] = { var: '' };
          }
        }
      } else if (value === rule) {
        parentCopy[key] = { var: '' };
      }
    }
  } else if (!!rule && typeof rule === 'object') {
    // recurse over the rule's operands
    for (const value of Object.values(rule)) {
      if (Array.isArray(value)) {
        for (const entry of value) {
          treatIdentifiersAsArrays(entry, rule);
        }
      } else {
        treatIdentifiersAsArrays(value, rule);
      }
    }
  }
}
