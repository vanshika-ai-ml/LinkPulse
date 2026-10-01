import { Worker } from 'bullmq';
import { redis } from '../config/redis.js';
import { sequelize } from '../config/db.js';
import { UAParser } from 'ua-parser-js';

export const clickWorker = new Worker(
  'click-events',
  async (job) => {
    const { linkId, ip, userAgent, referrer, timestamp = new Date() } = job.data;
    
    // Parse browser and operating system details
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';

    // Insert analytics into PostgreSQL
    await sequelize.query(
      `INSERT INTO "clicks" (link_id, ip_address, user_agent, browser, os, referrer, clicked_at)
       VALUES (?,?,?,?,?,?,?)`,
      {replacements: [linkId, ip, userAgent, browser, os, referrer, timestamp]}
    );
  },
  { connection: redis }
);

clickWorker.on('completed', (job) => {
  console.log(`Click logged for link ID: ${job.data.linkId}`);
});

clickWorker.on('failed', (job, err) => {
  console.error(`Click job ${job.id} failed:`, err);
});
