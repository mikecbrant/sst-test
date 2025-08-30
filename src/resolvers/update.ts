import { updateItem } from '@mikecbrant/appsyncjs-dynamo';
import { util, type Context, type DynamoDBUpdateItemRequest, type DynamoDBExpression } from '@aws-appsync/utils';

type UpdateInput = { id: string };
type UpdateArgs = { input: UpdateInput };

export function request(ctx: Context<UpdateArgs>): DynamoDBUpdateItemRequest {
	const { id } = ctx.args.input;

	// Use a Record-based type so this scales when we later merge user-provided fields
	// with our timestamp value. Avoids relying on literal type assertions.
	const values: Record<string, unknown> = { ':updatedAt': new Date().toISOString() };
	const update: DynamoDBExpression = {
		expression: 'SET #updatedAt = :updatedAt',
		expressionNames: { '#updatedAt': 'updatedAt' },
		expressionValues: util.dynamodb.toMapValues(values),
	};

	const req = updateItem({ key: { pk: id }, update });
	return { ...req, returnValues: 'ALL_NEW' } as DynamoDBUpdateItemRequest & {
		returnValues: 'ALL_NEW';
	};
}

export function response(ctx: Context<UpdateArgs>) {
	return ctx.result?.attributes ?? null;
}
