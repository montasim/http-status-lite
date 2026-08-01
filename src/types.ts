import type { STATUS_DEFINITIONS } from './generated/statuses.js';
import type { STATUS_METADATA } from './generated/metadata.js';

export type HttpStatusEntry = (typeof STATUS_DEFINITIONS)[number];
export type HttpStatusCode = HttpStatusEntry['code'];
export type HttpStatusName = HttpStatusEntry['name'];
export type HttpStatusMessage = HttpStatusEntry['message'];
export type HttpStatusCategory = '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
export type HttpStatusRegistryState = (typeof STATUS_METADATA)[number]['registryStatus'];
export type HttpStatusMetadata = (typeof STATUS_METADATA)[number] & {
    readonly category: HttpStatusCategory;
};

export type StatusForCode<Code extends HttpStatusCode> = Extract<HttpStatusEntry, { code: Code }>;
export type StatusForName<Name extends HttpStatusName> = Extract<HttpStatusEntry, { name: Name }>;
export type NameForCode<Code extends HttpStatusCode> = StatusForCode<Code>['name'];
export type CodeForName<Name extends HttpStatusName> = StatusForName<Name>['code'];
export type MessageForCode<Code extends HttpStatusCode> = StatusForCode<Code>['message'];
export type MessageForName<Name extends HttpStatusName> = StatusForName<Name>['message'];
