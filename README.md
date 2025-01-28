# http-status-lite

A collection of commonly used HTTP status codes for applications. This package helps standardize HTTP status code handling in your project by providing a predefined, immutable set of constants.

---

### Requirements to Use the Package

- [NodeJS](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/) (optional but recommended)

---

### 🚀 Installation

To install the package in your project, run:

```bash
npm install http-status-lite
```

---

### 🛠️ Usage

1. **Import the Constants:**

    You can import all HTTP status code constants into your project:

    ```javascript
    import httpStatusLite from 'http-status-lite';

    console.log(httpStatusLite.OK); // Outputs: 200
    ```

2. **TypeScript Support:**

    The package includes TypeScript types for strict type checking:

    ```typescript
    import httpStatusLite, { HttpStatusType } from 'http-status-lite';

    const successStatus: HttpStatusType = 'OK';
    console.log(httpStatusLite[successStatus]); // Outputs: 200
    ```

3. **Example Usage in a Node.js Server:**

    ```javascript
    import httpStatusLite from 'http-status-lite';

    const express = require('express');
    const app = express();

    app.get('/status', (req, res) => {
        res.status(httpStatusLite.OK).json({ message: 'All good!' });
    });

    app.listen(3000, () => console.log('Server running on port 3000'));
    ```

---

### HTTP Status Code Categories

- **Informational (100–199):**

    - `CONTINUE`: 100
    - `SWITCHING_PROTOCOLS`: 101
    - `PROCESSING`: 102
    - `EARLY_HINTS`: 103

- **Successful (200–299):**

    - `OK`: 200
    - `CREATED`: 201
    - `ACCEPTED`: 202
    - `NON_AUTHORITATIVE_INFORMATION`: 203
    - `NO_CONTENT`: 204
    - `RESET_CONTENT`: 205
    - `PARTIAL_CONTENT`: 206
    - `MULTI_STATUS`: 207
    - `ALREADY_REPORTED`: 208
    - `IM_USED`: 226

- **Redirection (300–399):**

    - `MULTIPLE_CHOICES`: 300
    - `MOVED_PERMANENTLY`: 301
    - `FOUND`: 302
    - `SEE_OTHER`: 303
    - `NOT_MODIFIED`: 304
    - `USE_PROXY`: 305 (Deprecated)
    - `UNUSED`: 306
    - `TEMPORARY_REDIRECT`: 307
    - `PERMANENT_REDIRECT`: 308

- **Client Error (400–499):**

    - `BAD_REQUEST`: 400
    - `UNAUTHORIZED`: 401
    - `PAYMENT_REQUIRED`: 402
    - `FORBIDDEN`: 403
    - `NOT_FOUND`: 404
    - `METHOD_NOT_ALLOWED`: 405
    - `NOT_ACCEPTABLE`: 406
    - `PROXY_AUTHENTICATION_REQUIRED`: 407
    - `REQUEST_TIMEOUT`: 408
    - `CONFLICT`: 409
    - `GONE`: 410
    - `LENGTH_REQUIRED`: 411
    - `PRECONDITION_FAILED`: 412
    - `PAYLOAD_TOO_LARGE`: 413
    - `URI_TOO_LONG`: 414
    - `UNSUPPORTED_MEDIA_TYPE`: 415
    - `RANGE_NOT_SATISFIABLE`: 416
    - `EXPECTATION_FAILED`: 417
    - `IM_A_TEAPOT`: 418
    - `MISDIRECTED_REQUEST`: 421
    - `UNPROCESSABLE_ENTITY`: 422
    - `LOCKED`: 423
    - `FAILED_DEPENDENCY`: 424
    - `TOO_EARLY`: 425
    - `UPGRADE_REQUIRED`: 426
    - `PRECONDITION_REQUIRED`: 428
    - `TOO_MANY_REQUESTS`: 429
    - `REQUEST_HEADER_FIELDS_TOO_LARGE`: 431
    - `UNAVAILABLE_FOR_LEGAL_REASONS`: 451

- **Server Error (500–599):**
    - `INTERNAL_SERVER_ERROR`: 500
    - `NOT_IMPLEMENTED`: 501
    - `BAD_GATEWAY`: 502
    - `SERVICE_UNAVAILABLE`: 503
    - `GATEWAY_TIMEOUT`: 504
    - `HTTP_VERSION_NOT_SUPPORTED`: 505
    - `VARIANT_ALSO_NEGOTIATES`: 506
    - `INSUFFICIENT_STORAGE`: 507
    - `LOOP_DETECTED`: 508
    - `NOT_EXTENDED`: 510
    - `NETWORK_AUTHENTICATION_REQUIRED`: 511

---

### 📖 Author

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/95298623?v=4" width="100px" alt="Moon">
      <a href="https://github.com/montasim">
        <br>
          Ｍ♢ＮＴⓇＳＨＮＭ
        </br>
      </a>
    </td>
  </tr>
</table>
