ALTER TABLE stations 
  DROP COLUMN omniplayer_id,
  ADD COLUMN omniplayer_url TEXT NOT NULL,
  ADD COLUMN client_id TEXT NOT NULL,
  ADD COLUMN client_secret TEXT NOT NULL,
  ADD COLUMN username TEXT NOT NULL,
  ADD COLUMN password TEXT NOT NULL; 