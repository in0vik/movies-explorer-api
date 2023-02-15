module.exports.regex = {
  link: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
};

module.exports.statusCodes = {
  OK: {
    statusCode: 200,
    message: {
      default: 'OK',
      signOut: 'Sign out',
    },
  },
  created: {
    statusCode: 201,
    message: {
      default: 'User created',
    },
  },
  badRequest: {
    message: {
      default: 'Bad request',
      user: 'Invalid input during creation of user',
      movie: 'Invalid input during creation of movie',
    },
    statusCode: 400,
    name: {
      default: 'badRequest',
      user: 'CastError',
      movie: 'CastError',
      validation: 'ValidationError',
    },
  },
  conflict: {
    message: {
      default: 'Conflict',
      user: 'User already exists',
    },
    statusCode: 409,
    name: 'ValidationError',
  },
  notFound: {
    message: {
      default: 'Not found',
      user: 'Not found user',
      movie: 'No movie with that _id',
    },
    statusCode: 404,
  },
  unauthorized: {
    message: {
      default: 'Unauthorized',
      user: 'Invalid credentials',
      login: 'Login required',
      token: 'Invalid token',
    },
    statusCode: 401,
  },
  forbidden: {
    message: {
      default: 'Forbidden',
      movie: 'No permission to delete this movie',
    },
    statusCode: 403,
  },
  serverError: {
    message: {
      default: 'Internal server error',
    },
    statusCode: 500,
  },
  userExists: {
    message: {
      default: 'User already exists',
    },
    statusCode: 11000,
  },
};

module.exports.validationMessages = {
  movie: {
    image: 'Invalid image URL',
    trailer: 'Invalid trailer URL',
    thumbnail: 'Invalid thumbnail URL',
  },
  user: {
    email: 'Invalid email',
  },
};
