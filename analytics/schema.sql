CREATE TABLE IF NOT EXISTS daily(day TEXT PRIMARY KEY, views INTEGER NOT NULL DEFAULT 0, clicks INTEGER NOT NULL DEFAULT 0, visitors INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS visitors(day TEXT NOT NULL, visitor TEXT NOT NULL, PRIMARY KEY(day,visitor));
CREATE TABLE IF NOT EXISTS events(id TEXT PRIMARY KEY, day TEXT NOT NULL, visitor TEXT NOT NULL, kind TEXT NOT NULL CHECK(kind IN ('view','click')));
CREATE INDEX IF NOT EXISTS event_visitor ON events(day,visitor);
CREATE TRIGGER IF NOT EXISTS count_visitor AFTER INSERT ON visitors BEGIN
 INSERT INTO daily(day,visitors) VALUES (NEW.day,1) ON CONFLICT(day) DO UPDATE SET visitors=visitors+1;
END;
CREATE TRIGGER IF NOT EXISTS count_event AFTER INSERT ON events BEGIN
 INSERT INTO daily(day,views,clicks) VALUES(NEW.day,NEW.kind='view',NEW.kind='click') ON CONFLICT(day) DO UPDATE SET views=views+(NEW.kind='view'), clicks=clicks+(NEW.kind='click');
END;
