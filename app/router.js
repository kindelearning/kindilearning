// app/router.js
import { createRouter } from 'next/app';

const router = createRouter();

router.addRoute('/p/community/:slug*', 'p/community/[slug]');

export default router;