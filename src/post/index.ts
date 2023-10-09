import { RulesLogic } from 'json-logic-js';

export * from './treat-identifiers-as-arrays';

export type PostCompilationTransform = (logic: RulesLogic) => void
