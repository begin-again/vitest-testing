import {afterAll, beforeAll} from 'vitest';
import {setupServer} from 'msw/node';
import {rest} from 'msw';

const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/posts/:id', (req, res, ctx) => {
        const id = req.params.id;
        return res(
            ctx.status(200),
            ctx.json({body: `mocked for ${id}!`})
        );
    })
);
beforeAll(() => server.listen());
afterAll(() => server.close());
