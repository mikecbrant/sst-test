import { getItem } from '@mikecbrant/appsyncjs-dynamo';
import type { Context, DynamoDBGetItemRequest } from '@aws-appsync/utils';

type GetArgs = { id: string };

export function request(ctx: Context<GetArgs>): DynamoDBGetItemRequest {
	const { id } = ctx.args;
	return getItem({ key: { pk: id } });
}

export function response(ctx: Context<GetArgs>) {
	return ctx.result ?? null;
}
