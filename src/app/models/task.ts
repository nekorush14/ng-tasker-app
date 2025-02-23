/**
 * Task model.
 *
 * @property id Task ID.
 * @property name Task name.
 * @property completed Task completion status.
 */
export interface Task {
  /**
   * Task ID.
   */
  id: number;

  /**
   * Task name.
   */
  name: string;

  /**
   * Task completion status.
   */
  completed: boolean;
}
