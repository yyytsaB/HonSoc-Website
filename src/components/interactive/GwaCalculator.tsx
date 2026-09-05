import React, { useState, useId } from 'react';
import { Plus, Trash2, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { DL_GWA_THRESHOLD } from '@/config';

export interface CourseInput {
  id: string;
  name: string;
  units: string;
  grade: string;
}

export interface GwaCalculationResult {
  totalUnits: number;
  gwa: number | null;
  isValid: boolean;
  errorMessage?: string;
}

export function calculateGwa(courses: CourseInput[]): GwaCalculationResult {
  let totalGradePoints = 0;
  let totalUnits = 0;
  let hasInvalidEntry = false;

  for (const course of courses) {
    const trimmedUnits = course.units.trim();
    const trimmedGrade = course.grade.trim();

    // Ignore completely empty rows
    if (!trimmedUnits && !trimmedGrade && !course.name.trim()) {
      continue;
    }

    const units = Number(trimmedUnits);
    const grade = Number(trimmedGrade);

    if (
      trimmedUnits === '' ||
      trimmedGrade === '' ||
      Number.isNaN(units) ||
      Number.isNaN(grade) ||
      units < 0 ||
      grade < 1.0 ||
      grade > 5.0
    ) {
      hasInvalidEntry = true;
      break;
    }

    totalUnits += units;
    totalGradePoints += units * grade;
  }

  if (hasInvalidEntry) {
    return {
      totalUnits: 0,
      gwa: null,
      isValid: false,
      errorMessage: 'Please enter valid numbers for course units (>= 0) and grades (1.00 to 5.00).',
    };
  }

  if (totalUnits === 0) {
    return {
      totalUnits: 0,
      gwa: null,
      isValid: true,
    };
  }

  const computed = totalGradePoints / totalUnits;
  const rounded = Math.round(computed * 100) / 100;

  return {
    totalUnits,
    gwa: rounded,
    isValid: true,
  };
}

export interface GwaCalculatorProps {
  threshold?: number | null;
  initialCourses?: CourseInput[];
}

export const GwaCalculator: React.FC<GwaCalculatorProps> = ({
  threshold = DL_GWA_THRESHOLD,
  initialCourses,
}) => {
  const [courses, setCourses] = useState<CourseInput[]>(() => {
    if (initialCourses && initialCourses.length > 0) {
      return initialCourses;
    }
    return [
      { id: '1', name: 'Intermediate Accounting 1', units: '3', grade: '1.25' },
      { id: '2', name: 'Cost Accounting & Control', units: '3', grade: '1.50' },
      { id: '3', name: 'Conceptual Framework & Acct. Standards', units: '3', grade: '1.75' },
      { id: '4', name: 'Business Taxation', units: '3', grade: '1.50' },
    ];
  });

  React.useEffect(() => {
    if (initialCourses && initialCourses.length > 0) {
      setCourses(initialCourses);
    }
  }, [initialCourses]);

  const baseId = useId();

  const handleFieldChange = (id: string, field: 'name' | 'units' | 'grade', value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAddCourse = () => {
    const newId = String(Date.now());
    setCourses((prev) => [
      ...prev,
      { id: newId, name: '', units: '3', grade: '' },
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const calculation = calculateGwa(courses);

  return (
    <div className="rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-label font-ui font-semibold text-gold-accessible uppercase tracking-wider">
            Academic Tool
          </span>
          <h2 className="text-h2 font-heading text-maroon mt-1">GWA Calculator</h2>
          <p className="text-body-sm text-stone-muted mt-1">
            Compute your semestral General Weighted Average and verify preliminary honors standing.
          </p>
        </div>

        {/* Live Scorecard */}
        <div className="flex items-center gap-4 bg-stone p-4 rounded-card border border-border">
          <div className="text-center">
            <span className="text-label text-stone-muted uppercase font-ui block">Total Units</span>
            <span data-testid="total-units" className="text-h3 font-ui font-bold text-gray-900">
              {calculation.isValid ? calculation.totalUnits : '—'}
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <span className="text-label text-stone-muted uppercase font-ui block">Estimated GWA</span>
            <span
              data-testid="computed-gwa"
              className="text-h3 font-heading font-bold text-maroon"
            >
              {calculation.isValid && calculation.gwa !== null
                ? calculation.gwa.toFixed(2)
                : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Validation Error Alert */}
      {!calculation.isValid && calculation.errorMessage && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-card border border-red-200 bg-red-50 p-4 text-red-800 text-body-sm"
        >
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-semibold block">Input Validation Notice</span>
            <span>{calculation.errorMessage}</span>
          </div>
        </div>
      )}

      {/* Course List Rows */}
      <div className="mt-6 space-y-3">
        <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-2 text-label font-ui font-semibold text-stone-muted uppercase">
          <div className="sm:col-span-6">Course Description</div>
          <div className="sm:col-span-2 text-center">Units</div>
          <div className="sm:col-span-2 text-center">Grade (1.0–5.0)</div>
          <div className="sm:col-span-2 text-center">Action</div>
        </div>

        {courses.map((course, index) => {
          const rowId = `${baseId}-${course.id}`;
          return (
            <div
              key={course.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-card bg-stone border border-border items-center transition-[background-color,border-color] duration-120"
            >
              <div className="sm:col-span-6">
                <label htmlFor={`${rowId}-name`} className="sr-only">
                  Course Name
                </label>
                <input
                  id={`${rowId}-name`}
                  type="text"
                  placeholder="Course name (e.g. Intermediate Accounting)"
                  value={course.name}
                  onChange={(e) => handleFieldChange(course.id, 'name', e.target.value)}
                  className="w-full rounded-card border border-border bg-white px-3 py-2 text-body-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${rowId}-units`} className="sm:sr-only text-body-sm text-stone-muted block mb-1">
                  Units
                </label>
                <input
                  id={`${rowId}-units`}
                  aria-label="Units"
                  type="text"
                  inputMode="decimal"
                  placeholder="3"
                  value={course.units}
                  onChange={(e) => handleFieldChange(course.id, 'units', e.target.value)}
                  className="w-full text-center rounded-card border border-border bg-white px-3 py-2 text-body-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${rowId}-grade`} className="sm:sr-only text-body-sm text-stone-muted block mb-1">
                  Grade
                </label>
                <input
                  id={`${rowId}-grade`}
                  aria-label="Grade"
                  type="text"
                  inputMode="decimal"
                  placeholder="1.25"
                  value={course.grade}
                  onChange={(e) => handleFieldChange(course.id, 'grade', e.target.value)}
                  className="w-full text-center rounded-card border border-border bg-white px-3 py-2 text-body-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                />
              </div>

              <div className="sm:col-span-2 flex justify-center">
                <button
                  type="button"
                  aria-label="Remove course"
                  disabled={courses.length <= 1}
                  onClick={() => handleRemoveCourse(course.id)}
                  className="inline-flex items-center justify-center p-2 rounded-pill text-stone-muted hover:text-red-700 hover:bg-red-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-stone-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-[color,background-color] duration-120"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleAddCourse}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-pill border border-maroon text-maroon hover:bg-maroon-light font-ui text-body-sm font-semibold transition-[color,background-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Course
        </button>

        <span className="text-body-sm text-stone-muted">
          Grading scale: 1.00 (Highest) to 3.00 (Passing), 5.00 (Failing).
        </span>
      </div>

      {/* DL Eligibility Card */}
      <div
        data-testid="dl-eligibility-card"
        className="mt-6 rounded-card border border-border p-4 bg-stone"
      >
        {threshold === null ? (
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-gold-accessible flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="text-label font-ui font-semibold text-gray-900 block uppercase tracking-wider">
                Honors Standing Evaluation
              </span>
              <p className="text-body-sm text-stone-muted mt-0.5">
                Threshold TBD — official criteria pending confirmation from the Dean's office.
              </p>
            </div>
          </div>
        ) : calculation.isValid && calculation.gwa !== null ? (
          calculation.gwa <= threshold ? (
            <div className="flex items-start gap-3 text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-label font-ui font-semibold block uppercase tracking-wider">
                  Honors Eligibility Status
                </span>
                <p className="text-body-sm mt-0.5">
                  Qualifies for Dean's List nomination based on tentative cutoff ({threshold.toFixed(2)}). Official verification subject to collegiate review.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 text-stone-muted">
              <AlertCircle className="h-5 w-5 text-stone-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-label font-ui font-semibold block uppercase tracking-wider text-gray-900">
                  Honors Eligibility Status
                </span>
                <p className="text-body-sm mt-0.5">
                  Does not meet tentative cutoff ({threshold.toFixed(2)}). Continue your academic efforts for upcoming evaluation cycles.
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="flex items-start gap-3 text-stone-muted">
            <Info className="h-5 w-5 text-stone-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-body-sm">
              Complete course units and grades above to preview honors standing against the tentative cutoff ({threshold.toFixed(2)}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
