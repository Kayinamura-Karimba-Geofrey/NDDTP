import { InvalidStatusTransitionException } from '../exceptions/domain.exceptions';

export function assertStatusTransition<T extends string>(
  transitions: Record<string, string[]>,
  from: T,
  to: T,
  entity = 'resource',
): void {
  const allowed = transitions[from] || [];
  if (!allowed.includes(to)) {
    throw new InvalidStatusTransitionException(from, to, entity);
  }
}
