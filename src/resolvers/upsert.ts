import { updateItem } from '@mikecbrant/appsyncjs-dynamo';
import {
  util,
  type Context,
  type DynamoDBUpdateItemRequest,
  type DynamoDBExpression,
} from '@aws-appsync/utils';

type PutInput = { id: string };
type PutArgs = { input: PutInput };

export function request(ctx: Context<PutArgs>): DynamoDBUpdateItemRequest {
	const { id } = ctx.args.input;
	const now = new Date().toISOString();
	const update: DynamoDBExpression = {
		expression:
			'SET #id = if_not_exists(#id, :id), #createdAt = if_not_exists(#createdAt, :now), #updatedAt = :now',
		expressionNames: {
			'#id': 'id',
			'#createdAt': 'createdAt',
			'#updatedAt': 'updatedAt',
		},
		expressionValues: util.dynamodb.toMapValues({ ':id': id, ':now': now } as Record<string, unknown>),
	};

	const req = updateItem({ key: { pk: id }, update });
	return { ...req, returnValues: 'ALL_NEW' } as DynamoDBUpdateItemRequest & {
		returnValues: 'ALL_NEW';
	};
}

export function response(ctx: Context<PutArgs>) {
	return ctx.result?.attributes ?? null;
}
