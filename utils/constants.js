module.exports = {
 CODES: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    VALIDATION_FAILED: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SOMETHING_WENT_WRONG: 412,
    SUCCESS: 200,
    CREATED: 201,
    SUCCESS_WITHOUT_ENTITY: 204,
  },
  MESSAGES: {
    GENERAL: {
      SUCCESS: "Successfully fetched data",
      CREATED: "Successfully created data",
      SOMETHING_WENT_WRONG: "Sorry, something went wrong.",
      VALIDATION_FAILED: "Request data is invalid.",
      USER_NOT_ACCESS_TO_CHANGE_STATUS: "You dont have permission to change the status.",
      VALID_LICENSE_NOT_EXIST: "Valid license does not exist.",
      STATUS_UPDATED: "Status updated successfully.",
      UNAUTHORIZED_ACCESS: "Unauthorized access",
      FAILED_TO_GET_DETAILS: "Failed to get details.",
    },
  }
 };
