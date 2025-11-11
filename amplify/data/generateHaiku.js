export function request(ctx) {
  const { prompt } = ctx.args;
  
  return {
    resourcePath: '/model/anthropic.claude-3-haiku-20240307-v1:0/invoke',
    method: 'POST',
    params: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  };
}

export function response(ctx) {
  const body = JSON.parse(ctx.result.body);
  return body.content[0].text;
}
