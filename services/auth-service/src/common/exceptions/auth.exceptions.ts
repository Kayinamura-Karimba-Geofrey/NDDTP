import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(message = 'Invalid email or password') {
    super(
      { statusCode: HttpStatus.UNAUTHORIZED, message, error: 'Unauthorized' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class AccountLockedException extends HttpException {
  constructor(lockedUntil?: Date) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Account is locked due to multiple failed login attempts',
        error: 'Forbidden',
        lockedUntil: lockedUntil?.toISOString(),
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class AccountInactiveException extends HttpException {
  constructor(status: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: `Account is ${status.toLowerCase()}`,
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class MfaRequiredException extends HttpException {
  constructor(mfaToken: string) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'MFA verification required',
        error: 'MfaRequired',
        mfaToken,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class InvalidMfaCodeException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid MFA code',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class InvalidRefreshTokenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid or expired refresh token',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class TokenExpiredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Token has expired',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class PasswordResetTokenInvalidException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid or expired password reset token',
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class DuplicateEmailException extends HttpException {
  constructor(email: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `Email ${email} is already registered`,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `${resource} with id ${id} not found`,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
