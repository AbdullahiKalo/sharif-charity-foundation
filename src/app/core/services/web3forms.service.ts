import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

/** Production Web3Forms access key for the foundation's forms. */
export const WEB3FORMS_ACCESS_KEY = 'ebb9530e-c3c3-4318-ae2a-6f53d144ed01';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const FROM_NAME = 'Sharif Charity Foundation Website';

/** Fields posted alongside the access key, e.g. name, email, subject, message. */
export type Web3FormsFields = Readonly<Record<string, string>>;

/** Shape of the Web3Forms JSON response. */
interface Web3FormsResponse {
  readonly success: boolean;
  readonly message?: string;
}

/**
 * Single entry point for the site's Web3Forms submissions, so the access key
 * and the error handling live in one place rather than in each form.
 *
 * Web3Forms only accepts requests from a browser origin on the free plan, so
 * this cannot be exercised from a server or a test runner.
 */
@Injectable({ providedIn: 'root' })
export class Web3FormsService {
  private readonly http = inject(HttpClient);

  /** Completes on success, or errors with a message fit to show the visitor. */
  submit(fields: Web3FormsFields): Observable<void> {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: FROM_NAME,
      ...fields,
    };

    return this.http.post<Web3FormsResponse>(WEB3FORMS_ENDPOINT, payload).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message ?? '');
        }
      }),
      catchError((error: unknown) => throwError(() => new Error(this.describe(error))))
    );
  }

  /** Prefers whatever the API said; falls back to the transport-level message. */
  private describe(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body: unknown = error.error;
      if (typeof body === 'object' && body !== null && 'message' in body) {
        const message = (body as { message: unknown }).message;
        if (typeof message === 'string' && message !== '') {
          return message;
        }
      }
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return '';
  }
}
