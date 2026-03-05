-- Remove duplicate BlogPost rows (keep the newest per slug)
-- Run before prisma db push adds the unique constraint
DELETE FROM "BlogPost" a
USING "BlogPost" b
WHERE a.id < b.id
  AND a.slug = b.slug;
