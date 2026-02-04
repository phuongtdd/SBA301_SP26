/**
 * Validation Utility Functions
 * Provides reusable validation functions for form inputs
 */

/**
 * Check if a value is empty (null, undefined, or empty string after trim)
 */
export const isEmpty = (value) => {
    return value === null || value === undefined || String(value).trim() === '';
};

/**
 * Required field validation
 * @param {string} fieldName - Name of the field for error message
 * @returns {function} Validator function
 */
export const isRequired = (fieldName = 'This field') => (value) => {
    if (isEmpty(value)) {
        return `${fieldName} is required`;
    }
    return null;
};

/**
 * Minimum length validation
 * @param {number} min - Minimum length
 * @param {string} fieldName - Name of the field for error message
 * @returns {function} Validator function
 */
export const minLength = (min, fieldName = 'This field') => (value) => {
    if (!isEmpty(value) && String(value).trim().length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }
    return null;
};

/**
 * Maximum length validation
 * @param {number} max - Maximum length
 * @param {string} fieldName - Name of the field for error message
 * @returns {function} Validator function
 */
export const maxLength = (max, fieldName = 'This field') => (value) => {
    if (!isEmpty(value) && String(value).trim().length > max) {
        return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
};

/**
 * Email format validation
 * @returns {function} Validator function
 */
export const isEmail = () => (value) => {
    if (isEmpty(value)) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(value).trim())) {
        return 'Please enter a valid email address';
    }
    return null;
};

/**
 * Validate a value against multiple validators
 * @param {*} value - The value to validate
 * @param {Array<function>} validators - Array of validator functions
 * @returns {string|null} First error message or null if valid
 */
export const validate = (value, validators) => {
    for (const validator of validators) {
        const error = validator(value);
        if (error) {
            return error;
        }
    }
    return null;
};

/**
 * Validate an entire form object
 * @param {Object} formData - The form data object
 * @param {Object} validationRules - Object with field names as keys and arrays of validators as values
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateForm = (formData, validationRules) => {
    const errors = {};

    for (const [field, validators] of Object.entries(validationRules)) {
        const error = validate(formData[field], validators);
        if (error) {
            errors[field] = error;
        }
    }

    return errors;
};

/**
 * Check if there are any errors in the errors object
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} True if there are errors
 */
export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};
