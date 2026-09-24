/**
 * Application Configuration — HonSoc Website
 * 
 * Shared constants, thresholds, and institutional parameters.
 */

/**
 * Dean's List and Academic Honors Evaluation Parameters
 * Conforming to Batangas State University College of Arts and Sciences standards.
 */
export const DL_CONFIG = {
  MIN_UNITS: 15.0,
  FIRST_HONORS_MAX_GWA: 1.45,
  FIRST_HONORS_MAX_GRADE: 2.00,
  SECOND_HONORS_MAX_GWA: 1.75,
  SECOND_HONORS_MAX_GRADE: 2.25,
  DISQUALIFY_GRADE_THRESHOLD: 2.50,
} as const;

/**
 * Cutoff GWA for Dean's List eligibility (Second Honors upper bound).
 */
export const DL_GWA_THRESHOLD: number = DL_CONFIG.SECOND_HONORS_MAX_GWA;
