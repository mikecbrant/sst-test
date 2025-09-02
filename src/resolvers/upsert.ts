import { putItem } from '@mikecbrant/appsyncjs-dynamo';
import type { Context, DynamoDBPutItemRequest } from '@aws-appsync/utils';

type PutInput = { id: string };
type PutArgs = { input: PutInput };

export function request(ctx: Context<PutArgs>): DynamoDBPutItemRequest {
	const { id } = ctx.args.input;
	const now = new Date().toISOString();
	const item: Record<string, unknown> = { id, createdAt: now, updatedAt: now };
	return putItem({ key: { pk: id }, item });
}

export function response(ctx: Context<PutArgs>) {
	return ctx.result?.attributes ?? null;
}
