CREATE TABLE IF NOT EXISTS staffs (
  id TEXT PRIMARY KEY,
  name TEXT,
  username TEXT,
  password TEXT,
  branch_id TEXT CHECK (branch_id IN ('karkala', 'udupi', 'manipal')),
  role TEXT CHECK (role IN ('staff', 'admin', 'dev')),
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trigger_staffs_updated_at
BEFORE UPDATE ON staffs
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
