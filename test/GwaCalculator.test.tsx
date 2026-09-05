import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { GwaCalculator, calculateGwa, type CourseInput } from '../src/components/interactive/GwaCalculator';

describe('GWA Calculator Logic & Component (TDD)', () => {
  describe('calculateGwa pure function', () => {
    it('computes correct weighted average for standard inputs', () => {
      const courses: CourseInput[] = [
        { id: '1', name: 'Financial Accounting 1', units: '3', grade: '1.25' },
        { id: '2', name: 'Intermediate Accounting 1', units: '3', grade: '1.50' },
      ];
      const result = calculateGwa(courses);
      expect(result.totalUnits).toBe(6);
      expect(result.gwa).toBe(1.38); // (3*1.25 + 3*1.50)/6 = 8.25/6 = 1.375 -> 1.38
      expect(result.isValid).toBe(true);
    });

    it('handles decimal grades accurately', () => {
      const courses: CourseInput[] = [
        { id: '1', name: 'Cost Accounting', units: '3', grade: '1.75' },
        { id: '2', name: 'Auditing Theory', units: '3', grade: '2.00' },
        { id: '3', name: 'Taxation Law', units: '3', grade: '1.25' },
      ];
      const result = calculateGwa(courses);
      expect(result.totalUnits).toBe(9);
      // (3*1.75 + 3*2.00 + 3*1.25)/9 = (5.25 + 6.00 + 3.75)/9 = 15/9 = 1.666... -> 1.67
      expect(result.gwa).toBe(1.67);
      expect(result.isValid).toBe(true);
    });

    it('safely handles zero total units without division by zero or NaN', () => {
      const courses: CourseInput[] = [
        { id: '1', name: 'Orientation', units: '0', grade: '1.00' },
      ];
      const result = calculateGwa(courses);
      expect(result.totalUnits).toBe(0);
      expect(result.gwa).toBeNull();
      expect(result.isValid).toBe(true);
      expect(Number.isNaN(result.gwa)).toBe(false);
    });

    it('detects and flags non-numeric or out-of-range entries as invalid', () => {
      const courses: CourseInput[] = [
        { id: '1', name: 'Invalid Course', units: 'abc', grade: '1.50' },
      ];
      const result = calculateGwa(courses);
      expect(result.isValid).toBe(false);
      expect(result.gwa).toBeNull();
    });
  });

  describe('GwaCalculator Component UI & Interactions', () => {
    it('renders initial course rows and zero-state before calculation', () => {
      render(<GwaCalculator />);
      expect(screen.getByRole('heading', { name: /gwa calculator/i })).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText(/course name/i).length).toBeGreaterThanOrEqual(1);
    });

    it('updates computed GWA live as units and grades are typed', async () => {
      const user = userEvent.setup();
      render(<GwaCalculator initialCourses={[
        { id: '1', name: 'Accounting 101', units: '3', grade: '1.25' },
        { id: '2', name: 'Economics 101', units: '3', grade: '1.75' },
      ]} />);

      // (3*1.25 + 3*1.75)/6 = (3.75 + 5.25)/6 = 9/6 = 1.50
      expect(screen.getByTestId('computed-gwa')).toHaveTextContent('1.50');
      expect(screen.getByTestId('total-units')).toHaveTextContent('6');

      // Change grade of first course
      const gradeInputs = screen.getAllByLabelText(/grade/i);
      await user.clear(gradeInputs[0]);
      await user.type(gradeInputs[0], '1.00');

      // (3*1.00 + 3*1.75)/6 = (3.00 + 5.25)/6 = 8.25/6 = 1.38
      expect(screen.getByTestId('computed-gwa')).toHaveTextContent('1.38');
    });

    it('renders inline validation error when non-numeric values are entered without crashing or showing NaN', async () => {
      const user = userEvent.setup();
      render(<GwaCalculator initialCourses={[
        { id: '1', name: 'Course A', units: '3', grade: '1.50' },
      ]} />);

      const unitInput = screen.getByLabelText(/units/i);
      await user.clear(unitInput);
      await user.type(unitInput, 'invalid');

      expect(screen.getByRole('alert')).toHaveTextContent(/please enter valid numbers/i);
      expect(screen.queryByText(/nan/i)).not.toBeInTheDocument();
    });

    it('renders "Threshold TBD" state when DL_GWA_THRESHOLD is null, with no false pass/fail verdict', () => {
      render(<GwaCalculator threshold={null} initialCourses={[
        { id: '1', name: 'Course A', units: '3', grade: '1.25' },
      ]} />);

      expect(screen.getByTestId('dl-eligibility-card')).toHaveTextContent(
        "Threshold TBD — official criteria pending confirmation from the Dean's office."
      );
      expect(screen.queryByText(/eligible for dean's list/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/not eligible/i)).not.toBeInTheDocument();
    });

    it('evaluates eligibility correctly when a numeric threshold is provided', () => {
      // Eligible case: GWA 1.25 <= threshold 1.75
      const { rerender } = render(
        <GwaCalculator threshold={1.75} initialCourses={[
          { id: '1', name: 'Course A', units: '3', grade: '1.25' },
        ]} />
      );
      expect(screen.getByTestId('dl-eligibility-card')).toHaveTextContent(/qualifies for dean's list nomination/i);

      // Ineligible case: GWA 2.25 > threshold 1.75
      rerender(
        <GwaCalculator threshold={1.75} initialCourses={[
          { id: '1', name: 'Course A', units: '3', grade: '2.25' },
        ]} />
      );
      expect(screen.getByTestId('dl-eligibility-card')).toHaveTextContent(/does not meet tentative cutoff/i);
    });

    it('allows adding and removing course rows with a minimum of one row', async () => {
      const user = userEvent.setup();
      render(<GwaCalculator initialCourses={[
        { id: '1', name: 'Course 1', units: '3', grade: '1.50' },
      ]} />);

      const addButton = screen.getByRole('button', { name: /add course/i });
      await user.click(addButton);

      expect(screen.getAllByPlaceholderText(/course name/i)).toHaveLength(2);

      const removeButtons = screen.getAllByRole('button', { name: /remove course/i });
      await user.click(removeButtons[1]);

      expect(screen.getAllByPlaceholderText(/course name/i)).toHaveLength(1);

      // Verify the single remaining row cannot be deleted (button disabled or removed)
      const finalRemoveButton = screen.queryByRole('button', { name: /remove course/i });
      if (finalRemoveButton) {
        expect(finalRemoveButton).toBeDisabled();
      }
    });
  });
});
