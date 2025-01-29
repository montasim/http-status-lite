# http-status-lite

<!-- repository summary badges start -->
<div>
    <img alt="NPM Version" src="https://badgen.net/npm/v/http-status-lite?label=version&labelColor=EB008B&color=00B8B5">
    <img alt="NPM Downloads" src="https://badgen.net/npm/dm/http-status-lite?label=downloads&labelColor=EB008B&color=00B8B5">
    <img alt="NPM Package" src="https://badgen.net/npm/license/http-status-lite?label=license&labelColor=EB008B&color=00B8B5">
</div>
<!-- repository summary badges end -->

The [http-status-lite](https://www.npmjs.com/package/http-status-lite) is a lightweight and comprehensive utility providing standardized HTTP status codes for applications. It simplifies the handling of HTTP response codes by offering predefined constants, ensuring clarity and consistency in API responses.

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [HTTP Status Code Categories](#http-status-code-categories)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [FAQs](#faqs)

---

## Key Features

1. **Predefined HTTP Status Codes:** Provides a comprehensive set of HTTP status codes for easy reference.
2. **TypeScript Support:** Includes strong type definitions for enhanced code safety and developer experience.
3. **Immutable Constants:** Ensures status codes cannot be modified, preventing unintended changes.
4. **Lightweight & Efficient:** Minimal footprint with high performance.
5. **Easy Integration:** Seamlessly integrates with any Node.js or TypeScript-based project.

---

## Installation

To install the package, run the following command:

```bash
npm install http-status-lite
```

---

## Usage

### 1. Importing the Constants

```javascript
import httpStatusLite from 'http-status-lite';

console.log(httpStatusLite.OK); // Outputs: 200
```

### 2. TypeScript Support

```typescript
import httpStatusLite, { HttpStatusType } from 'http-status-lite';

const successStatus: HttpStatusType = 'OK';
console.log(httpStatusLite[successStatus]); // Outputs: 200
```

### 3. Example Usage in an Express.js Application

```javascript
import httpStatusLite from 'http-status-lite';
const express = require('express');
const app = express();

app.get('/status', (req, res) => {
    res.status(httpStatusLite.OK).json({ message: 'Server is running!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## HTTP Status Code Categories

### **Informational Responses (100–199)**

- `CONTINUE`: 100
- `SWITCHING_PROTOCOLS`: 101
- `PROCESSING`: 102
- `EARLY_HINTS`: 103

### **Successful Responses (200–299)**

- `OK`: 200
- `CREATED`: 201
- `ACCEPTED`: 202
- `NO_CONTENT`: 204
- `PARTIAL_CONTENT`: 206

### **Redirection Messages (300–399)**

- `MULTIPLE_CHOICES`: 300
- `MOVED_PERMANENTLY`: 301
- `FOUND`: 302
- `SEE_OTHER`: 303
- `TEMPORARY_REDIRECT`: 307
- `PERMANENT_REDIRECT`: 308

### **Client Error Responses (400–499)**

- `BAD_REQUEST`: 400
- `UNAUTHORIZED`: 401
- `FORBIDDEN`: 403
- `NOT_FOUND`: 404
- `METHOD_NOT_ALLOWED`: 405
- `TOO_MANY_REQUESTS`: 429
- `UNAVAILABLE_FOR_LEGAL_REASONS`: 451

### **Server Error Responses (500–599)**

- `INTERNAL_SERVER_ERROR`: 500
- `NOT_IMPLEMENTED`: 501
- `BAD_GATEWAY`: 502
- `SERVICE_UNAVAILABLE`: 503
- `GATEWAY_TIMEOUT`: 504

---

## License

This project is licensed under the `CC BY-NC-ND 4.0`.

---

## Acknowledgments

Special thanks to the following resources:

1. **MDN Web Docs** - Comprehensive HTTP status code references.
2. **Node.js Express Documentation** - Guidance on handling HTTP responses.
3. **TypeScript Docs** - Best practices for defining and using type-safe constants.

---

## FAQs

### 1. **How do I determine the correct HTTP status code for my response?**

HTTP status codes are categorized based on their meaning. Informational (100s), Success (200s), Redirection (300s), Client Errors (400s), and Server Errors (500s). Choose the appropriate category based on your response type.

### 2. **Can I extend this library with custom status codes?**

No, the constants are immutable and follow the official HTTP status codes. If needed, you can create a wrapper module to include your custom codes.

### 3. **How do I uninstall the package?**

You can remove the package by running:

```bash
npm uninstall http-status-lite
```

---

## Author

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/95298623?v=4" width="100px" alt="Moon">
      <a href="https://github.com/montasim">
        <br>
          Ｍ♢ＮＴΛＳＩＭ
        </br>
      </a>
    </td>
  </tr>
</table>
