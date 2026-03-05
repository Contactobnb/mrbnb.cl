-- Remove duplicate BlogPost rows (keep the newest per slug+locale)
DELETE FROM "BlogPost" a
USING "BlogPost" b
WHERE a.id < b.id
  AND a.slug = b.slug
  AND a.locale = b.locale;
